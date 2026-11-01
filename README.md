# Sassy & Classy - Simple Static Website

A fresh repository edition. HTML, CSS and JavaScript with a small email-only handler; no accounts, customer database or checkout.

## Launch in a NEW GitHub repo
1. Extract this ZIP and copy the contents of `sassy-classy-simple` into a new repository (including `.github`). Do not replace the existing larger site unless you intend to.
2. Check `config.js`: Mary Jane's email is `sassy_classy@rocketmail.com`.
3. Push to the `main` branch. In Settings > Pages, choose **GitHub Actions** as Source. Allow the included Pages workflow to finish, then open its published URL. It supports repository subpaths.
4. If using another static host, run `python3 scripts/build_catalog.py` first, then publish the HTML/CSS/JS files and assets. There is no package install.

## Custom designer and quote email
Customers choose shirt color, sizes and quantities, front/back text and fonts, and upload separate front/back artwork. They can drag artwork or use sliders for size and position. The site submits both concept previews, originals and details through the small email handler; after provider acceptance, it clears browser design state. No saved designs or customer database. Mary Jane replies with the quote and handles payment. See **EMAIL-SETUP.md** to connect live delivery; until configured, Send is disabled and Copy details is available. The static website cannot securely send email directly without this handler/service.

## Fire Sales: upload photos, then publish
Put product images into `assets/fire-sales/`. The included GitHub workflow scans the folder on every push to main, builds `catalog.js`, and deploys the site. No manual catalog editing is required with the workflow.

Filename format: `product-name__price__size-and-color.jpg`
Example: `mama-flower-tee__15__adult-medium-cream.jpg`
Price must be a nonnegative number without a dollar sign. Use `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, or trusted `.svg` files. Real product photos are best.
- Update a price/title/size: rename the file and push.
- Remove a sold listing: delete its file and push. Or add `__sold` before the extension.
- The three included SVG examples end in `__example` and are visibly marked not for sale. Delete them when adding real stock.
- Use GitHub's **Add file > Upload files** within the folder; commit to main. Wait for the green Pages workflow. A failed build does not publish the new inventory; correct the named file and retry.
- For a local preview after changing files, run `python3 scripts/build_catalog.py`, then open `index.html` in a browser. The JS catalog is checked in so the ZIP also works immediately.

Availability is manual: Mary Jane reports sales and the maintainer updates the repo. Email inquiries never reserve inventory. Files in the repo and Pages site are public; do not upload customer artwork, personal data or credentials into the assets folder.

## Owner walkthrough / handoff checklist
- Review business email/phone, branding and copy.
- Connect email delivery using EMAIL-SETUP.md; send a real sample design, confirm its previews and original art arrive, then reply with a quote.
- Upload one Fire Sales photo using the filename convention; verify listing/title/price on the published site.
- Delete or mark that listing sold; verify it disappears after publishing.
- Review mobile navigation and the copy-request fallback.

## Care pricing
See `SERVICE-SCOPE.md`: $300 initial site/setup/walkthrough and $20/month light maintenance. These are service terms, not customer-facing website content.
