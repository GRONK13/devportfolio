# Modern Web Animation & Motion Stack for a Next.js 16 / React 19 Portfolio (as of Oct 2026)

## Motion (formerly Framer Motion): version, bundle size, LazyMotion/`m`, React 19, licensing

### Takeaway
Motion is now on **v14.x** (14.3.0, 15 Oct 2026). The core library is free/MIT-style open source, and a separate paid **Motion+** bundle (one-time fee) holds premium components. For bundle discipline, use `m` + `LazyMotion` (~5kb initial) instead of `motion` (~43kb). Motion 13.4+ adds `AnimateView`, which wraps React 19.3's `<ViewTransition>`.

### Cited Findings
- Latest releases: Motion 14.3.0 (15 Oct 2026), 14.2.0 (13 Oct), 14.1.0 (9 Oct), **14.0.0 major (2 Oct 2026)**, 13.5.x (1–2 Oct). Motion UI 4.1.0 (13 Oct 2026). — [Motion changelog](https://motion.dev/docs/changelog)
- 14.0.0 breaking change: it removed internal APIs that 13.5.1 had restored for `framer-motion` 13.0–13.4 cross-compat. Internal dependencies are now pinned. — [Motion changelog](https://motion.dev/docs/changelog)
- 13.0.0 (Aug 2026) removed the optional `@emotion/is-prop-valid` dependency. Prop filtering now goes through `<MotionConfig isValidProp>`. — [Motion changelog](https://motion.dev/docs/changelog)
- 13.2.0 (Sep 2026) added `animate.addEffect()`, `threeEffect` (`motion/three`) and `vgpuEffect` (`motion/vgpu`) for animating non-DOM targets such as Three.js objects. — [Motion changelog](https://motion.dev/docs/changelog)
- 13.4.0 (Sep 2026) added **`AnimateView`**, described as "View transitions for React 19.3", built on React's `ViewTransition`. 13.1.1 improved `AnimatePresence` compatibility with React 19 Strict Mode. — [Motion changelog](https://motion.dev/docs/changelog)
- 13.5.0 (Oct 2026): `spring` accepts negative `bounce` (overdamped). Several parts got smaller. — [Motion changelog](https://motion.dev/docs/changelog)
- Motion UI 4.0.0 requires `motion@^14.1.0`, and `animateLayout` moved into `motion`. In Motion UI 3.0.0, `motion` became a peer dependency of `motion-plus` / `motion-plus-dom`, so it must be installed explicitly. — [Motion changelog](https://motion.dev/docs/changelog)
- **Motion+** is paid, a one-time fee with lifetime access. It includes `Carousel`, `Ticker`, `Cursor`, `AnimateNumber` and `splitText`, plus 500+ examples, 110+ tutorials, a private Discord, and an AI Kit (MotionScore for Agents). — [Motion changelog](https://motion.dev/docs/changelog)
- Bundle sizes (min+gzip, Rollup; Webpack output is slightly larger) — [Motion: Reduce bundle size](https://motion.dev/docs/react-reduce-bundle-size):
  - `motion` component: **43kb**, and bundlers cannot tree-shake it smaller
  - `m` + `LazyMotion`: **just over 5kb** initial render
  - `domAnimation` feature pack: **+24kb** (animations, variants, exit, tap/hover/focus)
  - `domMax` feature pack: **+38kb** (adds pan/drag and layout animations)
  - `useAnimate` mini: **3.3kb** (WAAPI only). The hybrid version is 23kb.
  - `<LazyMotion strict>` throws if a `motion.*` component renders inside it, which prevents accidental full-bundle imports.
- Earlier changelog snapshots show 12.29.0 (Jan 2026) and 12.39.0. The **12.x line is now two majors behind**. — [Motion changelog snapshot](https://motion.dev/changelog?lib=motion)

### Inferences
- Recommended pattern for App Router: a single `'use client'` `MotionProvider` that wraps `<LazyMotion features={() => import('./features').then(r => r.default)} strict>`, with `m.*` used in leaf client components. This keeps RSC pages server-rendered and the initial JS small. Use `domAnimation` unless drag or layout animations are needed.
- `AnimateView` makes Motion a reasonable layer over React's native `<ViewTransition>` for route transitions, so there is no need to hand-roll exit animations with `AnimatePresence` across routes (historically fragile in App Router).
- The free core covers everything a portfolio needs. Motion+ is only worth it for prebuilt Ticker/Carousel/Cursor/AnimateNumber components or its `splitText`. GSAP SplitText is free (see below).

### Gaps
- The bundle-size page did not mention RSC or the `motion/react-client` import. I could not confirm the current recommended RSC import path from official docs this session.
- I found no exact Motion+ price in the sources fetched.
- I found no explicit "React 19 supported" statement beyond the changelog entries above. The 19.3 `AnimateView` and Strict Mode fixes imply active React 19 support.

---

## GSAP after the Webflow acquisition: licensing, plugins, useGSAP, vs Motion for scroll storytelling

### Takeaway
Since GSAP 3.13 (29 Apr 2025), **all of GSAP is free, including commercial use**: ScrollTrigger, ScrollSmoother, SplitText, MorphSVG, DrawSVG, Flip, Inertia and the rest ship in the public `gsap` npm package. The only notable license restriction bars using GSAP to build no-code visual animation builders that compete with Webflow. That does not affect a personal portfolio. GSAP remains the strongest tool for timeline-heavy, pinned and scrubbed scroll storytelling.

### Cited Findings
- GSAP 3.13 (29 Apr 2025): "the entire GSAP toolset is FREE, even for commercial use", credited to Webflow. All former Club plugins are now in the main GitHub repo and npm package. — [GSAP 3.13 blog](https://gsap.com/blog/3-13/)
- Plugins now free:
  - Scroll: ScrollTrigger, ScrollSmoother, ScrollTo
  - SVG: DrawSVG, MorphSVG, MotionPath
  - UI: Flip, Draggable, Inertia, Observer
  - Text: SplitText, ScrambleText, TextPlugin
  - Other: Physics2D, PhysicsProps, GSDevTools

  — [GSAP 3.13 blog](https://gsap.com/blog/3-13/)
- The `gsap-trial` package is deprecated. Bonus plugins are in the standard `gsap` package. — [npm gsap-trial](https://npmjs.com/package/gsap-trial)
- SplitText was rewritten in 3.13 — [GSAP 3.13 blog](https://gsap.com/blog/3-13/):
  - About 50% smaller, with 14 new features
  - Accessibility: `aria-label` on the parent element and `aria-hidden` on the generated split elements
  - `autoSplit` / `onSplit()` for responsive re-splitting
  - Masking wrappers for reveal effects, plus `deepSlice` and `smartWrap`
  - Breaking: removed `position: "absolute"` and `lineThreshold`
- License restriction: permitted use expressly includes companies that compete with Webflow in other areas. Prohibited uses target tools that let users build visual animations without code and that compete with Webflow's visual animation features. Reverse engineering GSAP to build competitive products is also barred, and Webflow can terminate the license on violation. — [GSAP Standard "No Charge" license mirror](https://open.windriver.com/info/uni-license-list/licenses/gsap-standard-no-charge-2025.html); [Webflow announcement](https://webflow.com/blog/gsap-becomes-free)
- Community reaction: Pinegrow's forum called the restriction a "legal grey zone" and suggested Anime.js (MIT) as an alternative. — [Pinegrow forum](https://forum.pinegrow.com/t/gsap-has-been-acquired-by-webflow/9906)
- Contemporary coverage: [CodePen blog, 5 May 2025](https://blog.codepen.io/2025/05/05/chris-corner-gsap-more-like-freesap/); [Webflow forum](https://discourse.webflow.com/t/webflow-makes-gsap-100-free/319967)

### Inferences
- GSAP is not open source (it is not MIT). It is free under a proprietary license. For a portfolio that is irrelevant, but it is worth one line in the report.
- For scroll storytelling (pinning, scrubbed multi-step timelines, SplitText line/char reveals, MorphSVG, Flip), GSAP + ScrollTrigger is more capable and battle-tested than Motion's `useScroll` / `scroll()`. Motion is more idiomatic for React component state, gestures, layout and presence animations. A common Awwwards-tier split is **Motion for UI micro-interactions + GSAP for scroll set-pieces**. Using both costs bundle size, so load GSAP only on routes or sections that need it, via dynamic import inside a client component.
- In Next.js, GSAP code must live in `'use client'` components. Register plugins once (`gsap.registerPlugin(ScrollTrigger, SplitText)`) and scope or clean up animations on unmount, which is what `useGSAP` from `@gsap/react` is for.

### Gaps
- I did not fetch the official `@gsap/react` / `useGSAP` docs this session. From prior knowledge (unverified this session), `useGSAP()` is a drop-in for `useEffect` / `useLayoutEffect` that auto-reverts animations via `gsap.context()` and supports `scope` and `contextSafe`. Verify at gsap.com/resources/React.
- I did not confirm the current GSAP version as of Oct 2026 (3.13 is the last version confirmed here).
- A third-party mirror of an *older* license version said the no-charge license applied only if end users are not charged. Current Webflow messaging says commercial use is covered. Read the official text at gsap.com/standard-license.

---

## Lenis smooth scrolling: status, accessibility, GSAP ScrollTrigger + Next.js integration

### Takeaway
Lenis (darkroom.engineering, v1.3.x) is the de-facto smooth-scroll library. It wraps native scroll, so sticky positioning, anchors, find-in-page and keyboard scrolling keep working, and it disables smoothing by default under `prefers-reduced-motion`. To integrate with ScrollTrigger, drive Lenis from `gsap.ticker` and call `ScrollTrigger.update` on scroll.

### Cited Findings
- README version reference: **1.3.26**. Lenis has zero runtime dependencies, is "a few KB", and has a React adapter at `lenis/react`. — [Lenis README @1.3.26](https://cdn.jsdelivr.net/gh/darkroomengineering/lenis@1.3.26/README.md)
- Official GSAP wiring — [Lenis README](https://cdn.jsdelivr.net/gh/darkroomengineering/lenis@1.3.26/README.md):
  ```js
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- `autoRaf` defaults to `false`. When true, Lenis runs its own rAF loop. Without either `autoRaf` or a manual `raf` call, nothing updates. — [Lenis README](https://cdn.jsdelivr.net/gh/darkroomengineering/lenis@1.3.26/README.md)
- Accessibility — [Lenis README](https://cdn.jsdelivr.net/gh/darkroomengineering/lenis@1.3.26/README.md):
  - Lenis wraps native scroll, so `position: sticky`, anchor links and accessibility keep working.
  - With `respectReducedMotion: true` (the default), it turns smoothing off: scrolling follows the input directly and programmatic scrolls jump. Lenis keeps running so WebGL/DOM sync still works.
  - It detects live changes to the preference, and a `prefersReducedMotion` getter is available.
- Known limitations — [Lenis README](https://cdn.jsdelivr.net/gh/darkroomengineering/lenis@1.3.26/README.md):
  - No CSS scroll-snap (use `lenis/snap`)
  - Safari capped at 60fps (30fps in Low Power Mode)
  - No smoothing over iframes
  - Possible `position: fixed` lag on pre-M1 macOS Safari
  - `syncTouch` quirks on iOS below 16
  - Nested scroll containers need configuration
- Community Next.js guidance: put the provider in a `'use client'` component, and avoid a second rAF loop when using GSAP (use `autoRaf: false` + `gsap.ticker`), since dual loops cause scroll jumps. — [hontran.dev guide](https://www.hontran.dev/blog/nextjs-smooth-scroll-gsap-lenis); [community skill](https://claudskills.com/skills/scroll-animation/SKILL.md)
- A comparison credits Lenis with find-in-page and keyboard support where Locomotive and ScrollSmoother lack them. This is a third-party opinion. — [learnwithhasan Lenis page](https://learnwithhasan.com/js-libraries/lenis/)

### Inferences
- Lenis is preferable to GSAP ScrollSmoother for accessibility because it does not transform-translate the whole page.
- Smooth scrolling still changes the feel of native scrolling. Keep `lerp` / `duration` mild, never hijack scroll *direction* or speed per section, and keep touch native (`syncTouch: false`, the default) to avoid scroll-jacking complaints.
- In App Router, mount `<ReactLenis root>` (from `lenis/react`) in a client provider in `app/layout.tsx`. On route change, call `lenis.scrollTo(0, { immediate: true })` and `ScrollTrigger.refresh()` after the new content mounts.

### Gaps
- A search index referenced a "Lenis v2 with auto CSS injection", but I could not confirm it against the official repo. The latest stable version as of Oct 2026 is unverified beyond 1.3.26.
- I found no official Lenis docs on App Router route-transition specifics.

---

## WebGL/3D: R3F v9 + drei, OGL, Three.js WebGPU, shader heroes (Unicorn Studio, Spline): mobile cost, lazy loading, fallbacks

### Takeaway
- **Stable stack:** R3F **9.x** (9.8.0, Sep 2026) on React 19, with Three.js ~r186. Its `WebGPURenderer` (`three/webgpu`) auto-falls back to WebGL2.
- **Not production-ready:** R3F **v10 (WebGPU-first) is still alpha**.
- **WebGPU caveats:** it requires porting `ShaderMaterial` to TSL and breaks drei `<Text>` and `@react-three/postprocessing`.
- **Pragmatic portfolio hero:** a lightweight WebGL shader (OGL, raw WebGL, or R3F + `WebGLRenderer`) or Unicorn Studio, lazy-initialized after LCP, with a static image/CSS-gradient poster as both the LCP element and the reduced-motion/no-WebGL fallback.

### Cited Findings
- R3F v8 pairs with React 18 and **R3F v9 pairs with React 19**. The v9 migration moves JSX types to the `ThreeElements` interface. — [R3F v9 migration guide](https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide)
- Stable R3F is **9.8.0 (Sep 2026)**. Its async `gl` factory receives default props, so you create a `WebGPURenderer` and `await renderer.init()`, then call `extend(THREE)` for node materials. — [Utsubo WebGPU migration guide, updated 24 Sep 2026](https://www.utsubo.com/ja/blog/webgpu-threejs-migration-guide)
- Drei components that **do not work with WebGPURenderer**: `Text` (relies on shader patching), child-based `Environment`, and `@react-three/postprocessing`. — [Utsubo](https://www.utsubo.com/ja/blog/webgpu-threejs-migration-guide)
- Three.js r186 (Sep 2026) — [Utsubo](https://www.utsubo.com/ja/blog/webgpu-threejs-migration-guide):
  - Imports: `three/webgpu` and `three/tsl` (since r171).
  - Fallback: `WebGPURenderer` falls back to WebGL2 once at init. Check `renderer.backend.isWebGPUBackend`.
  - Shaders: `ShaderMaterial`, `RawShaderMaterial` and `onBeforeCompile` fail on *both* backends under WebGPURenderer and must be ported to TSL, which compiles to WGSL or GLSL.
  - Post-processing: `EffectComposer` and pmndrs postprocessing don't work. Use `RenderPipeline` (named `PostProcessing` before r183).
- WebGPU browser support (Sep 2026) — [Utsubo](https://www.utsubo.com/ja/blog/webgpu-threejs-migration-guide):
  - Chrome/Edge 113+ on desktop Windows, macOS and ChromeOS
  - Android Chrome 121+ on Android 12+
  - Safari 26 on macOS, iOS, iPadOS and visionOS 26
  - Firefox: Windows 141+, macOS 145/147+. Not on Linux or Android stable.
  - About 87% global coverage (caniuse, Aug 2026)
  - iOS devices below 26 get the WebGL2 fallback
- **R3F v10 is alpha** (alpha.4/alpha.5): first-class WebGPU/TSL, compute-buffer and storage-texture hooks, `usePostProcessing` replaced by `useRenderPipeline`, and a `@react-three/fiber/webgpu` entry. Drei v11 is also alpha. — [newreleases v10 alpha.4](https://newreleases.io/project/github/pmndrs/react-three-fiber/release/v10.0.0-alpha.4); [alpha.5](https://newreleases.io/project/npm/@react-three/fiber/release/10.0.0-alpha.5)
- **Unicorn Studio** (no-code WebGL) — [Unicorn Studio performance docs](https://unicorn.studio/docs/performance); [Unicorn Studio FAQ](https://www.unicorn.studio/docs/faqs):
  - Loading: `data-us-lazyload="true"` defers init until the scene nears the viewport, and `data-us-production="true"` serves scene data from a CDN.
  - Cost: each layer is its own shader pass. Keep it to no more than 10 scenes per page. Aurora-style effects are expensive.
  - Heavy effects: 3D shape, mouse trail/ripple, bloom, godrays, bokeh and 2D light are memory-heavy. Lowering DPI or scale helps.
- Unicorn Studio mobile levers: `data-us-scale`, `data-us-dpi` and `data-us-fps` (sample: 0.75 / 1.25 / 45fps). The runtime is reported at about 29kb gzip and pauses offscreen. This is third-party, not official. — [Unicorn Studio skill](https://skills.sh/mengto/skills/unicorn-studio); [uithings explainer](https://uithings.com/what-is-unicorn-studio)
- **Spline**: in one case study, lazy-loading Spline assets moved a site's Lighthouse score from 30 to 90. Eager Spline loading was blocking the main thread. — [DEV case study](https://dev.to/tolumen/optimizing-web-performance-how-lazy-loading-spline-assets-took-our-build-from-30-to-90-in-4ne2). A newsletter notes widespread complaints about Spline load times. — [Spline Time newsletter](https://splinetime3d.substack.com/p/spline-womp-and-unicorn-studio-updates)
- Designer-oriented shader hero techniques are covered in [Codrops, Mar 2026](https://tympanus.net/codrops/2026/03/04/webgl-for-designers-creating-interactive-shader-driven-graphics-directly-in-the-browser/).

### Inferences
- **Next.js integration:** load the Canvas via `next/dynamic(() => import('./HeroCanvas'), { ssr: false })` inside a client component. Mount it after idle or on viewport intersection (IntersectionObserver / `requestIdleCallback`) so WebGL setup never competes with LCP or hydration.
- **Mobile cost controls:** `dpr={[1, 1.5]}`, `frameloop="demand"` or pausing when offscreen, `<PerformanceMonitor>` / adaptive DPR (drei), and skipping 3D entirely on `prefers-reduced-motion`, `Save-Data`, or low `navigator.hardwareConcurrency` / `deviceMemory`.
- **Fallbacks:** render a static poster (AVIF/WebP via `next/image` with `priority`, or a CSS gradient) in the server component as the LCP element, then cross-fade the canvas in on top.
- **Renderer choice for a portfolio in Oct 2026:** stay on `WebGLRenderer` with GLSL if you rely on drei `<Text>`, postprocessing, or existing shader snippets. Choose `WebGPURenderer` + TSL only for a greenfield shader with compute needs. WebGPU gives little benefit for a single full-screen fragment-shader gradient.
- **OGL** (about 10x smaller than three) remains a good fit for a lone shader-plane hero, but I gathered no 2026 sources on it this session.

### Gaps
- I found no 2026 data on OGL (version, size) or the Spline runtime size. No mobile benchmarks comparing R3F / OGL / Unicorn / Spline were found.
- The R3F 9.8.0 version comes from a third-party (Utsubo) article. Confirm on npm.

---

## Native platform APIs: View Transitions in Next.js 16 / React, CSS scroll-driven animations, @starting-style, anchor positioning

### Takeaway
- **View Transitions:** React **19.3 ships `<ViewTransition>` stable** (imported from `react`), and the Next.js 16 App Router supports it **with no configuration**. Route navigations are transitions. `<Link transitionTypes>` enables directional animations.
  - **Status conflict:** the separate `next.config` `experimental.viewTransition` flag page still describes the flag as experimental. This needs reconciling.
- **CSS scroll-driven animations:** supported in Chromium (115+) and Safari 26, but **MDN still marks `animation-timeline` as not Baseline**, and Firefox appears to keep it behind a flag as of mid-2026. Use it as progressive enhancement.
- **Anchor positioning:** Baseline Newly available since Firefox 147 (Jan 2026).

### Cited Findings
- **Next.js View Transitions guide** (lastUpdated 2026-10-15) — [Next.js: Designing view transitions](https://nextjs.org/docs/app/guides/view-transitions):
  - **Setup:** "View transitions work in the App Router with no configuration. React 19.3 includes the `<ViewTransition>` component and `addTransitionType` API." Import with `import { ViewTransition } from 'react'`.
  - **Triggers:** activated by Transitions, `<Suspense>` and `useDeferredValue`, not by plain `setState`. "In Next.js, route navigations are transitions," so animations run automatically.
  - **Patterns:**
    - Shared-element morph via matching `name`
    - Suspense reveal (`enter` / `exit`)
    - Directional slides with `<Link transitionTypes={['nav-forward']}>` (also available in `router.push` / `replace`)
    - Same-route crossfade via `key`
  - **Placement gotcha:** put enter/exit wrappers in `page.tsx`, not `layout.tsx`, because layouts persist.
  - **`default="none"`:** prevents unrelated crossfades.
  - **Morph timing:** the morph only pairs if the destination renders in the same commit (prefetched). If the destination suspends, it falls back to an enter animation.
  - **Browser support:** uses transition types and `view-transition-class` (Chromium 125+, recent Safari/Firefox). "Some animations may behave differently in Safari." Without support, transitions simply don't animate.
  - **Interactivity:** the overlay captures pointer events. Fix with `::view-transition { pointer-events: none; }`.
  - **Reduced motion:** set `animation-duration: 0s` on `::view-transition-old/new/group(*)` under `prefers-reduced-motion: reduce`. A more refined option keeps opacity crossfades and removes positional movement.
  - **Browser back:** browser back/swipe navigations carry no transition type, so directional slides don't play there.
- **Experimental flag:** the `next.config` reference for `experimental.viewTransition` (Next.js docs 16.2.3, Apr 2026) says it is experimental and not recommended for production. The Next.js 15 docs used the `unstable_ViewTransition` import. — [Next.js viewTransition config](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition); [Next.js 15 docs](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/viewTransition). **Conflict:** the Oct 2026 guide says no configuration is needed with React 19.3. Treat the flag page as possibly stale, or as covering additional integration behavior.
- Motion 13.4 `AnimateView` builds on React's `ViewTransition`. — [Motion changelog](https://motion.dev/docs/changelog)
- **`animation-timeline`:** MDN shows "Limited availability" (not Baseline) and recommends `@supports (animation-timeline: scroll())` feature detection. — [MDN animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)
- **Interop 2026** includes scroll-driven animations (`animation-timeline`, `scroll-timeline`, `view-timeline`) as a focus area. — [web.dev Interop 2026](https://web.dev/blog/interop-2026?hl=en)
- **Firefox status, conflicting sources:**
  - Behind the flag: one blog says the feature was still behind `layout.css.scroll-driven-animations.enabled` in Firefox 152 stable (June 2026). — [buildmvpfast](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026)
  - Shipped: another source claims Firefox 133 shipped it. — [codercops blog](https://blog.codercops.com/blog/css-view-transitions-scroll-animations-2026)
  - Resolution: MDN's not-Baseline status supports the "not shipped by default" reading.
- **Safari:** sources give conflicting versions (18.2, 18.4, or 26.0). — [CSS Portal](https://www.cssportal.com/css-properties/animation-timeline.php); [buildmvpfast](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026)
- **Scroll-*triggered* animations** (`animation-trigger`, a separate feature) are in Chrome/Edge 146+ (Mar 2026). Safari 26.6 and Firefox 154 lack them as of Aug 2026. — [Chrome blog: scroll-triggered animations](https://developer.chrome.com/blog/scroll-triggered-animations)
- **CSS anchor positioning** became Baseline Newly available with Firefox 147 (13 Jan 2026), alongside Chrome/Edge 125 and Safari 26. — [web.dev: New to the web platform in January 2026](https://web.dev/blog/web-platform-01-2026); [MDN anchor()](https://developer.mozilla.org/docs/Web/CSS/anchor). A spec maintainer reportedly called it "still in beta" in terms of quirks. — [buildmvpfast](https://www.buildmvpfast.com/blog/css-anchor-positioning-baseline-delete-floating-ui-2026)

### Inferences
- **Route transitions:** prefer native React `<ViewTransition>` (or Motion's `AnimateView`) over `AnimatePresence`-style page exit hacks. This keeps pages as RSCs, because `<ViewTransition>` can be used inside server components, as the guide's async server component examples show, and costs no animation JS.
- **Scroll reveals:**
  - Simple parallax and progress effects: CSS `animation-timeline: view()` inside `@supports`. It runs off the main thread in Chromium and Safari, and Firefox users get the static state.
  - Complex pinned or scrubbed sequences: GSAP ScrollTrigger.
- **Cross-document (MPA) view transitions** (`@view-transition { navigation: auto; }`) are not relevant to a Next.js SPA-style App Router, except for hard navigations.

### Gaps
- **`@starting-style`:** no source retrieved this session. Prior knowledge (unverified here): it shipped in Chrome 117, Safari 17.5 and Firefox 129, making it Baseline 2024. Verify on MDN or caniuse.
- I could not definitively resolve Firefox and Safari version numbers for `animation-timeline`. Check the caniuse "css-scroll-timeline" entry.
- I could not reconcile the `experimental.viewTransition` flag status with the "no configuration" guide. Check the Next.js 16.x release blog.

---

## Best practices: prefers-reduced-motion, INP/LCP, avoiding scroll-jacking, LCP text not gated by JS

### Takeaway
- **LCP:** keep the hero headline and poster image server-rendered and visible at first paint, and animate them as an enhancement rather than starting from `opacity: 0` set by JS.
- **Reduced motion:** honor it at every layer: CSS view-transition rules, Lenis (on by default), `MotionConfig reducedMotion="user"`, and `gsap.matchMedia()`.
- **Interactivity:** load WebGL and GSAP lazily after LCP.
- **Scroll-jacking:** avoid it. Lenis smoothing is acceptable, but per-section scroll hijacking is not.

### Cited Findings
- **Lenis:** disables smoothing under reduced motion by default and keeps native accessibility behaviors. — [Lenis README](https://cdn.jsdelivr.net/gh/darkroomengineering/lenis@1.3.26/README.md)
- **View transitions:**
  - Directional slides are "the most common trigger for motion sensitivity". Opacity crossfades carry less risk.
  - Disable view-transition durations under `prefers-reduced-motion`, or keep fades and remove movement.
  - Make the `::view-transition` overlay non-blocking so clicks aren't lost (which helps interactivity).

  — [Next.js view transitions guide](https://nextjs.org/docs/app/guides/view-transitions)
- **SplitText:** sets `aria-label` and `aria-hidden` so screen readers read whole text rather than split characters. — [GSAP 3.13](https://gsap.com/blog/3-13/)
- **Spline:** eager-loaded assets blocked the main thread, and lazy-loading moved Lighthouse from 30 to 90. — [DEV case study](https://dev.to/tolumen/optimizing-web-performance-how-lazy-loading-spline-assets-took-our-build-from-30-to-90-in-4ne2)
- **Unicorn Studio:** recommends lazy-loading scenes and limiting the number of scenes per page. — [Unicorn Studio performance](https://unicorn.studio/docs/performance)
- **Motion bundle:** `m` + `LazyMotion` cuts initial Motion JS from 43kb to about 5kb, which reduces hydration and main-thread cost. — [Motion bundle size](https://motion.dev/docs/react-reduce-bundle-size)
- **Scroll-driven CSS:** use feature detection with `@supports (animation-timeline: scroll())`. — [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)

### Inferences
- **LCP rule:** never server-render the hero H1 at `opacity: 0` waiting for JS. Animate with CSS keyframes that start at paint, or with `@starting-style`. Alternatively, render the final state and add a `.js-ready` class to animate secondary elements only. Text that is hidden until hydration counts against LCP and risks invisible content if JS fails.
- **INP:**
  - Keep scroll handlers off the main thread: prefer CSS scroll timelines and compositor-only properties (`transform`, `opacity`).
  - Avoid animating layout properties.
  - Use GSAP/Motion `will-change` sparingly.
  - Pause offscreen canvases.
  - Avoid long tasks during SplitText splitting on large text blocks.
- **Scroll-jacking:** don't alter scroll speed or direction per section, don't trap scroll in pinned sections longer than about one viewport of extra travel without an obvious progress cue, and keep native touch scrolling.
- **One reduced-motion switch:**
  - CSS: `@media (prefers-reduced-motion: reduce)`.
  - Motion: `<MotionConfig reducedMotion="user">`.
  - GSAP: `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)`.
  - Lenis: default behavior.
  - WebGL: render the static poster.

### Gaps
- No 2026 web.dev or Chrome articles with quantitative INP/LCP impact of animation libraries were retrieved this session.
- `MotionConfig reducedMotion` and `gsap.matchMedia()` are from prior knowledge, not re-verified this session.
