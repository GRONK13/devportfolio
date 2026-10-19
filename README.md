# Gregg Marayan · Portfolio

Personal portfolio built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4, deployed on Vercel.

A bento-style home page a recruiter can scan in seconds (intro, what I'm doing now, featured work, local time, GitHub activity), followed by selected work with full case-study pages, experience, skills, certifications and contact. Press <kbd>⌘K</kbd> / <kbd>Ctrl K</kbd> (or the menu button on mobile) to jump anywhere.

## Getting started

```bash
nvm use            # Node 22 (see .nvmrc; Node ≥ 20.9 works)
npm ci
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Unit tests (Vitest) |
| `npm run check` | Lint, typecheck and tests together |

## Editing content

All site content lives in Markdown files under `content/`, one file per project, job, school or certification. See [`content/README.md`](content/README.md) for the full guide. In short:

- `content/profile.md`: name, headline, links, bio and values
- `content/now.md`: the "Now" tile (update monthly)
- `content/projects/<slug>/index.md`: a project and its case study at `/work/<slug>`, with `cover.webp` next to it
- `content/experience/*.md`, `content/certifications/*.md`, `content/skills.md`

Every file is checked against a schema at build time and in CI (`lib/content/schemas.ts`), so a typo fails the build with the file and field instead of breaking the live site. The résumé is `public/gregg-marayan-resume.pdf`.

## Environment variables

See `.env.example`. Only the contact form needs secrets (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). `GITHUB_TOKEN` (no scopes) is optional and only raises the GitHub API rate limit. Set them in the Vercel dashboard for production.

## Project structure

```
app/          routes (home, /work/[slug], /contact), layout, server action, SEO files
components/   UI: ui/ holds primitives (Tile, Button), sections/ one file per page section
content/      site content as Markdown + images
lib/content/  loads and validates content (schemas.ts), renders Markdown safely
lib/          CSP, contact validation, rate limiting, email, GitHub stats, env
scripts/      copies content images into public/_content before dev/build
proxy.ts      per-request CSP nonce
tests/        Vitest unit tests
```

## Security

See [SECURITY.md](SECURITY.md).
