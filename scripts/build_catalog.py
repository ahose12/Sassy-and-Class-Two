"""Regenerate static listings. Run from any directory; no third-party dependencies."""
from pathlib import Path
import json,re
from urllib.parse import quote
ROOT=Path(__file__).resolve().parents[1]
folder=ROOT/'assets'/'fire-sales'
items=[]
for image in sorted(folder.iterdir()):
    if image.suffix.lower() not in {'.jpg','.jpeg','.png','.webp','.svg','.avif'}:continue
    parts=image.stem.split('__')
    title=parts[0].replace('-',' ').title()
    price=None
    if len(parts)>1:
        try:price=float(parts[1])
        except ValueError:raise ValueError(f'Invalid price in {image.name}')
        if not 0<=price<=100000:raise ValueError(f'Invalid price in {image.name}')
    details=parts[2].replace('-',' ') if len(parts)>2 else ''
    flags=parts[3:] if len(parts)>3 else []
    items.append(dict(title=title,price=price,details=details,image='assets/fire-sales/'+quote(image.name),status='sold' if 'sold' in flags else 'available',example='example' in flags))
(folder/'catalog.js').write_text('window.SC_SALES = '+json.dumps(items,indent=2)+';\n')
print(f'Built {len(items)} listings')
