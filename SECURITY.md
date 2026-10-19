# Security

If you find a vulnerability in this site, please email gregg.marayan@gmail.com instead of opening a public issue. I'll acknowledge it as soon as I can.

## What the site does to stay safe

- **Strict Content-Security-Policy** with a fresh nonce on every request (`proxy.ts`, `lib/csp.ts`). No third-party scripts, frames or fonts are allowed.
- **Hardened response headers**: HSTS, `nosniff`, `frame-ancestors 'none'`/`X-Frame-Options: DENY`, a strict referrer policy, COOP/CORP and a locked-down Permissions-Policy (`next.config.ts`).
- **Contact form**: a Server Action (built-in same-origin check) that validates input with Zod, rejects control characters in single-line fields, uses a honeypot and a per-IP rate limit, and sends **plain-text** email only, so visitor input is never rendered as HTML.
- **Secrets stay on the server**: environment variables are read through `lib/env.ts`, which imports `server-only` so it can't be bundled into client code.
- **Content can't inject code**: Markdown is rendered with raw HTML disabled, and every content file is schema-checked at build time (links must be `https://`).
- **No admin surface**: content lives in Markdown files under `content/` and changes ship through Git, so there's no login or write API to attack.
- **Supply chain**: few runtime dependencies, a committed lockfile, `npm audit` in CI and Dependabot updates.
