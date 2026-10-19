# Security

If you find a vulnerability in this site, please email gregg.marayan@gmail.com instead of opening a public issue.

## What the site does to stay safe

- **Static pages, small surface**: every route is prerendered. No `proxy.ts`, no remote images or SVGs through the image optimizer, no admin routes on the production domain.
- **Response headers** (`lib/security-headers.ts`): a same-origin Content-Security-Policy (currently Report-Only while the design is built; enforced before launch), HSTS, `X-Frame-Options: DENY`, `nosniff`, a strict referrer policy, a deny-by-default Permissions-Policy and COOP. `X-Powered-By` is off.
- **Content can't inject code**: Markdown is compiled with raw HTML disabled, and every content file is schema-checked at build time (links must be `https://`, images must exist and have alt text). A bad edit fails the build instead of reaching production.
- **Editing without a login on the site**: content changes are Git commits (directly or via Pages CMS's GitHub App, installed on this repository only), so there is no password or write API to attack here.
- **Supply chain**: pnpm 11 with a 24-hour minimum release age, an install-script allowlist and a provenance trust policy (`pnpm-workspace.yaml`); a frozen lockfile and `pnpm audit` in CI; Dependabot with a cooldown; GitHub Actions pinned to commit SHAs with read-only permissions.
- **Contact form** (`app/actions/contact.ts`): a Server Action is a public POST endpoint, so it runs every check itself, in order: a honeypot field, Vercel BotID (invisible; submissions without JavaScript are treated as bots, and the email address stays on the page for them), a Vercel Firewall rate-limit rule (`contact-form`) backed by a per-instance limiter, then Zod validation (length caps, no control characters in single-line fields). Email goes out as plain text through Resend with fixed `from`/`to`; the visitor address only ever appears in `reply_to`. Errors shown to visitors are generic. If BotID cannot give a verdict, the action fails closed (refuses with the email fallback) rather than crashing. BotID's proxied challenge path is excluded from the global security headers so its own framing headers apply.
- **Secrets**: read server-side only through `lib/env.ts` (`server-only`), stored in Vercel as Sensitive environment variables.
