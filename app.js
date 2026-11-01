const cfg=window.SC_CONFIG||{};
const owner=cfg.ownerEmail||'sassy_classy@rocketmail.com';
document.querySelectorAll('.owner-email').forEach(a=>a.href='mailto:'+encodeURIComponent(owner));
function emailLink(subject,body){return 'mailto:'+encodeURIComponent(owner)+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)}
const form=document.querySelector('#quote-form');
function summary(){const d=new FormData(form);return `CUSTOM SHIRT QUOTE REQUEST

Name: ${d.get('name')}
Email: ${d.get('email')}
Phone: ${d.get('phone')||'Not supplied'}
Needed by: ${d.get('date')||'Flexible / please discuss'}
Style: ${d.get('style')}
Total quantity: ${d.get('quantity')}
Sizes: ${d.get('sizes')}
Shirt colors: ${d.get('colors')||'Please discuss'}
Print placement: ${d.get('placement')}

Design and instructions:
${d.get('details')}

Artwork link: ${d.get('artwork')||'I will attach artwork or discuss it with Mary Jane.'}

Please confirm availability, final pricing, payment and pickup/shipping.
This is a quote request, not a confirmed order.`}
if(form){const status=document.querySelector('#form-status');form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;window.location.href=emailLink('Custom shirt quote request - '+new FormData(form).get('name'),summary());status.textContent='Your email draft has been requested. Attach artwork and press Send in your email app. If it did not open, use Copy request and email Mary Jane directly.'});document.querySelector('#copy-request').addEventListener('click',async()=>{if(!form.reportValidity())return;const text=summary();const fallback=document.querySelector('#copy-fallback');fallback.hidden=false;fallback.value=text;fallback.select();status.textContent='Your request is ready below. Copy it into an email to '+owner+'.';try{await navigator.clipboard.writeText(text);status.textContent='Request copied. Paste it into an email to '+owner+' and attach your artwork.'}catch{const box=document.querySelector('#copy-fallback');box.hidden=false;box.value=text;box.select();status.textContent='Select and copy the request below, then email it to '+owner+'.'}})}
const grid=document.querySelector('#sales-grid');
if(grid){const items=(window.SC_SALES||[]).filter(x=>x.status!=='sold');if(!items.length){const el=document.createElement('div');el.className='empty';el.textContent='The rack is taking a little breather. Ask Mary Jane about upcoming finds, or request a custom shirt.';grid.append(el)}items.forEach(item=>{const card=document.createElement('article');card.className='sale-card';const img=document.createElement('img');img.src=item.image;img.alt=item.title;img.loading='lazy';const content=document.createElement('div');content.className='sale-copy';const tag=document.createElement('span');tag.className='tag';tag.textContent=item.example?'Example listing · not for sale':'Fire Sales';const title=document.createElement('h2');title.textContent=item.title;const details=document.createElement('p');details.textContent=item.details||'Ask Mary Jane about size and availability.';const price=document.createElement('p');price.className='price';price.textContent=Number.isFinite(item.price)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(item.price):'Ask for price';const link=document.createElement('a');link.className='button';link.textContent='Ask Mary Jane ↗';link.href=emailLink('Fire Sales inquiry: '+item.title,`Hi Mary Jane,

I am interested in ${item.title}.
${details.textContent}
Listed price: ${price.textContent}
${item.example?'This is an example listing; do you have something similar?':''}
Please confirm availability, final total, payment, and pickup/shipping.

My name:
My phone:`);content.append(tag,title,details,price,link);card.append(img,content);grid.append(card)})}
