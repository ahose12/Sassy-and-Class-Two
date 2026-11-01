const cfg=window.SC_CONFIG||{};
const owner=cfg.ownerEmail||'sassy_classy@rocketmail.com';
document.querySelectorAll('.owner-email').forEach(a=>a.href='mailto:'+encodeURIComponent(owner));
function emailLink(subject,body){return 'mailto:'+encodeURIComponent(owner)+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)}
const grid=document.querySelector('#sales-grid');
if(grid){const items=(window.SC_SALES||[]).filter(x=>x.status!=='sold');if(!items.length){const el=document.createElement('div');el.className='empty';el.textContent='The rack is taking a little breather. Ask Mary Jane about upcoming finds, or request a custom shirt.';grid.append(el)}items.forEach(item=>{const card=document.createElement('article');card.className='sale-card';const img=document.createElement('img');img.src=item.image;img.alt=item.title;img.loading='lazy';const content=document.createElement('div');content.className='sale-copy';const tag=document.createElement('span');tag.className='tag';tag.textContent=item.example?'Example listing · not for sale':'Fire Sales';const title=document.createElement('h2');title.textContent=item.title;const details=document.createElement('p');details.textContent=item.details||'Ask Mary Jane about size and availability.';const price=document.createElement('p');price.className='price';price.textContent=Number.isFinite(item.price)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(item.price):'Ask for price';const link=document.createElement('a');link.className='button';link.textContent='Ask Mary Jane ↗';link.href=emailLink('Fire Sales inquiry: '+item.title,`Hi Mary Jane,

I am interested in ${item.title}.
${details.textContent}
Listed price: ${price.textContent}
${item.example?'This is an example listing; do you have something similar?':''}
Please confirm availability, final total, payment, and pickup/shipping.

My name:
My phone:`);content.append(tag,title,details,price,link);card.append(img,content);grid.append(card)})}
