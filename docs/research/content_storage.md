# Content Storage Options for a Solo-Dev Next.js 16 Portfolio (Oct 2026)

Scope: where portfolio data (profile, projects/case studies + images, experience, education, certs, skills, "now" status) should live. The current setup is Markdown + YAML front matter + Zod in the repo, deployed on Vercel. Research ran on 2026-10-19 with about 17 tool calls, so coverage is uneven. The Contentful, Hygraph, Storyblok, Notion and Turso free tiers were NOT verified this session (see Gaps).

## Q1: Per-option comparison (editing UX, images, typing, pricing, vendor health, revalidation, security, lock-in)

### Takeaway
Git-backed browser editors (Keystatic GitHub mode, Pages CMS, Sveltia/Decap, TinaCMS) keep the repo as the single source of truth and add little attack surface. Their trade-off is that every edit is a commit, which triggers a Vercel rebuild of about a minute. Sanity's free tier is generous and allows instant, webhook-driven updates, but the content then lives in a vendor. Payload is now owned by Figma, and Payload Cloud has stopped taking new deployments.

### Cited Findings

**Git-based / file-based**
- **Keystatic, GitHub mode:** set `storage: { kind: 'github', repo }`, then log in at `/keystatic`. On first login, a setup flow creates a custom GitHub App. — [Keystatic docs: GitHub mode](https://keystatic.com/docs/github-mode)
- Keystatic GitHub mode writes the env vars `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`. These must be copied to the host. — [Keystatic docs](https://keystatic.com/docs/github-mode)
- **Keystatic auth model:** anyone with GitHub `write` access to the repo can log in at `/keystatic`. `branchPrefix` limits which branches are shown. The host must run Node.js for Keystatic's API routes, and the deployment docs section is still marked "Coming soon". — [Keystatic docs](https://keystatic.com/docs/github-mode)
- **Keystatic vendor health:** the repo (Thinkmill/keystatic) has about 2.5k stars, 1,159 commits, 30 open PRs and 168 issues listed. It has no GitHub Releases (it ships via npm/changesets tags), and its README still says "Things are experimental at the moment." The MIT license is dated 2023. — [GitHub Thinkmill/keystatic](https://github.com/Thinkmill/keystatic), [releases page (empty)](https://github.com/Thinkmill/keystatic/releases)
- **TinaCMS / Tina Cloud pricing (official page):**

  | Plan | Price | Users | Notes |
  |---|---|---|---|
  | Free | $0 | 2 | 2 roles, community support, 100 MB asset size cap; the comparison table lists unlimited repos and documents |
  | Team | $24/project/mo ($290/yr) | 3, up to 10 | |
  | Team Plus | $41/project/mo | 5 | |
  | Business | $249/project/mo | 20 | |

  Editorial workflow (branch-based) is paid only. The page does not discuss self-hosting. — [tina.io/pricing](https://tina.io/pricing)
- An older Bejamas review (May 2025) listed Tina Team at $29/mo and Business at $599/mo. Those figures are stale; use tina.io/pricing. — [Bejamas](https://bejamas.com/hub/headless-cms/tina)
- **Pages CMS:** free, MIT-licensed, and GitHub-only. It edits content and media in a visual editor and commits to the repo, with no database or backend. You can use the hosted app at app.pagescms.org, deploy your own copy on Vercel, or self-host. Its design is responsive for mobile. External media storage (S3/R2), permissions and scheduling are listed as "Soon". — [pagescms.org](https://pagescms.org/)
- **Decap CMS (formerly Netlify CMS):** still shipping releases. Per Snyk, `decap-cms-app` 3.15.1 was published 24 Jul 2026 and `decap-cms-backend-github` 3.8.0 on 23 Jul 2026. Snyk's relative dates conflict with those absolute dates, so the snapshot may be stale. — [Snyk decap-cms-app](https://security.snyk.io/package/npm/decap-cms-app), [Snyk backend-github](https://security.snyk.io/package/npm/decap-cms-backend-github)
- Decap is maintained by independent EU-based maintainers and funded by a commercial partner, GitHub Sponsors and Open Collective. — [decapcms.org/about](https://decapcms.org/about/)
- A third-party reviewer calls Decap's trajectory "uncertain" since Netlify deprioritized it. This is opinion. — [gautamkhorana.com](https://gautamkhorana.com/headless-cms/decap-cms/)
- **Sveltia CMS:** a ground-up rewrite (started Nov 2022) that aims to be a drop-in Decap replacement. In simple cases, migration can be a one-line change. It claims to fix 300+ Netlify/Decap issues and offers first-class i18n. It is still self-described as "public beta" at npm v0.167.x. — [Sveltia README (jsDelivr)](https://cdn.jsdelivr.net/npm/@sveltia/cms@0.167.5/README.md), [GitHub sveltia/sveltia-cms](https://github.com/sveltia/sveltia-cms)
- **Contentlayer** is effectively abandoned since Stackbit was acquired by Netlify, and it has Turbopack dev issues. Avoid it. — [Wisp blog](https://www.wisp.blog/blog/contentlayer-has-been-abandoned-what-are-the-alternatives)
- **Velite** offers built-in file and image processing plus custom schema validation, and is build-time / file-based. — [velite.js.org](https://velite.js.org/guide/introduction)
- **Content Collections** is a Contentlayer successor with Zod-based schemas; Dub.co documented adopting it. — [dub.co blog](https://dub.co/blog/content-collections), [Wisp compare](https://wisp.blog/compare/contentcollections/contentlayer)

**Hosted headless CMS**
- **Sanity Free plan (official, Oct 2026):**
  - 20 seats (viewers are free)
  - 2 datasets, public only
  - 10k documents
  - 250k API requests/mo and 1M API CDN requests/mo
  - 100 GB bandwidth and 100 GB asset storage
  - Overages are "Not included" on Free.

  Growth is $15/seat/mo, with pay-as-you-go overages, for example $1 per 250k CDN requests and $0.30/GB bandwidth. — [sanity.io/pricing](https://www.sanity.io/pricing)
- Aggregators that quote Sanity free bandwidth as 10 GB, or Growth as "$99/project", conflict with the official page. Treat them as stale. — [costbench](https://costbench.com/software/cms/sanity-cms/), [flowninja](https://www.flowninja.com/blog/sanity-cms-pricing)
- **Payload / Figma:** Payload's official page says the team joined Figma. It states Figma is "committed to maintaining and investing in Payload's open source core" and that "Payload remains a self-hosted solution" that runs anywhere Next.js runs. — [payloadcms.com/payload-has-joined-figma](https://payloadcms.com/payload-has-joined-figma)
- **Payload Cloud:** "deployment of new projects is currently paused". Existing projects keep running, and migration will eventually be required. — [payloadcms.com](https://payloadcms.com/payload-has-joined-figma)
- The acquisition was announced June 17, 2025, weeks before Figma's July 31, 2025 IPO. Some 2026 SEO pages misdate it to 2026. — [Crain's Grand Rapids](https://www.crainsgrandrapids.com/awards/ma-awards-2026-payload-cms-integrates-with-global-digital-design-tool-creator), [Dealroom](https://app.dealroom.co/companies/payload_cms)
- One secondary source reports that Payload 4.0 entered beta in April 2026, with 3.x continuing in parallel. This is unverified against Payload's own release notes. — [oflight.co.jp](https://www.oflight.co.jp/en/columns/payload-cms-nextjs-figma-2026)

**Databases**
- **Supabase Free:**
  - Projects pause after about 1 week of inactivity. They can be restored and data is not deleted.
  - The database is limited to 500 MB.
  - Egress and storage figures conflict across secondary sources: 500 MB vs 5 GB egress, and 500 MB vs 1 GB storage.

  — [makerkit](https://makerkit.dev/blog/saas/supabase-pricing), [jetadmin](https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/)
- **Neon Free:** a 100 CU-hour budget with scale-to-zero and no 7-day pause, per Neon's FAQ. — [Neon FAQ](https://neon.com/faqs/managed-postgres-databases-free-tier)

### Inferences
These come from general knowledge, not fetched this session; verify before relying on them.
- **Sanity:**
  - Studio embeds in a Next.js route (`/studio`) via `next-sanity`.
  - Content is queried with GROQ, and TypeGen generates TS types.
  - Visual editing / Presentation tool and webhooks (GROQ-filtered) can call a Next.js route handler that runs `revalidateTag`.
  - Images are served from Sanity's image CDN with hotspot/crop.
  - Export works via `sanity dataset export` (NDJSON + assets tarball), but Portable Text and GROQ create moderate lock-in.
- **Payload 3:**
  - Runs inside the Next.js app with its own admin auth and a Local API, and needs Postgres, Mongo or SQLite.
  - The admin panel then shares the public deployment, which is the largest attack-surface increase among the options.
  - It also adds dependency weight and a DB to maintain. That is overkill for one editor.
- **Git-based editors:** content stays as Markdown/YAML in the repo, so lock-in is near zero and the existing Zod schemas can keep validating at build. The editor is a commit producer; Vercel's Git integration redeploys on push. No webhook or revalidateTag plumbing is needed, but each edit takes a build (around 30–90 s for a small portfolio).
- **Keystatic:**
  - Its schema (`fields.*`) is TS-typed and its reader API returns typed data.
  - It can co-exist with Zod by re-validating reader output.
  - Images are committed to the repo (`fields.image` with a `directory`/`publicPath`).
  - Keystatic Cloud adds image hosting and simpler auth, but its pricing was not verified.
- **Pages CMS** is the lowest-effort way to edit from a phone. It needs no code changes in the site, only a `.pages.yml` config, and adds zero attack surface to the deployed site because the editor is hosted separately.
- **Decap and Sveltia** need an OAuth proxy on GitHub when not on Netlify. Sveltia supports a Cloudflare Worker auth helper, which is not verified here.
- **Supabase/Neon + custom admin** gives the most control, but you must build the auth, the admin UI and image upload yourself. That is the highest maintenance cost, and Supabase's inactivity pause is a real risk for a low-traffic portfolio. Use it only for truly dynamic data such as the "now" status.

### Gaps
- Not verified this session:
  - Contentful, Hygraph and Storyblok 2026 free-tier limits
  - Notion API as a CMS, including rate limits and expiring image URLs
  - Turso free tier
  - Keystatic Cloud pricing
  - TinaCMS self-hosted backend status
  - Payload support for Next.js 16
- Recent commit dates for Keystatic were not visible, and its maintenance cadence is unconfirmed.
- Official Supabase and Neon pricing pages were not fetched, so the numbers come from secondary sources.

## Q2: Best fit for "single source of truth I can edit, data that changes over time" for a solo dev on Vercel, with a migration path

### Takeaway
Ranked recommendation: (1) stay Git-based with a browser editor layered on, either Keystatic GitHub mode or Pages CMS, keeping the Markdown + Zod contract. (2) Sanity Free if instant publishing, visual editing or a richer image pipeline matters more than lock-in. (3) Optional: a tiny DB or Edge Config-style store only for high-churn fields like "now" status. Payload, a DB-first design, and Tina Cloud are not recommended for this use case.

### Cited Findings
- Pages CMS is free, MIT-licensed, mobile-responsive, commits directly to GitHub, and can be self-hosted on Vercel. — [pagescms.org](https://pagescms.org/)
- Keystatic GitHub mode uses repo write access as its auth and runs inside the Next.js app at `/keystatic`. — [Keystatic docs](https://keystatic.com/docs/github-mode)
- Sanity Free (20 seats, 10k docs, 1M CDN requests, 100 GB assets) is far beyond a portfolio's needs. — [sanity.io/pricing](https://www.sanity.io/pricing)
- Tina Cloud Free allows 2 users, and editorial workflow is paid. — [tina.io/pricing](https://tina.io/pricing)
- Payload Cloud new deployments are paused under Figma ownership, so self-hosting plus a DB is required. — [payloadcms.com](https://payloadcms.com/payload-has-joined-figma)

### Inferences
**Ranking for this owner** (solo, Vercel, wants phone edits, security, low lock-in):

1. **Pages CMS (hosted or self-hosted) over the existing repo.**
   - The site needs zero code changes: add `.pages.yml` mapping the existing collections and front-matter fields, and an image folder under `public/`.
   - The public site's attack surface does not change.
   - Edits trigger a Vercel rebuild.
   - Zod remains the gatekeeper at build, and a bad edit fails the build rather than reaching production.
   - Weakness: Pages CMS is a smaller project, and it is a third-party GitHub App with repo write access.
2. **Keystatic GitHub mode, embedded at `/keystatic`.**
   - It gives a typed TS schema and a nicer editor for structured lists (experience, skills, certs).
   - It adds API routes and GitHub App secrets to the deployment.
   - Optionally restrict `/keystatic` to preview deployments, or protect it with Vercel Deployment Protection.
   - Weakness: the "experimental" label and no formal releases.
3. **Sanity, if you outgrow rebuild-on-edit.**
   - Use it if you want instant publishes (webhook → `revalidateTag(tag, 'max')`), Presentation/visual editing, or an image CDN.
   - Migration: write a one-off script that parses the existing MD with gray-matter, validates with Zod, and creates Sanity documents plus uploaded assets. Then keep the Zod schemas as a runtime parse on GROQ results so the app contract stays stable.
4. **Sveltia CMS** is a credible alternative to (1)/(2) and a Decap drop-in. It is still beta.
5. **Not recommended:**
   - Payload: a DB plus an admin in the public app, and vendor uncertainty.
   - Tina Cloud: a 2-user free tier, and a heavier GraphQL/data layer.
   - Supabase or Neon with a custom admin: you build and secure everything.
   - Notion: unverified, and its API image URLs are known to expire.

**Migration path from MD + Zod (Git-based):**
- Keep the files and schemas.
- Add a build-time loader (existing, Velite or Content Collections).
- Add the editor config.
- Turn on Vercel's Ignored Build Step or path filters if needed.
- Optional: split the "now" status into a single JSON/YAML file so it is quick to edit from a phone.

### Gaps
- No 2026 head-to-head data on Keystatic vs Pages CMS mobile UX was found.
- No source verified Keystatic or Pages CMS against Next.js 16 / Turbopack specifically.

## Q3: Next.js 16 caching model specifics relevant to CMS-driven content

### Takeaway
In Next.js 16, `'use cache'` is stable behind `cacheComponents: true`. Tag CMS fetchers with `cacheTag`, set `cacheLife('max')` (or a named profile), and have a webhook route handler call `revalidateTag(tag, 'max')` for stale-while-revalidate. Use `{ expire: 0 }` for immediate expiry. Git-based content needs none of this, because the rebuild on each commit refreshes everything.

### Cited Findings
- **Enabling it:** `'use cache'` was stabilized in v16.0.0 and is enabled via `cacheComponents: true` in `next.config.ts`. Cached functions must be async. It is not supported with static export. — [Next.js docs: use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- **Cache keys** include the Build ID (or `deploymentId`), the function ID and serialized arguments. "Neither caching directive carries over to a new deploy", so every redeploy resets `use cache` entries. — [use cache docs](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- **Default `cacheLife` profile:** stale 5 min (client), revalidate 15 min (server), expire never. The docs recommend an explicit `cacheLife` in every `use cache` scope. — [use cache docs](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- **Prerendering:** with Cache Components, cached output contributes to the route's static shell at prerender. A cache life that is too short leaves a hole that resolves at request time. — [use cache docs](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- **Serverless runtime caching:** with the default in-memory handler on serverless, entries "typically don't persist across requests". `'use cache: remote'` uses a platform cache handler and typically incurs platform fees. — [use cache docs](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- **Draft Mode:** when it is enabled, all cached functions re-execute per request and results are not saved, which suits CMS previews. — [use cache docs](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- **Request APIs:** `cookies()`, `headers()` and `searchParams` are not allowed inside `use cache`. — [use cache docs](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- **`revalidateTag` signature:** `revalidateTag(tag: string, profile: string | { expire?: number })`. `'max'` is recommended, giving a one-year stale-while-revalidate window. `{ expire: 0 }` means the next request blocks on fresh data. The single-argument form is deprecated. Tags are capped at 256 chars. — [Next.js docs: revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag) (lastUpdated 2026-08-25)
- **Where it runs:** `revalidateTag` can be called in Server Functions and Route Handlers, not in Client Components or Proxy. Revalidation is triggered by the next request, not by the call itself. For webhook-originated invalidation, where `updateTag` is unavailable, use `revalidateTag(tag, { expire: 0 })`. — [revalidateTag docs](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- **`updateTag`** is for Server Actions and gives read-your-own-writes; it pairs with `cacheTag` inside `use cache`. — [use cache docs](https://nextjs.org/docs/app/api-reference/directives/use-cache)

### Inferences
**Recommended pattern for a hosted CMS** (Sanity, DB):
- Wrap each fetcher with `'use cache'`, `cacheLife('max')` and `cacheTag('projects')` (plus a per-slug tag).
- Add `app/api/revalidate/route.ts`, which verifies the webhook HMAC signature and then calls `revalidateTag(tag, 'max')`.
- Store the secret only in Vercel env vars.
- Security: an unauthenticated revalidate endpoint is a DoS / cache-busting vector, so always verify signatures.

**Git-based content:** read files inside `'use cache'` functions or at build time. A redeploy invalidates everything automatically because the cache key includes the build ID.

### Gaps
- Vercel-specific pricing for `use cache: remote` and runtime cache (ISR writes/reads) was not fetched.
- `cacheLife` built-in profile values other than the default were not fetched.
