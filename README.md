# Gregg Marayan — portfolio (v5)

Personal portfolio of Gregg Marayan, full-stack developer. An editorial, two-tone site
("print shop terminal") built to be fast, accessible and secure first, with a few signature
interactions on top.

Built with Next.js 16 (App Router, fully static), React 19, TypeScript and Tailwind CSS v4.

## Documentation

| Doc | What's in it |
| --- | --- |
| [docs/redesign-plan.md](docs/redesign-plan.md) | The v5 plan and the research behind it (phases 0–6) |
| [docs/decisions.md](docs/decisions.md) | Decision log: what was chosen, why, and where it deviates from the plan |
| [docs/deployment.md](docs/deployment.md) | Vercel setup: environment variables, BotID, Firewall rule, Pages CMS, launch checklist |
| [content/README.md](content/README.md) | How to edit site content (files or Pages CMS) |
| [SECURITY.md](SECURITY.md) | Security measures and how to report a vulnerability |
| [docs/research/](docs/research/) | Raw research notes (components, motion, trends, content storage, security) |

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
| 6 | Polish, real copy and metrics, enforce CSP, font subsetting, device testing, award submission | Next |

## Features

- **Content as data.** Everything on the site comes from [`content/`](content/README.md): YAML
  for profile, now, values, skills, timeline, certifications and SEO; Markdown for project case
  studies. Zod schemas (`lib/content/schemas.ts`) validate every file at build time, so a bad edit
  fails the deploy instead of reaching the live site. Edit files directly or from a phone with
  [Pages CMS](https://pagescms.org) (`.pages.yml`).
- **Static and fast.** Every route is prerendered. Fonts (Mona Sans, Geist Mono) are self-hosted
  and preloaded. Lighthouse (local, simulated mobile): accessibility, best practices and SEO 100.
- **Accessible.** Skip link, landmarks, visible focus rings, labelled form with errors tied to
  fields, contrast-checked palette in light and dark, and every effect respects
  `prefers-reduced-motion`. axe reports no violations.
- **Motion, CSS first** (details in [docs/decisions.md](docs/decisions.md#motion-layer-css-first-no-motion-library)):
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
  [SECURITY.md](SECURITY.md).

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

Environment variables are listed in [`.env.example`](.env.example); copy it to `.env.local`.

## Project structure

```text
app/                    Routes: home, /work/[slug] case studies, OG images, sitemap, robots, 404
  actions/contact.ts    Contact form Server Action
components/             Section components, contact form, motion components
  case-study/           Case-study contents index and GSAP set pieces
content/                Site content (YAML + Markdown), the single source of truth
content-collections.ts  Content collections: schemas, Markdown compile, image sizes, dither generation
lib/
  content/              Schemas, cross-file checks, and the getters pages use
  security-headers.ts   CSP and response headers
  content/toc.ts        Case-study heading ids and contents
  dither.ts             Build-time dither generator
  email.ts, env.ts      Server-only email sending and environment
public/                 Static files; media in public/media/ (public/_dither/ is generated)
tests/                  Vitest tests
docs/                   Plan, decisions, deployment, research
```

## Supply chain

pnpm 11 is configured in [`pnpm-workspace.yaml`](pnpm-workspace.yaml) to refuse packages
published less than a day ago, block install scripts except an allowlist, and refuse releases
whose provenance is weaker than earlier ones (with documented exceptions). CI installs from the
frozen lockfile, runs `pnpm audit`, and uses GitHub Actions pinned to commit SHAs. Dependabot
proposes updates with a 3-day cooldown; security updates skip it.
