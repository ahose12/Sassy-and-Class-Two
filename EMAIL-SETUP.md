# Direct quote email setup

The storefront remains static. A small server-side email handler is necessary to protect the email API key; it uses no database, upload bucket or application storage. This handler is included under `email-worker/`.

1. Set up an email provider account at Resend and verify a sending domain you control. Mary Jane's receiving address can remain sassy_classy@rocketmail.com. You cannot send as rocketmail.com without controlling that domain.
2. Deploy `email-worker/worker.mjs` as a Cloudflare Worker using its wrangler.toml (for example, from that folder with `npx wrangler deploy`). Set `FROM_EMAIL` to the verified sender, `OWNER_EMAIL` to Mary Jane, and `ALLOWED_ORIGIN` to the exact public site origin (for GitHub Pages: https://ahose12.github.io, without the repository path).
3. Add `RESEND_API_KEY` as a Worker secret (`npx wrangler secret put RESEND_API_KEY`), never in config.js or the repo. Use a sending-only key scoped to your sending domain.
4. Put the deployed HTTPS Worker URL in `quoteEndpoint` in config.js. Publish the site. Sending is disabled until this URL is present. No account credentials have been connected in this ZIP.
5. Before launch, send a real test with one front and one back image; confirm both original images and previews arrive and Reply addresses the customer. Check spam. Verify a failed request retains the design and a successful one clears it.
6. Configure request-rate limits at your hosting edge and provider sending limits before public launch. Origin checks and the honeypot reduce accidental misuse but are not a complete anti-abuse system. No visitor tracking or form-payload logging should be enabled. Confirm current provider retention and costs with the owner.

## What is sent
Customer details, shirt style/color/sizes/quantity, deadline, instructions, artwork link, per-side text/font/colors/coordinates, front/back PNG previews and up to two original image files (PNG/JPEG/WebP, 1 MB each).

## Retention and behavior
No localStorage, sessionStorage, IndexedDB, customer database or saved-design storage. Design/image state lives in browser memory. After the email service accepts the message, controls, artwork and preview state are reset. Failed or uncertain requests stay visible; contact Mary Jane before retrying if uncertain to avoid duplicates. A page refresh loses unsent work. The code does not log payloads. Email providers, infrastructure providers and Mary Jane's mailbox may retain messages/operational records; this is not a promise of zero third-party retention. Service acceptance is not guaranteed inbox delivery.

The preview is a concept, not a print-ready file. Mary Jane supplies the final quote and proof and handles payment. Fire Sales stays folder-driven and unchanged.

Official email documentation: https://resend.com/docs/api-reference/emails/send-email and https://resend.com/docs/send-with-attachments
