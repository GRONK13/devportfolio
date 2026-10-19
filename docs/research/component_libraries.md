# Animated React/Next.js component libraries for an Awwwards-level developer portfolio (as of Oct 2026)

Method note: maintenance data (stars, last push, license) was pulled directly from the GitHub REST API on 2026-10-19. Component lists come from each library's own `llms.txt` index. Third-party comparison articles (PkgPulse, DesignRevision, 21st.dev) are often SEO or vendor content, and some of their claims are contradicted by primary sources. Those conflicts are flagged below.

## 1. Library-by-library: what it is, maintenance, license, Tailwind v4 / React 19, distribution

### Takeaway
Every major library is actively maintained: each repo had a push within the last ~3 weeks of Oct 19 2026, and Hover.dev is the exception with no visible update signal. Nearly all now ship through the shadcn CLI registry, so the source is copied into your project rather than installed as an npm runtime package. The real differentiators are the license and how current the stack is:
- React Bits and Animate UI use "MIT + Commons Clause", not plain MIT.
- coss ui (the former Origin UI) is AGPL-3.0.
- Hover.dev and Skiper UI are proprietary or paid.
- Motion Primitives' own docs site still builds on React 18 and Motion 11.

### Cited Findings

**Aceternity UI** (ui.aceternity.com)
- The library describes itself as "113+ UI Components, 182 Pre-built Blocks, 17 Templates, 23 Pro Components, Tailwind CSS v4 compatible, TypeScript", installed via `npx shadcn@latest add ...` — [Aceternity llms.txt](https://ui.aceternity.com/llms.txt)
- Its own Feb 2026 guide claims "330+" components and "200+ free". Premium blocks (100+) and templates (30+) are sold as lifetime access for $199. The guide is self-published, and its counts conflict with the llms.txt figure above. — [Aceternity guide](https://ui.aceternity.com/guides/best-react-ui-components-2026)
- Built on Tailwind and Framer Motion (Motion). The guide describes it as optimized for Next.js 15 App Router and does not mention Next 16. — [Aceternity guide](https://ui.aceternity.com/guides/best-react-ui-components-2026)
- No public GitHub repo was found: `github.com/aceternity/ui` returns 404 through the API. Source is distributed from the site and registry only, so commit-level maintenance can't be verified. — GitHub API (api.github.com/repos/aceternity/ui → Not Found)
- PkgPulse (Mar 2026) says Aceternity is "dark primary, light mode limited", has no reduced-motion support, and needs Framer Motion (~125KB, their estimate). — [PkgPulse](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026)

**Magic UI** (magicui.design)
- Repo: 22.7k stars, last push 2026-10-17, MIT, not archived — [GitHub magicuidesign/magicui](https://github.com/magicuidesign/magicui)
- The docs site runs Next ^15.5, React 19.1.1, Tailwind ^4.1.13 and Motion ^12.23 (from `apps/www/package.json`). — [magicui repo](https://github.com/magicuidesign/magicui)
- Install is through the shadcn CLI. Built with React, TypeScript, Tailwind and Motion. Sells paid "Magic UI Pro" templates. — [DesignRevision, Jun 2026](https://designrevision.com/alternatives/magic-ui)
- New components keep landing in 2026: a canvas-based 3D particle background (PR #1002, Aug 2026) and a bridged carousel (PR #1017, Oct 2026). Retro Grid moved from a CSS perspective grid to a WebGL renderer (PR #928, Mar 2026). — [PR #1002](https://github.com/magicuidesign/magicui/pull/1002), [PR #1017](https://github.com/magicuidesign/magicui/pull/1017), [PR #928](https://github.com/magicuidesign/magicui/pull/928)
- 21st.dev (Aug 2026) calls Magic UI the largest animated shadcn registry, with 247 components indexed. This is third-party and not verified. — [21st.dev blog](https://21st.dev/blog/magic-ui-alternatives)

**React Bits** (reactbits.dev)
- Repo: 49.6k stars (the most-starred library here after shadcn/ui), last push 2026-10-18 — [GitHub DavidHDev/react-bits](https://github.com/DavidHDev/react-bits)
- **License is "MIT + Commons Clause".** You may use it commercially as part of an app or site, but you may not sell or redistribute the components themselves. This is fine for a portfolio. — [react-bits LICENSE.md](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md). PkgPulse lists it as "MIT", which is incorrect per the actual license file: [PkgPulse](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026)
- Each component comes in 4 variants (JS+CSS, JS+Tailwind, TS+CSS, TS+Tailwind) and installs via jsrepo or the shadcn CLI. "Dependencies vary by component (e.g., gsap, motion, three, ogl)". Everything on reactbits.dev is free. — [React Bits llms.txt](https://reactbits.dev/llms.txt)
- The paid **React Bits Pro** (pro.reactbits.dev) offers 230 components, 300 blocks, 300 app screens and 15 Next.js templates under lifetime or annual plans. It includes a **free portfolio template** (live preview rbp-portfolio.vercel.app). — [React Bits llms.txt](https://reactbits.dev/llms.txt)
- The repo's own package.json depends on gsap, @react-three/fiber 9, drei 10, postprocessing, rapier, lenis and Tailwind 4. This means many headline components are WebGL or GSAP based, which contradicts PkgPulse's claim that it "mostly uses CSS animations". — [react-bits package.json](https://github.com/DavidHDev/react-bits/blob/main/package.json) vs [PkgPulse](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026)

**Motion Primitives** (motion-primitives.com, by ibelick)
- Repo: 6.7k stars, last push 2026-09-28, MIT — [GitHub ibelick/motion-primitives](https://github.com/ibelick/motion-primitives)
- **Stale stack signal:** the repo's package.json lists `react: ^18`, `motion: ^11.12`, `next: ^15.5` and `tailwindcss: ^4.0`. Commits continue, but the reference stack lags React 19 and Motion 12. — [motion-primitives package.json](https://github.com/ibelick/motion-primitives/blob/main/package.json)
- Several open bugs, including "all spotlight examples are broken" (#175, opened Dec 2025, still open), Text Loop rendering problems (#129) and a morphing popover text animation bug (#143). — [Issue #175](https://github.com/ibelick/motion-primitives/issues/175), [Issue #129](https://github.com/ibelick/motion-primitives/issues/129), [Issue #143](https://github.com/ibelick/motion-primitives/issues/143)

**Cult UI** (cult-ui.com)
- Repo: 6.6k stars, last push 2026-10-14, MIT — [GitHub nolly-studio/cult-ui](https://github.com/nolly-studio/cult-ui)
- "Every component is a shadcn/ui registry item." Includes animated blocks and full templates. — [Cult UI llms.txt](https://www.cult-ui.com/llms.txt)
- The docs app runs Next ^15.5, React 19.1.1, Tailwind ^4.1 and Motion ^12. — [cult-ui repo](https://github.com/nolly-studio/cult-ui)

**Origin UI → coss ui** (coss.com/ui)
- `github.com/origin-space/originui` now redirects to **cosscom/ui**: "coss.com/ui is the official design system of Cal.com". 10.7k stars, last push 2026-10-18, **AGPL-3.0** (repo-level license). — GitHub API redirect → [cosscom/ui](https://github.com/cosscom/ui)
- coss ui is built on **Base UI** rather than Radix. Its 50+ (later "53") primitives replace `asChild` with Base UI's `render` prop. The old Origin UI components are becoming higher-level "particles", and the original collection stays reachable at `/origin` during the transition. — [coss roadmap](https://coss.com/ui/docs/roadmap), [Radix migration guide](https://coss.com/ui/docs/radix-migration)
- It is "built with Tailwind CSS v4", installs per component through a CLI, and uses Cal.com design tokens with Inter and Geist Mono as default fonts. — [coss get-started](https://coss.com/ui/docs/get-started.md)
- Caveat: the license is AGPL-3.0 at the repo level. I could not confirm whether the copied UI components carry a different license. Check this before using it in a closed-source portfolio. — [cosscom/ui](https://github.com/cosscom/ui)

**Animate UI** (animate-ui.com)
- Repo: 4.4k stars, last push 2026-10-18 — [GitHub imskyleen/animate-ui](https://github.com/imskyleen/animate-ui)
- **License "MIT + Commons Clause"**: you can't sell or redistribute the components "in their original form". — [animate-ui LICENSE.md](https://github.com/imskyleen/animate-ui/blob/main/LICENSE.md)
- It offers "animated drop-in primitives for Radix UI, Base UI and React Aria, built with Motion" with the same API as the underlying primitive. Because of that, it is the most accessibility-friendly animated option, since a11y comes from Radix, Base UI or React Aria. — [Animate UI llms.txt](https://animate-ui.com/llms.txt)
- **It is the only library verified on the target stack:** its docs app runs `next 16.3.6`, `react 19.2.4`, `tailwindcss ^4.2.2` and `motion ^12.35`. — [animate-ui package.json](https://github.com/imskyleen/animate-ui)

**Skiper UI** (skiper-ui.com, by Gxuri)
- 106+ components. Some are free; the "Premium" plan is a one-time $129, and an "Exclusive" $549 tier is marked "coming soon". Installs via the shadcn CLI (`npx shadcn add @skiper-ui/skiper40`), one file per component, and uses Tailwind, Next.js and Motion. No license is stated, no dates are shown, and no public GitHub repo was found. — [skiper-ui.com](https://skiper-ui.com)

**Kokonut UI** (kokonutui.com)
- Repo: 2.2k stars, last push 2026-10-18, MIT — [GitHub kokonut-labs/kokonutui](https://github.com/kokonut-labs/kokonutui)
- "Open-source React components built with Tailwind CSS, Motion and shadcn/ui", installed with `npx shadcn@latest add @kokonutui/<name>`. It also has a Pro tier. — [Kokonut llms.txt](https://kokonutui.com/llms.txt)

**Hover.dev**
- React and Tailwind components animated with Motion, vanilla JS or CSS. A few are free (e.g. Encrypt Button); everything else sits behind "Unlock Everything" (prices not shown on the homepage). Components are copyrighted and can't be redistributed without consent. **Stale signal: the footer still says "© 2024"** and no update dates are shown. — [hover.dev](https://www.hover.dev)

**shadcn/ui + registry ecosystem**
- Repo: 125.9k stars, last push 2026-10-18, MIT — [GitHub shadcn-ui/ui](https://github.com/shadcn-ui/ui)
- New projects start on Tailwind v4 and React 19. Other changes:
  - `tailwindcss-animate` was deprecated on 2025-03-19 in favor of `tw-animate-css`.
  - `forwardRef` was removed (with a codemod).
  - Primitives now carry a `data-slot` attribute.
  - Colors moved to OKLCH.

  — [shadcn Tailwind v4 docs](https://ui.shadcn.com/docs/tailwind-v4)
- The changelog shows steady 2026 activity: "Private GitHub Registries" (Aug 2026), "cn" (Sep 2026), and "Trace, Code Block and AI Elements" (Oct 2026). — [shadcn changelog](https://ui.shadcn.com/docs/changelog)
- A Registry Directory lists third-party registries and warns that they are "maintained by third-party developers", so review code before installing. — [shadcn directory](https://ui.shadcn.com/docs/directory)

**Newer 2025–2026 entrants / others**
- **SmoothUI**: 75+ animated components (Motion + Tailwind), free, shadcn-compatible, Next 16 / React 19 stack per its listing (third-party listing) — [SaaSHub](https://www.saashub.com/smoothui)
- **Unlumen UI** (132 components) and **Animbits** (84 components), both installable via the shadcn CLI — [21st.dev Unlumen](https://21st.dev/@unlumen/library/unlumen-ui), [21st.dev Animbits](https://21st.dev/@animbits/library/animbits)
- **Eldora UI**, **Animata**, and **Kibo UI** (MIT, shadcn registry; mainly app widgets like Gantt and Kanban, so not portfolio-relevant) — [DesignRevision](https://designrevision.com/alternatives/magic-ui)
- **UI Layouts** (ui-layouts/uilayouts): 3.8k stars, MIT, last push 2026-08-23. Slower but alive. — [GitHub ui-layouts/uilayouts](https://github.com/ui-layouts/uilayouts)
- **21st.dev**: a marketplace/aggregator of community shadcn components — [21st.dev blog](https://21st.dev/blog/aceternity-ui-alternatives)

### Inferences
- For a Next 16 / React 19 / Tailwind v4 stack, Animate UI is the lowest-risk animated layer because it is verified on Next 16.3 and React 19.2. Magic UI and Cult UI build on React 19 with Next 15.5, so they are very likely fine on Next 16, since copied source is mostly framework-agnostic client components.
- Any component that uses Motion or hooks needs `"use client"`. In an RSC architecture, keep these as leaf client islands and render surrounding content on the server.
- If you use Motion Primitives, check each component against React 19 and Motion 12 before relying on it.
- License ranking for a personal portfolio, from safest to most restrictive:
  1. MIT: shadcn, Magic UI, Cult UI, Kokonut, Motion Primitives
  2. MIT + Commons Clause: React Bits, Animate UI. Fine for use; you just can't resell the components.
  3. Proprietary/paid: Hover.dev, Skiper Premium, Aceternity Pro, React Bits Pro
  4. AGPL: coss. Needs legal care if your portfolio source is closed. If it is public on GitHub, AGPL is likely a non-issue.

### Gaps
- Aceternity, Skiper and Hover.dev have no public repos, so their release cadence couldn't be verified.
- The GitHub releases API wasn't queried successfully (the local python parser was unavailable), so "last push" is the maintenance proxy used instead.
- Hover.dev pricing and the current React Bits Pro pricing weren't retrieved.
- Animata's 2026 status is unconfirmed.
- Whether the coss UI component files have their own license (separate from the repo's AGPL) wasn't confirmed.

## 2. Most visually striking, portfolio-appropriate components (with links)

### Takeaway
React Bits has the deepest pool of distinctive WebGL, GSAP and kinetic-type pieces. Magic UI and Aceternity cover the "landing page" staples. Cult UI and Kokonut offer newer, less-seen tactile and material effects such as dithering, liquid metal, fluted glass and halftone, which help a portfolio stand out.

### Cited Findings
All React Bits links are listed in [reactbits.dev/llms.txt](https://reactbits.dev/llms.txt). All Magic UI links are listed in [magicui.design/llms.txt](https://magicui.design/llms.txt).

**Hero backgrounds**
- React Bits (WebGL/OGL/three):
  - [Dither](https://www.reactbits.dev/backgrounds/dither)
  - [Grainient](https://www.reactbits.dev/backgrounds/grainient)
  - [Iridescence](https://www.reactbits.dev/backgrounds/iridescence)
  - [Faulty Terminal](https://www.reactbits.dev/backgrounds/faulty-terminal)
  - [Gradient ASCII](https://www.reactbits.dev/backgrounds/gradient-ascii)
  - [Ferrofluid](https://www.reactbits.dev/backgrounds/ferrofluid)
  - [Grid Distortion](https://www.reactbits.dev/backgrounds/grid-distortion)
  - [Light Rays](https://www.reactbits.dev/backgrounds/light-rays)
  - [Hyperspeed](https://www.reactbits.dev/backgrounds/hyperspeed)
  - [Aurora](https://www.reactbits.dev/backgrounds/aurora)
  - [Galaxy](https://www.reactbits.dev/backgrounds/galaxy)
- Magic UI:
  - [Flickering Grid](https://magicui.design/docs/components/flickering-grid)
  - [Warp Background](https://magicui.design/docs/components/warp-background)
  - [Light Rays](https://magicui.design/docs/components/light-rays)
  - [Noise Texture](https://magicui.design/docs/components/noise-texture)
  - [Glyph Matrix](https://magicui.design/docs/components/glyph-matrix)
  - [Dotted Map](https://magicui.design/docs/components/dotted-map)
  - [Retro Grid](https://magicui.design/docs/components/retro-grid)
- Aceternity:
  - [Aurora Background](https://ui.aceternity.com/components/aurora-background)
  - [Background Beams](https://ui.aceternity.com/components/background-beams)
  - [Wavy Background](https://ui.aceternity.com/components/wavy-background)
  - [Hero Parallax](https://ui.aceternity.com/components/hero-parallax)
  - [Lamp Effect](https://ui.aceternity.com/components/lamp-effect)
  - Sources: [Aceternity guide](https://ui.aceternity.com/guides/best-react-ui-components-2026)
- Cult UI:
  - [Hero Dithering](https://www.cult-ui.com/docs/components/hero-dithering)
  - [Hero Liquid Metal](https://www.cult-ui.com/docs/components/hero-liquid-metal)
  - [Fluted Glass](https://www.cult-ui.com/docs/components/fluted-glass)
  - [Distorted Glass](https://www.cult-ui.com/docs/components/distorted-glass)
  - [Dither Image](https://www.cult-ui.com/docs/components/dither-image)
  - Source: [Cult llms.txt](https://www.cult-ui.com/llms.txt)
- Kokonut:
  - [Halftone Background](https://kokonutui.com/docs/backgrounds/halftone-background)
  - [Topo Background](https://kokonutui.com/docs/backgrounds/topo-background)
  - [Dither Reveal Hero](https://kokonutui.com/docs/backgrounds/dither-reveal-hero)
  - [Wind / flow field](https://kokonutui.com/docs/backgrounds/flow-field)
  - Source: [Kokonut llms.txt](https://kokonutui.com/llms.txt)

**Text effects / kinetic type**
- React Bits:
  - [Text Pressure](https://www.reactbits.dev/text-animations/text-pressure) (variable-font)
  - [Variable Proximity](https://www.reactbits.dev/text-animations/variable-proximity)
  - [Split Flap Text](https://www.reactbits.dev/text-animations/split-flap-text)
  - [Masked Heading](https://www.reactbits.dev/text-animations/masked-heading)
  - [Scroll Float](https://www.reactbits.dev/text-animations/scroll-float)
  - [Scroll Reveal](https://www.reactbits.dev/text-animations/scroll-reveal)
  - [Decrypted Text](https://www.reactbits.dev/text-animations/decrypted-text)
  - [Shuffle](https://www.reactbits.dev/text-animations/shuffle)
  - [Split Text](https://www.reactbits.dev/text-animations/split-text)
  - [ASCII Text](https://www.reactbits.dev/text-animations/ascii-text)
- Magic UI:
  - [Kinetic Text](https://magicui.design/docs/components/kinetic-text)
  - [Text 3D Flip](https://magicui.design/docs/components/text-3d-flip)
  - [Dia Text Reveal](https://magicui.design/docs/components/dia-text-reveal)
  - [Hyper Text](https://magicui.design/docs/components/hyper-text)
  - [Video Text](https://magicui.design/docs/components/video-text)
  - [Text Reveal](https://magicui.design/docs/components/text-reveal) (scroll)
- React Bits Pro: 3D Text Reveal (cylinder on scroll), Bending Marquee, ASCII Ripple — [React Bits llms.txt](https://reactbits.dev/llms.txt)
- Aceternity: [Text Generate Effect](https://ui.aceternity.com/components/text-generate-effect)

**Bento grids**
- [Magic UI Bento Grid](https://magicui.design/docs/components/bento-grid)
- [Aceternity Bento Grid](https://ui.aceternity.com/components/bento-grid)
- [React Bits Magic Bento](https://www.reactbits.dev/components/magic-bento)
- [Kokonut Widget Grid](https://kokonutui.com/docs/cards/bento-grid)

**Project cards / galleries**
- React Bits:
  - [Dome Gallery](https://www.reactbits.dev/components/dome-gallery)
  - [Circular Gallery](https://www.reactbits.dev/components/circular-gallery)
  - [Infinite Menu](https://www.reactbits.dev/components/infinite-menu) (WebGL sphere)
  - [Flying Posters](https://www.reactbits.dev/components/flying-posters)
  - [Scroll Stack](https://www.reactbits.dev/components/scroll-stack)
  - [Card Swap](https://www.reactbits.dev/components/card-swap)
  - [Tilted Card](https://www.reactbits.dev/components/tilted-card)
  - [Masonry](https://www.reactbits.dev/components/masonry)
  - [Chroma Grid](https://www.reactbits.dev/components/chroma-grid)
- Aceternity:
  - [3D Card Effect](https://ui.aceternity.com/components/3d-card-effect)
  - [3D Pin](https://ui.aceternity.com/components/3d-pin)
  - [Card Hover Effect](https://ui.aceternity.com/components/card-hover-effect)
- Others:
  - [Cult Hover Video Player](https://www.cult-ui.com/docs/components/hover-video-player)
  - [Kokonut Lightbox Grid](https://kokonutui.com/docs/cards/lightbox-grid)
  - Skiper "Image reveal", "Things drag and scroll" — [skiper-ui.com](https://skiper-ui.com)

**Marquees**
- [Magic UI Marquee](https://magicui.design/docs/components/marquee)
- [Magic UI Scroll Based Velocity](https://magicui.design/docs/components/scroll-based-velocity)
- [React Bits Logo Loop](https://www.reactbits.dev/animations/logo-loop)
- [React Bits Curved Loop](https://www.reactbits.dev/text-animations/curved-loop)
- [React Bits Scroll Velocity](https://www.reactbits.dev/text-animations/scroll-velocity)
- Aceternity Infinite Moving Cards — [Aceternity guide](https://ui.aceternity.com/guides/best-react-ui-components-2026)

**Cursor effects**
- React Bits:
  - [Target Cursor](https://www.reactbits.dev/animations/target-cursor)
  - [Blob Cursor](https://www.reactbits.dev/animations/blob-cursor)
  - [Splash Cursor](https://www.reactbits.dev/animations/splash-cursor) (fluid sim)
  - [Image Trail](https://www.reactbits.dev/animations/image-trail)
  - [Pixel Trail](https://www.reactbits.dev/animations/pixel-trail)
  - [Crosshair](https://www.reactbits.dev/animations/crosshair)
- Magic UI:
  - [Smooth Cursor](https://magicui.design/docs/components/smooth-cursor)
  - [Pointer](https://magicui.design/docs/components/pointer)
- Skiper: "Image cursor trail" — [skiper-ui.com](https://skiper-ui.com)

**Docks / nav**
- [Magic UI Dock](https://magicui.design/docs/components/dock)
- [Aceternity Floating Dock](https://ui.aceternity.com/components/floating-dock)
- [React Bits Dock](https://www.reactbits.dev/components/dock)
- [React Bits Gooey Nav](https://www.reactbits.dev/components/gooey-nav)
- [React Bits Staggered Menu](https://www.reactbits.dev/components/staggered-menu)
- [React Bits Flowing Menu](https://www.reactbits.dev/components/flowing-menu)
- [Cult Dynamic Island](https://www.cult-ui.com/docs/components/dynamic-island)
- [Kokonut Scroll Index](https://kokonutui.com/docs/navigation/scroll-index)

**Timelines**
- [Aceternity Timeline](https://ui.aceternity.com/components/timeline)
- [Aceternity Tracing Beam](https://ui.aceternity.com/components/tracing-beam)
- [Magic UI Scroll Progress](https://magicui.design/docs/components/scroll-progress)

**Spotlight / glow cards**
- [React Bits Spotlight Card](https://www.reactbits.dev/components/spotlight-card)
- [React Bits Border Glow](https://www.reactbits.dev/components/border-glow)
- [React Bits Electric Border](https://www.reactbits.dev/animations/electric-border)
- [React Bits Glare Hover](https://www.reactbits.dev/animations/glare-hover)
- [Magic UI Magic Card](https://magicui.design/docs/components/magic-card)
- [Magic UI Border Beam](https://magicui.design/docs/components/border-beam)
- [Magic UI Shine Border](https://magicui.design/docs/components/shine-border)
- Cult "Halo" family, e.g. [Halo Card](https://www.cult-ui.com/docs/components/halo-card)

**Magnetic buttons / micro-interactions**
- [React Bits Magnet](https://www.reactbits.dev/animations/magnet)
- [Magic UI Interactive Hover Button](https://magicui.design/docs/components/interactive-hover-button)
- Hover.dev Encrypt Button and Wet Paint Button — [hover.dev](https://www.hover.dev)

**Scroll reveals**
- [Magic UI Blur Fade](https://magicui.design/docs/components/blur-fade)
- [React Bits Animated Content](https://www.reactbits.dev/animations/animated-content)
- [React Bits Scroll Expand](https://www.reactbits.dev/animations/scroll-expand)
- [React Bits Halftone Reveal](https://www.reactbits.dev/animations/halftone-reveal)
- Aceternity Macbook Scroll, Parallax Scroll — [Aceternity guide](https://ui.aceternity.com/guides/best-react-ui-components-2026)

**Developer-specific**
- Magic UI:
  - [Terminal](https://magicui.design/docs/components/terminal)
  - [Code Comparison](https://magicui.design/docs/components/code-comparison)
  - [File Tree](https://magicui.design/docs/components/file-tree)
  - [Animated Theme Toggler](https://magicui.design/docs/components/animated-theme-toggler) (View Transitions)
- React Bits Pro "Terminal Dark" skill (a free dev-tool aesthetic) — [React Bits llms.txt](https://reactbits.dev/llms.txt)

**Most-shared components (popularity signal)**
- PkgPulse names Aceternity's Spotlight, Background Beams and 3D Card as its most-shared components, and React Bits' SplitText, aurora, spotlight and magnetic buttons as its standouts. — [PkgPulse](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026)

### Inferences
- For a developer portfolio with an Awwwards ambition, the newer material and print-inspired effects are fresher than the 2023–24 glow aesthetic. These include dither, halftone, ASCII, fluted or distorted glass, split-flap and variable-font pressure, from React Bits, Cult and Kokonut.
- The safest high-impact combination: one WebGL hero background, plus one variable-font kinetic headline, plus a restrained Motion-based scroll reveal on content.

### Gaps
- I didn't visually audit each component; quality judgments rely on names and descriptions plus third-party popularity notes.
- Skiper UI component URLs weren't enumerated.

## 3. Accessibility issues and performance pitfalls

### Takeaway
None of the effect-oriented libraries (Aceternity, Magic UI, React Bits) reliably ships `prefers-reduced-motion` handling, so you must add it globally. The heaviest pitfalls are React Bits' WebGL, three.js and GSAP components and canvas backgrounds: they bring GPU and battery cost, client-only rendering and SSR hazards. Animate UI and coss inherit real keyboard and ARIA accessibility from Radix, Base UI or React Aria.

### Cited Findings
- PkgPulse (Mar 2026) reports no reduced-motion support in Aceternity or Magic UI. For React Bits it lists reduced motion as "planned", and it recommends a manual `matchMedia` check. — [PkgPulse](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026)
- Motion's `<MotionConfig reducedMotion="user">` automatically disables transform and layout animations for users with reduced-motion set, while still animating opacity and color. `useReducedMotion()` enables custom fallbacks, e.g. disabling parallax `y`, autoplay video, or slides. This only covers Motion-driven components, not GSAP, CSS or WebGL ones. — [Motion accessibility docs](https://motion.dev/docs/react-accessibility)
- React Bits fixed render-time `window`/`matchMedia` access that broke SSR in DecayCard, PixelCard and Masonry (PR #1006, Jul 2026), and merged "Large performance improvements to Plasma background" (PR #1007). These show SSR and perf issues are real and being patched component by component. — [PR #1006](https://github.com/DavidHDev/react-bits/pull/1006), [PR #1007](https://github.com/DavidHDev/react-bits/pull/1007)
- React Bits components pull in gsap, three, ogl or motion depending on the component. — [React Bits llms.txt](https://reactbits.dev/llms.txt); the repo depends on @react-three/fiber, drei, postprocessing and rapier — [package.json](https://github.com/DavidHDev/react-bits/blob/main/package.json)
- Magic UI's Retro Grid moved to WebGL, and it added a canvas 3D particle background in 2026. More of its backgrounds are now GPU-bound rather than CSS. — [PR #928](https://github.com/magicuidesign/magicui/pull/928), [PR #1002](https://github.com/magicuidesign/magicui/pull/1002)
- PkgPulse estimates Framer Motion at ~125KB as a peer dependency for Aceternity and Magic UI, and ~5–15KB per Aceternity component. These are their estimates and unverified. — [PkgPulse](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026)
- Aceternity is "dark primary, light mode limited" per PkgPulse, which is a contrast and theming risk if you support both themes. — [PkgPulse](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026)
- Motion Primitives has open, unresolved rendering bugs: Spotlight is broken (#175) and Text Loop has problems (#129). — [Issue #175](https://github.com/ibelick/motion-primitives/issues/175), [Issue #129](https://github.com/ibelick/motion-primitives/issues/129)
- Animate UI wraps Radix, Base UI and React Aria primitives with identical APIs, so their keyboard and ARIA behavior carries over. — [Animate UI llms.txt](https://animate-ui.com/llms.txt); coss is built on Base UI and "preserves accessibility" when migrating from Radix — [coss get-started](https://coss.com/ui/docs/get-started.md)
- shadcn warns that community registries are third-party code to review before install. — [shadcn directory](https://ui.shadcn.com/docs/directory)

### Inferences
These are mitigations for Next 16 and RSC. They follow from the findings above but aren't individually sourced.
- Dynamic-import WebGL and canvas components with `next/dynamic(..., { ssr: false })` so three.js, ogl and GSAP stay out of the initial JS.
- Mount effects only when visible (IntersectionObserver), pause `requestAnimationFrame` loops when offscreen or when the tab is hidden, and cap devicePixelRatio.
- Render a static poster or gradient fallback under reduced-motion and on low-power devices.
- Text-scramble, decrypt and split-text effects can break screen-reader output and copy/paste. Keep the real text in the DOM with an `aria-label` or visually hidden copy, and mark animated glyph spans `aria-hidden`.
- Custom cursors that hide the native cursor hurt usability. Disable them on touch devices (`pointer: coarse`) and keep focus rings visible for keyboard users.
- Scroll-jacking and smooth-scroll libraries (lenis appears in React Bits' dependencies) can interfere with keyboard scroll, find-in-page and anchor links. Respect reduced motion there too.
- Mouse-tracking spotlight and glow effects can cause layout thrash if they read layout per `mousemove`. Prefer CSS variables updated in `requestAnimationFrame` with transform-only properties.

### Gaps
- No published Lighthouse or Core Web Vitals benchmarks per component were found.
- No formal accessibility audit (WCAG) of any of these libraries was found.
- I didn't verify each React Bits or Magic UI component's code for a `prefers-reduced-motion` check. The PkgPulse claims date from Mar 2026 and may be partly outdated.

## 4. Overused / cliché components in 2025–2026 portfolios

### Takeaway
No rigorous source catalogs "cliché" portfolio components. The available evidence is popularity: the most-shared Aceternity and Magic UI pieces are the ones most likely to read as template-y. Sources agree that differentiation comes from specific positioning and case-study depth more than from effects.

### Cited Findings
- Aceternity's most-shared components are Spotlight, Background Beams and 3D Card. Other standouts named are Card Hover Effect, Tracing Beam and Infinite Moving Cards. Magic UI's are Aurora, dots, ripple, blur-in and word-pull-up text, and globe. — [PkgPulse](https://www.pkgpulse.com/guides/react-bits-vs-aceternity-magic-ui-2026)
- Magic UI's signature pieces are marquees, animated beams, bento grids, shimmer buttons, particles and text animations. — [DesignRevision](https://designrevision.com/alternatives/magic-ui)
- Aceternity is characterized as dark, high-contrast and glow-heavy, and Magic UI as "polished, product-launch shaped". Both share Motion as the engine. Alternatives for a less generic look include Kokonut, Motion Primitives, Cult and Origin UI. These are vendor or listicle opinions. — [21st.dev Aceternity alternatives](https://21st.dev/blog/aceternity-ui-alternatives), [vp0 comparison](https://vp0.com/blogs/21st-dev-vs-magic-ui-vs-aceternity)
- A creator-of-Aceternity video highlighted a portfolio (chanhdai.com) as "unforgettable". This shows Aceternity's own audience is the portfolio crowd, which amplifies sameness. — [dai.is-a.dev blog](https://dai.is-a.dev/blog/chanhdai-com-highlighted-in-video-by-creator-of-aceternity-ui-make-your-portfolio-unforgettable)
- The most common portfolio mistake is a generic hero; specific positioning works better, and so does showing 3–6 projects. — [Templifica](https://templifica.com/blog/7-sections-every-developer-portfolio-needs-to-convert-in-2026). Interviewers have seen thousands of tutorial-clone projects. — [Hyperskill](https://hyperskill.org/blog/post/building-a-developer-portfolio-in-2026-what-actually-gets-attention)

### Inferences
These come from popularity signals plus design judgment, and are unsourced as "cliché" claims.

Likely overexposed:
- Aurora or gradient-blob hero backgrounds
- Background Beams, meteors and sparkles
- Spotlight hero (Aceternity)
- Dot or grid pattern with a radial mask
- Shimmer, rainbow or border-beam buttons
- Bento grid with glowing hover borders
- Infinite logo or tech-stack marquee
- Floating macOS dock nav
- Icon Cloud / tech-stack globe
- Typewriter or word-rotate taglines ("I build ___")
- Number tickers for "years of experience"
- 3D tilt cards
- Tracing-beam timeline

How to stand out:
- Pick one signature interaction with an editorial or print logic, such as dither or halftone imagery, variable-font kinetic type, split-flap or ASCII text, or physical gallery metaphors (dome gallery, flying posters).
- Pair it with strong typography and real case studies rather than stacking many library effects.
- Restyle any component you take, because the default demo styling is what makes them recognizable.

### Gaps
- No Reddit r/nextjs or r/webdev threads specifically criticizing these components surfaced in searches.
- No Awwwards jury commentary on library-component sameness was found.
- The cliché list above is reasoned inference, not a sourced survey.
