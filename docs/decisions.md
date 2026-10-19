# Decision log

Decisions made while building v5, with the reason and any deviation from
[redesign-plan.md](redesign-plan.md). Newest phase last.

## Phase 0–1: foundations and content

### Content: Markdown/YAML + Zod via Content Collections, Pages CMS for editing
- **Chosen:** content stays in the repo as YAML and Markdown, validated by Zod through
  Content Collections; Pages CMS edits it from a browser or phone by committing to GitHub.
- **Why:** one source of truth with Git history, no database or CMS vendor to lock into or
  secure, and no admin surface on the live site. A bad edit fails the build, not production.
- **Rejected:** Sanity (lock-in, runtime API), Payload (Payload Cloud paused after the Figma
  acquisition), Tina Cloud (2-user free tier), Supabase/Neon + custom admin (too much to build
  and secure), Contentlayer (abandoned).

### Static CSP header (Report-Only first) instead of per-request nonces
- **Why:** nonce CSP in `proxy.ts` forces every page to render dynamically, losing static
  generation and CDN caching. A static header keeps pages static. `script-src` still needs
  `'unsafe-inline'` for Next's inline bootstrap until `experimental.sri` is adopted (Phase 6).
- `upgrade-insecure-requests` is only sent once the CSP is enforced; browsers ignore it in a
  Report-Only policy and log a console error.

### pnpm 11 trust policy with narrow exceptions
- `trustPolicy: no-downgrade` refuses a release with weaker provenance than earlier ones.
- `trustPolicyIgnoreAfter: 129600` (90 days): old maintenance releases (e.g. `semver@6`) trip
  the check by publish date; takeovers land in fresh releases, which stay checked.
- `trustPolicyExclude: @vercel/firewall@1.2.6`: every 1.2.x release is published by Vercel's
  GitHub Actions trusted publisher with the same OIDC config; the registry changed how it records
  the ID and pnpm reads that as "no evidence". Verified against the registry on 2026-10-19.

### Toolchain pins
- **ESLint 9**, not 10: `eslint-config-next`'s plugins (react, jsx-a11y, import) don't support
  ESLint 10 yet.
- **TypeScript 6**, not 7: keeps typescript-eslint and Next's type plugin on a supported version.

## Phase 2: static skeleton

### Accent colour per theme
- Signal orange `#FF5B1F` is only 2.7:1 on paper, failing WCAG even for large text. Light mode
  uses `#C2410C` (4.51:1); dark mode keeps `#FF5B1F` (6.23:1 on ink). Muted text: `#6B675F`
  light (4.9:1), `#8A877F` dark (5.4:1).

### No theme toggle (yet)
- The site follows the system light/dark setting. A toggle needs a pre-hydration script to avoid
  a flash; deferred until there's a reason.

## Phase 3: contact form

### Resend through `fetch`, not the SDK
- One HTTP call doesn't justify another dependency in the supply chain.

### Check order: honeypot → BotID → rate limit → Zod → send
- The cheapest checks run first, and bots learn nothing: honeypot hits get a fake success, and
  every failure message is generic.

## Phase 4: motion layer

### Motion layer: CSS first, no Motion library
- **Deviation from the plan**, which listed Motion 14 with `LazyMotion`.
- **Chosen:** CSS scroll-driven animations for reveals, React `<ViewTransition>` for route
  morphs, build-time images for the dither, and two small client components (hero pressure,
  split-flap). No animation library is shipped.
- **Why:** nothing the plan used Motion for needed it, so it would only add JavaScript.
  JS-driven reveals render content at `opacity: 0` until hydration, which hurts no-JS visitors
  and risks LCP; scroll-driven CSS simply does nothing where unsupported (Firefox today), leaving
  content visible. GSAP is still planned for Phase 5 case-study set pieces, loaded only there.
- **Reduced motion:** CSS checks `prefers-reduced-motion` directly; JS effects use one hook,
  `lib/use-motion-ok.ts`. With reduced motion: no reveals, no hero effect, no split-flap, view
  transitions swap instantly, and dither covers swap without the stepped fade (on touch screens
  the colour image shows straight away).

### Dither covers generated at build time
- `lib/dither.ts` (sharp + Atkinson dithering) writes 2-colour PNGs (0.5–4 KB) to
  `public/_dither/` during the content build, so the effect costs the visitor no JavaScript.
  Rendered with `image-rendering: pixelated` over the colour image; the "develop" is a stepped
  opacity transition (`steps(6)`).

### Hero pressure: letters condense under the pointer, inside locked boxes
- The pointer *presses* letters: narrower (width axis toward 78%) and heavier (900). Widening was
  tried first but the font's width axis tops out at 125% versus a 112% resting width, so the effect
  was barely visible.
- Each letter's box is locked to its resting width so nothing around it moves. Widths are
  measured only after `document.fonts.ready` (measuring the fallback font caused a 0.042 CLS when
  Mona Sans arrived) and re-measured on resize. A full mouse sweep measures 0.0008 CLS from
  sub-pixel re-centering, far under the 0.1 "good" threshold.
- Only enabled for `(hover: hover) and (pointer: fine)` without reduced motion. The h1's
  accessible text is a visually hidden copy; the letter spans are `aria-hidden`.

### Contact form loads near the viewport
- **Finding:** an A/B on the Lighthouse mobile run showed the contact form alone added
  ~300–400 ms of Total Blocking Time (style/layout at page load, most likely the browser's autofill
  scan of a form with `autocomplete` fields). Removing BotID's client or the scroll animations made
  no difference.
- **Chosen:** `components/lazy-contact-form.tsx` mounts the form when it comes within 800px of
  the viewport, with reserved height and a `<noscript>` pointer to the email address. Mobile TBT
  went from 530–750 ms back to the Phase 2 baseline (~330 ms on the same machine).

### BotID fails closed; its proxy path skips our headers
- If `checkBotId()` throws (outage, or missing OIDC token off Vercel), the action returns the
  "email me directly" message instead of crashing the form.
- Our global `X-Frame-Options: DENY` conflicted with the framing headers `withBotId` sets on its
  proxied challenge path, which could break BotID in production. The global header rule now
  excludes that path (`BOTID_PATH_PREFIX` in `next.config.ts`).

## Phase 5: case-study set pieces

### What the case studies got
- **Contents index** (`components/case-study/contents.tsx`): a sticky list of the case study's
  `##` sections, marking the one being read with `aria-current="location"`. Heading ids and the
  list are produced at build time (`lib/content/toc.ts`): a small rehype plugin adds the ids, and
  the list is read from the Markdown source because compiled Markdown is cached. Plain anchor
  links, so it works without JavaScript; it isn't motion, so it stays on with reduced motion.
  Hidden on phones, where case studies are short enough to scroll.
- **GSAP set pieces** (`components/case-study/case-motion.tsx`): reading-progress hairline
  (scrubbed), cover parallax inside its frame (scrubbed), section headings rising word by word
  with SplitText (once), next-project title letters rising (scrubbed).

### Rules for the set pieces
- Transforms and opacity only, so no layout shift (measured CLS 0 through a full scroll).
- Nothing already on screen when GSAP starts is hidden: headings above the fold are skipped, and
  scrubbed effects start from the page top so their first frame is the resting state.
- SplitText uses `aria: "auto"` (headings keep their text as an accessible name); the
  next-project link has its own `aria-label`, so its split letters are decorative.
- Text is split only after `document.fonts.ready`, so line breaks come from the real font.
- The progress bar's hidden state is an inline `transform`, not Tailwind's `scale-x-0`:
  Tailwind v4 uses the separate CSS `scale` property, which would multiply with GSAP's
  `transform` and keep the bar at zero.

### GSAP loaded late, and only where needed
- Dynamic `import()` inside the component: GSAP never ships with the home page and isn't fetched
  at all with reduced motion (checked by recording network requests in headless Edge).
- Setup waits for browser idle time (or the first scroll), since nothing it does is visible
  before scrolling. Cost: ~121 KB raw / ~48 KB gzipped (core, ScrollTrigger, SplitText).
- GSAP 3.13+ is free for commercial use under its Standard "no charge" license (not open source;
  the only restriction is building tools that compete with Webflow).

### Not done (deviations from the plan)
- **No Lenis smooth scrolling.** It replaces the native scroll feel, which juries and visitors
  often read as scroll-jacking, and it would add a scroll loop to every page. Native scrolling
  works with every set piece here.
- **No WebGL hero shader.** The dither covers already give the site its signature; a shader would
  add a canvas and GPU cost for little information. Revisit only if the Phase 6 review asks for it.

## Content reorganisation (before Phase 6)

### BalanceFlow removed; order is Lost & Found, J&A Car Rental, DevKwest
- BalanceFlow had no users or traffic, so it was dropped from the site (its file is in Git
  history if it comes back). The order reflects which projects are used in the real world.

### Project covers are live screenshots, captured in CI, not at request time
- **Chosen:** `scripts/capture-screenshots.mjs` screenshots each project's live site; a weekly
  GitHub Actions job commits changed covers and Vercel redeploys.
- **Why:** covers follow the projects' current look while pages stay static. A screenshot API
  at request time would add a third-party image host to the CSP, a remote-image optimizer path,
  latency, and a dependency on that service's uptime and privacy.
- **No Puppeteer/Playwright:** `puppeteer-core` failed the pnpm trust policy (its
  `chromium-bidi` dependency moved from a trusted CI publisher to a regular npm account, a real
  provenance downgrade). The script drives Chrome/Edge over the DevTools Protocol with Node's
  built-in WebSocket instead, so there's no new dependency at all.
- Captures skip writing when the page hasn't visibly changed (mean pixel difference under 3/255
  on a thumbnail), so live counters don't produce a commit every week.
- Dark-themed sites dithered to almost solid ink and vanished on the dark page, so covers with a
  mean brightness under 25/255 are inverted before dithering (`DARK_MEAN` in `lib/dither.ts`):
  a dark UI prints as ink on paper, like a proof of the page. Every cover frame also gets an
  inset hairline so dark images keep a visible edge.
- Content Collections caches transforms by content file, so a new screenshot alone wouldn't
  regenerate its dither locally; the screenshot script clears that cache after writing covers.
  (Vercel builds start clean, so production is unaffected.)
- Alt text describes the page generally ("Screenshot of the … home page") because the image
  content now changes over time.

### README is a generated profile
- **Chosen:** the repository README is Gregg's profile (about, work, experience, certifications,
  skills, contact), generated from `content/` by `scripts/generate-readme.mjs`. Developer docs
  moved to [development.md](development.md).
- **Why:** visitors to the GitHub repo are mostly recruiters; one source of truth means the
  README can't drift from the site. The Sync workflow regenerates it on every content push, so
  edits from Pages CMS update it too.
- The site URL moved to `content/site.yaml` (`url`) so the README and the app share it;
  `NEXT_PUBLIC_SITE_URL` and Vercel's production domain still take precedence in the app.

## Measurements (local, Phase 4)

Lighthouse 13 against `pnpm start` on a busy laptop, so treat as relative, not absolute.

| Run | Perf | A11y | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Desktop | 100 | 100 | 100 | 100 | 0.8 s | 20 ms | 0 |
| Mobile (simulated slow 4G, 4× CPU) | 84–87 | 100 | 100 | 100 | 3.0–3.4 s | 330–340 ms | 0 |

Phase 5, case-study page (`/work/ja-car-rental`): desktop 100 across all four categories, LCP 0.7 s,
TBT 50 ms, CLS 0; mobile performance 90–96, accessibility/best practices/SEO 100, LCP 2.7–2.9 s,
CLS 0. Local Lighthouse runs swing widely with machine load (the same build measured TBT
30–570 ms across runs), so compare builds in back-to-back runs.

Mobile LCP is the hero intro paragraph repainting when Mona Sans (98 KB) arrives over throttled
4G; first paint is 0.9 s. Subsetting the font is planned for Phase 6.
