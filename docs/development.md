# Development

How the portfolio is built, run and maintained. The repository [README](../README.md) is Gregg's
profile and is generated from `content/` (see [Generated files](#generated-files)), so developer
documentation lives here.

An editorial, two-tone site ("print shop terminal") built to be fast, accessible and secure first,
with a few signature interactions on top. Next.js 16 (App Router, fully static), React 19,
TypeScript and Tailwind CSS v4.

## Documentation

| Doc | What's in it |
| --- | --- |
| [redesign-plan.md](redesign-plan.md) | The v5 plan and the research behind it (phases 0–6) |
| [decisions.md](decisions.md) | Decision log: what was chosen, why, and where it deviates from the plan |
| [deployment.md](deployment.md) | Vercel setup: environment variables, BotID, Firewall rule, Pages CMS, launch checklist |
| [content/README.md](../content/README.md) | How to edit site content (files or Pages CMS) |
| [SECURITY.md](../SECURITY.md) | Security measures and how to report a vulnerability |
| [research/](research/) | Raw research notes (components, motion, trends, content storage, security) |

## Status

Work happens on the `v5-redesign` branch; production still serves the previous site from `main`.

| Phase | Scope | Status |
| --- | --- | --- |
| 0 | Foundations: Next 16.4, pnpm 11 hardening, security headers, CI | Done |
| 1 | Content layer: YAML/Markdown + Zod via Content Collections, Pages CMS config | Done |
| 2 | Static, accessible skeleton: tokens, fonts, grid, all sections, case studies | Done |
| 3 | Hardened contact form: honeypot, BotID, Firewall rate limit, Zod, Resend | Done |
| 4 | Motion layer: scroll reveals, cover morphs, dither covers, hero pressure, split-flap | Done |
| 5 | Case-study set pieces: contents index, reading progress, GSAP scroll pieces | Done |
| – | Content reorganisation: live screenshots, profile README, BalanceFlow removed | Done |
| 6 | Polish, real case studies and metrics, enforce CSP, font subsetting, device testing, award submission | Next |

## Features

- **Content as data.** Everything on the site comes from [`content/`](../content/README.md): YAML
  for profile, now, values, skills, timeline, certifications and SEO; Markdown for project case
  studies. Zod schemas (`lib/content/schemas.ts`) validate every file at build time, so a bad edit
  fails the deploy instead of reaching the live site. Edit files directly or from a phone with
  [Pages CMS](https://pagescms.org) (`.pages.yml`).
- **Live project covers.** Covers are screenshots of each project's live site, refreshed weekly
  (see [Generated files](#generated-files)), so they follow the projects' current look.
- **Static and fast.** Every route is prerendered. Fonts (Mona Sans, Geist Mono) are self-hosted
  and preloaded. Lighthouse (local, simulated mobile): accessibility, best practices and SEO 100.
- **Accessible.** Skip link, landmarks, visible focus rings, labelled form with errors tied to
  fields, contrast-checked palette in light and dark, and every effect respects
  `prefers-reduced-motion`. axe reports no violations.
- **Motion, CSS first** (details in [decisions.md](decisions.md#motion-layer-css-first-no-motion-library)):
  - Scroll-driven reveals and hairline rules (`animation-timeline: view()`), no JavaScript.
  - Project covers morph into the case study with React `<ViewTransition>`.
  - Project covers start as 1-bit Atkinson-dithered "proofs", generated at build time
    (`lib/dither.ts`), and develop into colour on hover, keyboard focus, or scroll on touch.
  - The hero name reacts to the pointer along Mona Sans' width and weight axes
    (`components/pressure-name.tsx`), with no layout shift.
  - "Now" labels flip like a departures board once (`components/split-flap.tsx`).
- **Case studies** (`app/work/[slug]`): a sticky Contents index that tracks the section being
  read (plain anchor links, works without JavaScript), plus GSAP scroll set pieces: a
  reading-progress hairline, cover parallax, word-by-word section headings and a rising
  next-project title. GSAP (~48 KB gzipped) loads only on case-study pages, only without
  reduced motion, and only once the browser is idle or the visitor scrolls
  (`components/case-study/`).
- **Secure contact form.** A Server Action layered with a honeypot, Vercel BotID, a Vercel
  Firewall rate-limit rule, Zod validation and plain-text email through Resend. See
  [SECURITY.md](../SECURITY.md).

## Develop

Requires Node 24 (`.nvmrc`) and pnpm 11 (`packageManager` in `package.json`).

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm check        # lint + typecheck + tests
pnpm build        # production build (also generates content and dither images)
```

| Script | Does |
| --- | --- |
| `pnpm dev` | Dev server. BotID is bypassed; with `RESEND_API_KEY` set, the form sends real email |
| `pnpm build` / `pnpm start` | Production build / serve it |
| `pnpm content` | Validate and compile `content/` into `.content-collections/` (also run by dev/build) |
| `pnpm lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `pnpm typecheck` | Content build, then `tsc --noEmit` |
| `pnpm test` | Content build, then Vitest (`tests/`) |
| `pnpm screenshots [slug…]` | Capture project covers from their live sites (needs Chrome or Edge) |
| `pnpm readme` | Regenerate the profile README from `content/` |

Environment variables are listed in [`.env.example`](../.env.example); copy it to `.env.local`.

## Generated files

Two kinds of committed files are generated from `content/`. Don't edit them by hand.

| File | Generated by | When |
| --- | --- | --- |
| `README.md` (Gregg's profile) | `scripts/generate-readme.mjs` (`pnpm readme`) | On every push that changes `content/`, by the Sync workflow |
| `public/media/projects/<slug>.webp` (project covers) | `scripts/capture-screenshots.mjs` (`pnpm screenshots`) | Weekly (Mondays 03:00 UTC) and on demand, by the Sync workflow |

**Screenshots.** The script opens each project's `links.live` in headless Chrome/Edge over the
DevTools Protocol (Node's built-in WebSocket, no Puppeteer dependency), waits for images and
fonts, optionally clicks a notice button, and writes a 1600×1000 WebP with sharp. It keeps the
existing cover when the page hasn't visibly changed (so live counters don't cause a commit every
week) or when the site fails to load. Per-project options live in the project's front matter:

```yaml
screenshot:
  auto: true            # false keeps a hand-made cover (e.g. the live site needs a login)
  dismiss: I Understand # click this button first (e.g. a notice modal)
  delay: 2500           # ms to wait after load
```

The build turns each cover into its dithered version automatically.

**Sync workflow** (`.github/workflows/sync.yml`): runs on pushes to `content/`, weekly, and
manually (Actions → Sync generated files → Run workflow). It regenerates the README, captures
screenshots (not on content pushes), and commits any changes as `github-actions[bot]`; Vercel
then redeploys. Scheduled and manual runs only exist once the workflow is on the default branch
(`main`).

## Project structure

```text
app/                    Routes: home, /work/[slug] case studies, OG images, sitemap, robots, 404
  actions/contact.ts    Contact form Server Action
components/             Section components, contact form, motion components
  case-study/           Case-study contents index and GSAP set pieces
content/                Site content (YAML + Markdown), the single source of truth
content-collections.ts  Content collections: schemas, Markdown compile, image sizes, dither generation
lib/
  content/              Schemas, cross-file checks, contents (toc), and the getters pages use
  security-headers.ts   CSP and response headers
  dither.ts             Build-time dither generator
  email.ts, env.ts      Server-only email sending and environment
public/                 Static files; media in public/media/ (public/_dither/ is generated)
scripts/                README generator and screenshot capture
tests/                  Vitest tests
docs/                   Development, plan, decisions, deployment, research
```

## Supply chain

pnpm 11 is configured in [`pnpm-workspace.yaml`](../pnpm-workspace.yaml) to refuse packages
published less than a day ago, block install scripts except an allowlist, and refuse releases
whose provenance is weaker than earlier ones (with documented exceptions). CI installs from the
frozen lockfile, runs `pnpm audit`, and uses GitHub Actions pinned to commit SHAs. Dependabot
proposes updates with a 3-day cooldown; security updates skip it.
