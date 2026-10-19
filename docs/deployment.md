# Deployment (Vercel)

The site deploys to Vercel from GitHub. Pages are static; the only server code is the contact
form's Server Action. This page lists everything configured outside the code.

Status column: ✅ done, ⏳ pending (as of 2026-10-19).

## 1. Project settings

| Setting | Where | Value | Status |
| --- | --- | --- | --- |
| Node.js version | Settings → Build and Deployment | 24.x (matches `.nvmrc`) | ⏳ check at launch |
| Install command | Settings → Build and Deployment | default (Vercel detects pnpm from `packageManager`) | ⏳ check at launch |
| OIDC Federation | Settings → Security | Enabled. **BotID needs it**: without it, BotID can't verify requests and the form refuses every message | ⏳ confirm |
| System environment variables | Settings → Environment Variables | "Automatically expose System Environment Variables" on (needed by the Firewall SDK on previews) | ⏳ confirm |
| Deployment Protection | Settings → Deployment Protection | Vercel Authentication on previews; "Protection Bypass for Automation" on if you test the rate limit on previews | ⏳ |

## 2. Environment variables

Mark every secret **Sensitive** (Settings → Environment Variables). See `.env.example`.

| Name | Environments | Value | Status |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Production (separate key for Preview) | Resend key with **Sending access** for one domain only | ⏳ |
| `CONTACT_FROM_EMAIL` | Production, Preview | Verified sender, e.g. `Portfolio <hello@your-domain>` (verify the domain in Resend first) | ⏳ |
| `CONTACT_TO_EMAIL` | Production, Preview | Optional; defaults to `email` in `content/profile.yaml` | optional |
| `NEXT_PUBLIC_SITE_URL` | Production | Optional; Vercel's production URL is used otherwise | optional |

## 3. BotID ✅

Enabled in the Vercel dashboard (Firewall → Bot Management → BotID). The code side is
`instrumentation-client.ts` (protects `POST /`, where the Server Action posts),
`withBotId` in `next.config.ts`, and `checkBotId()` in `app/actions/contact.ts`.

- BotID only works on Vercel. In `pnpm dev` it always reports "human"; under `pnpm start`
  locally it fails (no OIDC token) and the form shows its fallback message. That's expected.
- `withBotId` proxies BotID's challenge through `/149e9513-01fa-4fb0-aad4-566afd725d1b/…`.
  Our global security headers skip that path so its own framing headers apply
  (`next.config.ts`). Re-check the prefix when upgrading `botid`.

## 4. Firewall rate-limit rule ✅

Firewall → Configure → **+ New Rule**, then **Save Rule → Review Changes → Publish**:

| Field | Value |
| --- | --- |
| Name | Contact form rate limit |
| If | `@vercel/firewall` with rate limit ID **`contact-form`** (must match `RATE_LIMIT_RULE_ID` in `app/actions/contact.ts`) |
| Rate limit | Fixed Window, **600 seconds**, **5 requests**, key: API controlled (the code passes none, so it's the client IP) |
| Then | Too Many Requests (429) |

The rule applies to the production deployment. The action calls it only when running on Vercel
(`process.env.VERCEL`) with a 3-second timeout; if the rule is missing or unreachable it logs
`[contact] firewall rate limit unavailable` and the per-instance limiter (5 per 10 minutes) still
applies. To verify after launch: send 6 messages within 10 minutes; the 6th gets "Too many
messages". (Each accepted one sends you a real email.)

## 5. Pages CMS (browser/phone editing) ⏳

1. Sign in at [app.pagescms.org](https://app.pagescms.org) with GitHub.
2. Install the Pages CMS GitHub App on **this repository only**.
3. Open the repo and branch; the editor is built from `.pages.yml`.
4. Make a small edit (e.g. `now.yaml`) and confirm the Vercel deploy succeeds.

Edits are commits, so they go through the same build validation as code.

## 6. GitHub: Sync workflow ⏳

`.github/workflows/sync.yml` commits the regenerated README and project screenshots
([development.md](development.md#generated-files)).

- It pushes with the built-in `GITHUB_TOKEN` (`permissions: contents: write`). If `main` gets
  branch protection that blocks direct pushes, allow GitHub Actions to bypass it or switch the
  workflow to open a pull request.
- The weekly schedule and the manual "Run workflow" button only work once the workflow file is
  on `main`. Until then it runs only on content pushes to `v5-redesign`.
- Confirm `url` in `content/site.yaml` is the real domain before launch: README links use it.

## 7. Launch checklist (merge `v5-redesign` → `main`)

- [ ] Steps 1, 2 and 5 above.
- [ ] Switch the CSP from Report-Only to enforced (`enforceCsp` in `next.config.ts` / `lib/security-headers.ts`) after checking the browser console on the preview for violations.
- [ ] Send one real test message and confirm it arrives with the visitor's address in Reply-To.
- [ ] Clean up the old local `.env` (it still holds the previous site's `ADMIN_*`, `DATABASE_URL` and `GITHUB_TOKEN` values) and revoke any of those tokens that are still live.
- [ ] Delete stale preview deployments of the old site.
