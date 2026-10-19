# Gregg Marayan · Portfolio

Personal portfolio built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4, deployed on Vercel.

A single, fast page that a recruiter can scan in under a minute: who I am and what I'm looking for, selected work, experience, skills, certifications and a contact form. Press <kbd>⌘K</kbd> / <kbd>Ctrl K</kbd> (or the menu button on mobile) to jump anywhere.

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

All copy lives in typed files under `content/`, so TypeScript catches mistakes before anything ships:

- `content/profile.ts`: name, headline, links, story and values
- `content/projects.ts`: projects (screenshots live in `assets/projects/`, imported so Next.js optimizes them)
- `content/experience.ts`: work and education
- `content/skills.ts`: skill groups
- `content/certificates.ts`: certifications

The résumé is `public/gregg-marayan-resume.pdf`.

## Environment variables

See `.env.example`. Only the contact form needs secrets (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). Set them in the Vercel dashboard for production.

## Project structure

```
app/          routes, layout, server action, SEO files (sitemap, robots, OG image)
components/   UI; components/sections/ holds one file per page section
content/      typed site content
lib/          CSP, validation, rate limiting, email, env
proxy.ts      per-request CSP nonce
tests/        Vitest unit tests
```

## Security

See [SECURITY.md](SECURITY.md).
