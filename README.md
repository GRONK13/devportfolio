# Gregg Marayan — portfolio (v5)

Personal portfolio built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.
The redesign plan and the research behind it are in [`docs/redesign-plan.md`](docs/redesign-plan.md).

## Develop

Requires Node 24 (see `.nvmrc`) and pnpm 11.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm check        # lint + typecheck + tests
pnpm build
```

## Content

All site content lives in [`content/`](content/README.md) as YAML and Markdown, validated at
build time by Zod schemas (`lib/content/schemas.ts`) through Content Collections. Edit the files
directly, or in the browser with [Pages CMS](https://pagescms.org) (configured in `.pages.yml`).
Pages read content only through `lib/content/index.ts`.

## Security

See [SECURITY.md](SECURITY.md).
