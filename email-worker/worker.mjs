// No database, file bucket, or application-level persistence.
export default {async fetch(request,env){
 const origin=request.headers.get('Origin'),allowed=env.ALLOWED_ORIGIN;
 const headers={'Access-Control-Allow-Origin':allowed||'null','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin','Cache-Control':'no-store'};
 const reply=(status,data)=>Response.json(data,{status,headers});
 if(!allowed||origin!==allowed)return reply(403,{error:'Origin not allowed'});
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(request.method!=='POST')return reply(405,{error:'POST required'});
 if(!env.RESEND_API_KEY||!env.FROM_EMAIL||!env.OWNER_EMAIL)return reply(503,{error:'Email not configured'});
 if(!request.headers.get('Content-Type')?.includes('application/json'))return reply(415,{error:'JSON required'});
 // Bound streaming input as well as Content-Length to avoid oversized payloads.
 let raw;try{const reader=request.body.getReader(),chunks=[];let size=0;while(true){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>4500000){await reader.cancel();return reply(413,{error:'Request too large'})}chunks.push(value)}const joined=new Uint8Array(size);let offset=0;for(const c of chunks){joined.set(c,offset);offset+=c.length}raw=new TextDecoder().decode(joined)}catch{return reply(400,{error:'Invalid body'})}
 let body;try{body=JSON.parse(raw)}catch{return reply(400,{error:'Invalid JSON'})}
 if(body.website)return reply(400,{error:'Invalid submission'});
 const d=body.details;
 if(!d||typeof d!=='object'||typeof d.name!=='string'||!d.name.trim()||d.name.length>100||typeof d.email!=='string'||d.email.length>150||!/^\S+@\S+\.\S+$/.test(d.email)||/[\r\n]/.test(d.email)||!Number.isInteger(Number(d.quantity))||Number(d.quantity)<1||Number(d.quantity)>10000||typeof d.details!=='string'||!d.details.trim()||d.details.length>1800||typeof d.sizes!=='string'||!d.sizes.trim()||d.sizes.length>250||JSON.stringify(d).length>12000)return reply(400,{error:'Invalid quote details'});
 const files=body.attachments;
 const permitted={'front-preview.png':'image/png','back-preview.png':'image/png'};
 for(const side of ['front','back'])for(const [ext,type]of [['png','image/png'],['jpg','image/jpeg'],['webp','image/webp']])permitted[side+'-artwork.'+ext]=type;
 if(!Array.isArray(files)||files.length<2||files.length>4)return reply(400,{error:'Invalid attachments'});
 const names=new Set();
 for(const f of files){if(!f||names.has(f.filename)||permitted[f.filename]!==f.type||typeof f.content!=='string'||f.content.length>1500000||f.content.length%4!==0||! /^[A-Za-z0-9+/]+={0,2}$/.test(f.content))return reply(400,{error:'Invalid image'});names.add(f.filename)}
 if(!names.has('front-preview.png')||!names.has('back-preview.png'))return reply(400,{error:'Previews required'});
 try{const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:env.FROM_EMAIL,to:[env.OWNER_EMAIL],reply_to:d.email,subject:'Sassy & Classy custom shirt quote request',text:'CUSTOM SHIRT QUOTE REQUEST\n\n'+JSON.stringify(d,null,2)+'\n\nConcept previews only. Confirm proof, final price and fulfillment personally.',attachments:files.map(f=>({filename:f.filename,content:f.content}))})});if(!response.ok)return reply(502,{error:'Delivery service did not accept request'});const result=await response.json();if(!result.id)return reply(502,{error:'Delivery not confirmed'});return reply(200,{accepted:true})}catch{return reply(502,{error:'Email service unavailable'})}
}};
