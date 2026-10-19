# Security Best Practices: Next.js 16 (App Router, React 19) Portfolio on Vercel (as of Oct 2026)

## 1. Content Security Policy in Next.js 16 (nonce via proxy.ts, trade-offs, alternatives, compatibility)

### Takeaway
The official Next.js 16 guidance is a nonce plus `'strict-dynamic'` CSP set in `proxy.ts` (renamed from `middleware.ts`), but it forces every page to render dynamically: no static generation, ISR, or CDN caching, and it doesn't work with PPR. For a mostly static portfolio, the realistic choices are a static header CSP in `next.config` (which needs `'unsafe-inline'` for scripts) or experimental SRI with hashes, which keeps static generation. A May 2026 advisory fixed an XSS that affected apps using CSP nonces, so nonce setups need to be on patched versions.

### Cited Findings
- The official guide (lastUpdated 2026-03-20) says a fresh nonce is generated per request, so "you **must use dynamic rendering to add nonces**." The proxy sets the `Content-Security-Policy` header on both the request and the response, plus an `x-nonce` request header. Next.js reads the nonce from the CSP header during SSR and attaches it to framework scripts, page bundles, inline scripts and styles it generates, and `<Script nonce>`. — [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy)
- The official `proxy.ts` example policy: `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}; style-src 'self' 'nonce-${nonce}'; img-src 'self' blob: data:; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;`. The nonce is `Buffer.from(crypto.randomUUID()).toString('base64')` and the exported function is `export function proxy(request: NextRequest)`. — [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy)
- Recommended matcher: `source: '/((?!api|_next/static|_next/image|favicon.ico).*)'` with `missing: [{ type: 'header', key: 'next-router-prefetch' }, { type: 'header', key: 'purpose', value: 'prefetch' }]`. — [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy)
- The guide lists these trade-offs for nonces: "all pages must be dynamically rendered", "Static optimization and Incremental Static Regeneration (ISR) are disabled", "Pages cannot be cached by CDNs without additional configuration", and "**Partial Prerendering (PPR) is incompatible** with nonce-based CSP". It also warns of slower first loads, more server load and higher hosting costs. You can force a page dynamic with `await connection()` from `next/server`. — [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy)
- Dev mode needs `'unsafe-eval'`, because React uses eval to rebuild server error stacks. Production does not, and "Neither React nor Next.js use `eval` in production by default." The dev variant also uses `style-src 'unsafe-inline'` in development. — [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy)
- **Static CSP without nonces** goes in `next.config.js` `headers()` with `script-src 'self' 'unsafe-inline'` and `style-src 'self' 'unsafe-inline'`. This keeps static rendering but allows inline script. — [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy)
- **SRI (experimental, App Router only, added in v14.0.0)** uses `experimental: { sri: { algorithm: 'sha256' } }` ('sha384' and 'sha512' are also allowed). It adds `integrity` hashes at build time, so pages "can be statically generated and cached", and the guide's example CSP drops `'unsafe-inline'` from script-src. Limits: it is experimental ("may change or be removed") and is "Build-time only: Cannot handle dynamically generated scripts". It can be combined with nonces on dynamic routes. — [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy)
- Troubleshooting notes from the guide: add `'wasm-unsafe-eval'` for WebAssembly. For inline styles, "Use CSS-in-JS libraries that support nonces or move styles to external files". Allowlist third-party domains in script-src and connect-src, and pass the nonce to `@next/third-parties` components, e.g. `<GoogleTagManager nonce={nonce} />`. — [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy)
- The May 2026 release included **GHSA-ffhc-5mcf-pf4q "XSS in App Router apps using CSP nonces"** (Moderate) and **GHSA-gx5p-jg67-6x7h "XSS in beforeInteractive scripts with untrusted input"**. Both are fixed in 16.2.6 / 15.5.18. — [Vercel changelog, May 2026](https://vercel.com/changelog/next-js-may-2026-security-release)
- A third-party guide notes that Next.js 16 uses `proxy.ts` with an exported `proxy` function, and that Edge-runtime code should use Web Crypto rather than Node's `crypto.randomBytes`. — [CentralCSP blog](https://next.centralcsp.com/en/blog/csp-nonce-nextjs)
- Vercel Speed Insights lets you set `scriptSrc` and `endpoint` to change where the script loads from and where metrics are sent, and Vercel configures these automatically on its platform. These are the origins a CSP has to allow. — [Vercel Speed Insights package docs](https://vercel.com/docs/speed-insights/package)

### Inferences
- **Recommendation for a portfolio:** keep pages static and CDN-cached. Use a `next.config` `headers()` CSP that is strict on everything except script/style inline: `object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests`. Optionally try `experimental.sri` to drop `'unsafe-inline'` from script-src. Only use the nonce/proxy approach if the site is dynamic anyway, since it removes the static/CDN advantage that matters most for a portfolio.
- Consider shipping the CSP as `Content-Security-Policy-Report-Only` first, with a `report-to` endpoint, and tightening it once the violations are understood. This is standard MDN/OWASP practice, not taken from the sources above.
- **Vercel Analytics / Speed Insights:** on Vercel these scripts are normally served first-party under `/_vercel/...` paths, so `'self'` usually covers them. Check the live network tab and add any hostnames you see to `script-src` and `connect-src`. (Unverified: no source in this pass confirmed the default hostnames.)
- **Animation libraries (GSAP, Framer Motion/Motion, etc.):** CSP `style-src` blocks `<style>` elements and `style="..."` attributes in markup. Styles that JS sets through the CSSOM (`el.style.transform = ...`) are generally not blocked. Libraries that inject `<style>` tags need a nonce or `'unsafe-inline'`, and SSR-rendered `style` attributes from React need `'unsafe-inline'` (or `'unsafe-hashes'`) under strict style-src. In practice most Next.js sites keep `style-src 'self' 'unsafe-inline'`; the XSS risk from that is much lower than from inline script. (Inference from general CSP semantics, not verified against a 2026 source.)
- **WebGL / Three.js / R3F:** shaders aren't governed by CSP. Textures and models loaded from blob: URLs need `img-src blob:` / `connect-src blob:`, and web workers need `worker-src 'self' blob:`. WASM decoders (Draco, Basis/KTX2) need `'wasm-unsafe-eval'`, which the Next.js guide mentions for WebAssembly in general.
- **Embedded CMS studio (e.g. Sanity Studio at `/studio`):** studios usually need much looser policies (e.g. inline styles, connections to `*.api.sanity.io` and websockets, and possibly `'unsafe-eval'` depending on the version). Give the studio route its own path-scoped CSP in `headers()` rather than loosening the policy for the whole site. If the studio is hosted elsewhere, the site's `frame-ancestors` has to allow the studio origin for preview/visual-editing iframes, but only on draft/preview routes.

### Gaps
- No official 2026 source found for the exact Vercel Web Analytics and Speed Insights hostnames to put in a CSP.
- No official Sanity (or other CMS) 2026 documentation found on CSP requirements for an embedded Studio.
- Couldn't confirm whether `experimental.sri` is still experimental in 16.3/16.4. The current guide still labels it experimental.
- No 2026 source found that tests specific animation libraries (GSAP, Motion, Lenis) against a strict style-src.

## 2. Other security headers (recommended values)

### Takeaway
Set these headers once in `next.config` `headers()` for `source: '/(.*)'`: HSTS with a 2-year max-age, frame-ancestors 'none' (plus X-Frame-Options DENY for old browsers), nosniff, Referrer-Policy strict-origin-when-cross-origin, a deny-by-default Permissions-Policy, and COOP same-origin. Don't send X-XSS-Protection, and drop X-Powered-By.

### Cited Findings
- Values recommended by OWASP:
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (check the preload requirements before submitting)
  - `X-Frame-Options: DENY` (CSP `frame-ancestors` supersedes it in supporting browsers)
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: geolocation=(), camera=(), microphone=()` (disable every feature you don't use)
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Embedder-Policy: require-corp` (blocks cross-origin resources that don't opt in)
  - `Cross-Origin-Resource-Policy: same-site`
  - Don't set `X-XSS-Protection`; use CSP instead. Remove `X-Powered-By`.
  — [OWASP HTTP Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
- Next.js's CSP examples include `frame-ancestors 'none'` and `upgrade-insecure-requests`. — [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy)

### Inferences
- Suggested `next.config.ts` (static, CDN-friendly):
  ```ts
  const securityHeaders = [
    { key: 'Content-Security-Policy', value: csp },           // see section 1
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=()' },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  ];
  export default { poweredByHeader: false, async headers() { return [{ source: '/(.*)', headers: securityHeaders }]; } };
  ```
- **Skip COEP `require-corp`** on a portfolio. It breaks cross-origin images, embeds (YouTube, CodePen) and many CDN assets unless they send CORP/CORS, and it's only needed for `SharedArrayBuffer`/cross-origin isolation, which a portfolio rarely uses. If you need isolation, `credentialless` is the softer option.
- CORP `same-site` can also break assets other sites hotlink. For a portfolio, OG images *should* load cross-origin in social-media crawlers, so either skip CORP or scope it so it doesn't cover OG/image routes.
- Vercel already serves HTTPS with HSTS on its domains. Add `preload` only on a custom apex domain where every subdomain serves HTTPS.
- If you add an embedded CMS or a preview iframe, set `frame-ancestors` per route (e.g. allow the CMS origin only on `/preview/*` or draft routes).

### Gaps
- Couldn't confirm the exact default headers Vercel adds automatically in 2026 (e.g. whether HSTS is set for custom domains by default).

## 3. Hardening Server Actions / Route Handlers and the contact form

### Takeaway
Treat every Server Action as a public POST endpoint. Validate with Zod, re-check auth inside each action, return minimal data, and rely on the built-in Origin/Host check for CSRF. For the contact form, layer three things: (a) Vercel BotID (invisible, free Basic tier on all plans) or Cloudflare Turnstile, (b) IP rate limiting (Vercel WAF rate-limit rule / `@vercel/firewall` `checkRateLimit`, or Upstash Ratelimit), and (c) a honeypot. Also keep `next` patched, since several 2026 advisories were Server Actions DoS and SSRF.

### Cited Findings
- From the official data-security guide (lastUpdated 2026-10-06):
  - "when a Server Action is created and exported, it is reachable via a direct POST request, not just through your application's UI."
  - Built-in protections: **encrypted, non-deterministic action IDs**, cached for up to 14 days and regenerated on a new build, and **dead-code elimination** of unused actions.
  - "A page-level authentication check does not extend to the Server Actions defined within it. Always re-verify inside the action." The guide also asks for authorization (IDOR) checks and filtered return values.
  — [Next.js Data Security guide](https://nextjs.org/docs/app/guides/data-security)
- **CSRF:** only POST can invoke Server Actions, and Next.js compares the `Origin` header with `Host`/`X-Forwarded-Host`, aborting the request on mismatch. `experimental.serverActions.allowedOrigins` lists extra trusted origins for reverse-proxy setups. — [Next.js Data Security guide](https://nextjs.org/docs/app/guides/data-security)
- **Closures:** closed-over variables are encrypted automatically with a per-build key, but "We don't recommend relying on encryption alone to prevent sensitive values from being exposed on the client." `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` (base64, 16/24/32 bytes, e.g. `openssl rand -base64 32`) is only needed for multi-instance self-hosting. — [Next.js Data Security guide](https://nextjs.org/docs/app/guides/data-security)
- The guide says to validate all client input (form data, params, headers, searchParams), recommends rate limiting expensive operations "(sending emails, writing to a database)", and says to audit `proxy.ts` and `route.ts` with extra care. — [Next.js Data Security guide](https://nextjs.org/docs/app/guides/data-security)
- **Vercel BotID:**
  - Basic is free on all Vercel plans; Deep Analysis (ML, powered by Kasada) is Pro/Enterprise.
  - It's fully invisible, and only works for projects deployed on Vercel.
  - Client: `initBotId({ protect: [{ path: '/api/contact', method: 'POST', advancedOptions: { checkLevel: 'basic' } }] })` from `botid/client/core`. Server: `const verification = await checkBotId(); if (verification.isBot) return 403`. `checkLevel` must match between client and server.
  - Turnstile instead: works on any host, free tier with unlimited verifications, single-use tokens valid for 300s, and needs a server-side POST to `https://challenges.cloudflare.com/turnstile/v0/siteverify` with the secret key kept server-side.
  — [Vercel KB: BotID vs Turnstile](https://examples.vercel.com/kb/guide/vercel-botid-vs-cloudflare-turnstile)
- BotID doesn't work with native HTML form posts (plain `action`/`method` without JS), because BotID never sees those requests; submissions must go through fetch/XHR. The docs' Next.js example calls `checkBotId()` inside a `'use server'` action. Local dev returns `isBot: false` unless `developmentOptions` is set. — [Vercel BotID form submissions docs](https://examples.vercel.com/docs/botid/form-submissions)
- A community thread reports BotID flagging all traffic as bots on one (Nuxt) site, with no resolution posted. — [Vercel Community](https://community.vercel.com/t/botid-incorrectly-flagging-all-traffic-as-bot/24548)
- **Vercel WAF rate limiting:** available on Hobby. Hobby gets 1 rate-limit rule per project (3 custom firewall rules total). Priced at $0.50 per 1M allowed requests, varying by region. The `@vercel/firewall` SDK exposes `checkRateLimit(ruleId, { rateLimitKey })`, keyed by IP by default. — [Vercel WAF rate limiting docs](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting); [Rate limiting SDK](https://vercel.com/docs/vercel-waf/rate-limiting-sdk); [Usage & pricing](https://vercel.com/docs/security/vercel-waf/usage-and-pricing). The search summary flagged the Hobby allowance as ambiguous across pages.
- **Recent Server Actions advisories:**
  - Oct 14, 2026: GHSA-p3m5-59mp-jv5r, a High-severity DoS in App Router Server Actions affecting 13.x–16.x apps with at least one Server Action, fixed in 16.4.1 / 15.5.28. — [Netlify changelog Oct 2026](https://www.netlify.com/changelog/2026-10-14-nextjs-react-security-vulnerabilities/)
  - July 2026: a Server Actions DoS and SSRF via rewrites and Server Actions, fixed in 16.2.11 / 15.5.21. — [CentralCSP summary](https://centralcsp.com/en/blog/nextjs-vulnerabilities-2026); [Netlify changelog Jul 2026](https://www.netlify.com/changelog/2026-07-21-nextjs-security-vulnerabilities/)

### Inferences
- **Contact-form action pattern:**
  ```ts
  'use server'
  import 'server-only'
  import { z } from 'zod'
  import { checkBotId } from 'botid/server'
  import { checkRateLimit } from '@vercel/firewall'
  const Schema = z.object({
    name: z.string().trim().min(1).max(100).regex(/^[^\r\n]*$/),
    email: z.string().trim().email().max(254),
    message: z.string().trim().min(10).max(5000),
    website: z.string().max(0).optional(), // honeypot: must be empty
  })
  export async function sendContact(_: unknown, formData: FormData) {
    if ((await checkBotId()).isBot) return { ok: false }
    const { rateLimited } = await checkRateLimit('contact-form')
    if (rateLimited) return { ok: false, error: 'Too many requests' }
    const parsed = Schema.safeParse(Object.fromEntries(formData))
    if (!parsed.success) return { ok: false, error: 'Invalid input' }
    if (parsed.data.website) return { ok: true } // silently drop bots
    // send via Resend: fixed `from`/`to`, user email only in `replyTo`
    return { ok: true }
  }
  ```
- **Email header injection with Resend:** never put user input into `from`, `to`, `cc` or `subject` without validation. Use a fixed verified `from` (e.g. `contact@yourdomain`) and a fixed `to` (yourself). Put the visitor's address only in `replyTo` after Zod `.email()` validation, and strip CR/LF from any user text used in the subject (the regex above). HTML-escape user content if you send `html`, or send `text` only, or use React Email components, which escape by default. Keep `RESEND_API_KEY` server-only and marked Sensitive in Vercel, and scope it to "sending access" for one domain. (This is general best practice; no Resend-specific 2026 source was fetched.)
- **Upstash Ratelimit** (`@upstash/ratelimit` + `@upstash/redis`, e.g. `Ratelimit.slidingWindow(3, '10 m')` keyed by IP from `x-forwarded-for` / `ipAddress()` from `@vercel/functions`) is the portable alternative when the single Hobby WAF rule is already used elsewhere or when you want per-key logic. Not verified against current Upstash docs in this pass.
- Prefer a Server Action over a public `route.ts` for the form. You get Origin checking and non-guessable action IDs for free. A Route Handler would need its own Origin check and CSRF handling.
- Ideally combine BotID/Turnstile with a rate limit. A honeypot alone stops only naive bots.

### Gaps
- Didn't fetch Resend's 2026 docs, so there's no Resend-specific source on idempotency keys or header handling.
- Didn't fetch Upstash Ratelimit docs. The API shape above comes from prior knowledge.
- The exact Hobby-plan included allowance for WAF rate-limit requests is ambiguous across Vercel pages.
- Whether BotID works through a progressively enhanced `<form action={serverAction}>` before JS hydrates isn't clear. The docs say native posts bypass it, so test it.

## 4. Next.js/React security advisories 2025–2026 and versions that matter

### Takeaway
2025–2026 brought a long run of critical Next.js/React advisories: React2Shell RCE (Dec 2025), RSC DoS and source exposure follow-ups, a 13-advisory release in May 2026, and further batches in July, August, September and October 2026. **As of Oct 19, 2026, the minimum safe version is Next.js 16.4.1 (or 15.5.28)**, with React 19.2.x at or above the latest patched release. Vercel says WAF rules can't reliably mitigate most of these, so upgrading is the only real fix. 14.x and older no longer get patches.

### Cited Findings
- **CVE-2025-29927 (Mar 2025), middleware auth bypass** via the `x-middleware-subrequest` header. Fixed in 15.2.3, 14.2.25, 13.5.9 and 12.3.5. The Next.js post lists Vercel-hosted apps, Netlify and static exports as not affected; it applies to self-hosted `next start` / standalone. — [Next.js blog CVE-2025-29927](https://nextjs.org/blog/cve-2025-29927); [Zscaler](https://www.zscaler.com/blogs/security-research/cve-2025-29927-next-js-middleware-authorization-bypass-flaw)
- **CVE-2025-55182 "React2Shell" (Dec 3, 2025):** CVSS 10.0, unauthenticated RCE via the RSC protocol, App Router only. Exploited in the wild and added to CISA KEV on Dec 5, 2025. The Next.js CVE-2025-66478 was rejected as a duplicate. Next.js fixes: 15.0.5, 15.1.9, 15.2.6, 15.3.6, 15.4.8, 15.5.7, 16.0.7. React: vulnerable 19.0.0, 19.1.0–19.1.1, 19.2.0; patched 19.0.3, 19.1.4, 19.2.3. — [CentralCSP](https://centralcsp.com/en/blog/nextjs-vulnerabilities-2026); [Invicti](https://invicti.com/blog/web-security/react2shell-critical-rce-in-react-rsc-next-js-cve-2025-55182-cve-2025-66478)
  - Sources disagree on scope: one summary says Next.js 15.x is the affected line with 13.x/14.x stable unaffected, while CentralCSP lists 15.x and 16.x. Both agree Pages Router and Edge Runtime are unaffected.
- **Follow-ups (Dec 11, 2025):**
  - CVE-2025-55184 (High, DoS) and CVE-2025-55183 (Medium, source code exposure) affect React 19.0.0–19.2.1 and Next.js 13.x–16.x.
  - CVE-2025-67779 was assigned because the first DoS fix "did not fully prevent denial-of-service attacks for all payload types".
  - Final patched Next.js: 14.2.35, 15.0.7, 15.1.11, 15.2.8, 15.3.8, 15.4.10, 15.5.9, 16.0.10.
  — [Vercel bulletin](https://vercel.com/kb/bulletin/security-bulletin-cve-2025-55184-and-cve-2025-55183); [Next.js blog Dec 11 2025](https://nextjs.org/blog/security-update-2025-12-11)
- **Mar 16, 2026: CVE-2026-27980**, unbounded `/_next/image` disk cache DoS (mainly self-hosted), fixed in 16.1.7 / 15.5.14. — [CentralCSP](https://centralcsp.com/en/blog/nextjs-vulnerabilities-2026)
- **May 7, 2026:** 13 advisories, fixed in 16.2.6 / 15.5.18. They include:
  - four High middleware/proxy authorization bypasses: segment-prefetch URL GHSA-267c-6grr-h53f plus an incomplete-fix follow-up, i18n default-locale, and dynamic route param injection
  - an RSC DoS (React CVE-2026-23870)
  - an SSRF via WebSocket upgrades
  - RSC cache poisoning
  - an XSS with CSP nonces
  React `react-server-dom-*` fixes: 19.0.6 / 19.1.7 / 19.2.6. All 13.x/14.x versions are affected. Vercel deployed no WAF rules: "cannot be reliably blocked at the WAF layer." — [Vercel changelog May 2026](https://vercel.com/changelog/next-js-may-2026-security-release)
- **Jul 20, 2026:** 9 advisories (Server Actions DoS, middleware bypass with Turbopack and a single locale, SSRF via rewrites and Server Actions; e.g. CVE-2026-64641/64642/64645/64649), fixed in 16.2.11 / 15.5.21. — [Netlify Jul 2026](https://www.netlify.com/changelog/2026-07-21-nextjs-security-vulnerabilities/); [CentralCSP](https://centralcsp.com/en/blog/nextjs-vulnerabilities-2026)
- **Aug 25, 2026:** both fixed in 16.3.3 / 15.5.24. — [The Hacker News](https://thehackernews.com/2026/08/nextjs-patches-critical-avif-and.html); [CentralCSP](https://centralcsp.com/en/blog/nextjs-vulnerabilities-2026)
  - AVIF image optimization RCE (GHSA-2xp9-vwfh-vxw4, CVSS 9.5, via libheif), exposed only when self-hosted with `image/avif` in `images.formats`.
  - CVE-2026-75604, incremental-cache path traversal leading to RCE on Windows hosts.
- **Sep 22, 2026:** out-of-band GHSA-vcvr-r3jv-pc5j, a critical upstream dependency issue, fixed in 16.3.6 / 15.5.26. — [Next.js blog](https://nextjs.org/blog/upcoming-nextjs-security-release-september-22-2026)
- **Sep 30, 2026:** 7 advisories (e.g. CVE-2026-94483, an Image Optimization SSRF when `remotePatterns` is set; SSG/ISR cache poisoning; info disclosure), fixed in 16.3.8 / 15.5.27. — [CentralCSP](https://centralcsp.com/en/blog/nextjs-vulnerabilities-2026)
- **Oct 14, 2026 (latest):** fixed in **16.4.1 / 15.5.28**. Also redeploy, and delete stale public preview deploys. — [Netlify Oct 2026](https://www.netlify.com/changelog/2026-10-14-nextjs-react-security-vulnerabilities/)
  - GHSA-673q-mjm6-r5xr (Critical): RCE in `use cache` functions that return typed arrays, 16.x with Cache Components.
  - GHSA-2464-fhr4-w9xw / CVE-2026-96889 (Critical): SVG-via-`sharp` RCE in Image Optimization / `next/og`. The upgrade bumps the bundled sharp.
  - GHSA-p3m5-59mp-jv5r (High): Server Actions DoS.
- **Outdated advice:** CentralCSP's post (written before Oct 14) calls 16.3.8 / 15.5.27 the "safe version". That is **superseded** by 16.4.1 / 15.5.28. Versions 14.x and older have no patched releases. — [CentralCSP](https://centralcsp.com/en/blog/nextjs-vulnerabilities-2026)

### Inferences
- Pin `next` to `^16.4.1` or later and `react`/`react-dom` to the latest 19.2.x. Enable Dependabot or Renovate security updates for `next`, `react` and `react-dom` with fast auto-merge, because Next.js shipped security releases roughly monthly in 2026.
- Many 2026 advisories hit features a portfolio may not need: Image Optimization with `remotePatterns`, AVIF, `next/og` with untrusted input, Cache Components with `use cache`, i18n middleware, rewrites. Disabling unused features (e.g. `images.unoptimized` for fully local static images, or a tight `remotePatterns`) shrinks the exposed surface.
- **Never rely on `proxy.ts` (middleware) alone for authorization.** At least six 2025–2026 advisories were proxy/middleware bypasses. Check auth again in the page, layout and Server Action (the DAL pattern).

### Gaps
- Exact patched React versions for the Oct 2026 release weren't listed in the Netlify summary. Check react.dev.
- hol.org and highcircl.com results were not used as sole sources. The CVE-2026-96889 details are corroborated by Netlify.
- Individual CVE IDs for some May/July 2026 advisories are only partially listed.

## 5. Supply chain and secrets (pinning, provenance, Renovate/Dependabot, Shai-Hulud, Vercel env vars, server-only, taint)

### Takeaway
After the Shai-Hulud worm waves (late 2025, 796 packages / 132M monthly downloads), the main defenses are: a release-age cooldown (pnpm 11 defaults to 1 day), blocking dependency install scripts by default with an allowlist (pnpm `allowBuilds`), committed lockfiles with frozen installs, a provenance-based trust policy, and cooldowns in Renovate/Dependabot too. For secrets, Vercel's April 2026 breach exposed env vars **not** marked Sensitive, so mark every secret Sensitive and keep server code behind `server-only` / the taint APIs.

### Cited Findings
- Shai-Hulud mechanics: a preinstall script harvested npm and GitHub tokens, then republished infected versions of the victim's other packages. Later waves (Shai-Hulud 2.0 / v3.0) reached 796 packages with 132M monthly downloads. Related incidents: s1ngularity (Aug 2025), the debug/chalk compromise (Sep 2025, resolved in about 2.5 hours), Glassworm (early 2026). — [Mondoo](https://mondoo.com/blog/npm-supply-chain-security-package-manager-defenses-2026)
- **pnpm 11 (Apr 2026):**
  - `minimumReleaseAge` defaults to 1440 minutes.
  - `strictDepBuilds: true` blocks dependency lifecycle scripts.
  - The `allowBuilds` map (e.g. `esbuild: true`, `sharp: true`) replaces `onlyBuiltDependencies`.
  - `trustPolicy: no-downgrade` (introduced in 10.21) blocks versions with weaker trust evidence (Trusted Publisher > Provenance > none) than earlier releases.
  - `blockExoticSubdeps` blocks git/tarball transitive dependencies.
  — [Mondoo](https://mondoo.com/blog/npm-supply-chain-security-package-manager-defenses-2026)
- **Yarn 4:** `enableScripts: false` by default, `npmMinimalAgeGate` (3 days), `enableHardenedMode`. **Bun:** blocks dependency scripts by default (`trustedDependencies`); `minimumReleaseAge` is opt-in. **npm CLI:** runs scripts by default, offering only `--ignore-scripts`. — [Mondoo](https://mondoo.com/blog/npm-supply-chain-security-package-manager-defenses-2026)
  - The sources disagree on npm: one source says npm v11.10 added a min-release-age setting but leaves it off by default, while Mondoo says npm has "no release cooldown". — [lilting.ch](https://lilting.ch/en/articles/pnpm-11-minimum-release-age-default-shai-hulud-defense); [everydev](https://www.everydev.ai/p/topic-npm-is-under-attack-by-a-worm-right-now-and-its-called-shaihulud)
- **Publisher side:** npm trusted publishing (OIDC from CI), Sigstore provenance attestations verifiable with `npm audit signatures` (roughly SLSA Build L2), granular tokens with expiry and IP limits, and mandatory 2FA for high-impact maintainers. Provenance proves where a package was built, not that its code is safe. — [Mondoo](https://mondoo.com/blog/npm-supply-chain-security-package-manager-defenses-2026)
- The cooldown only helps against compromises that get pulled within hours or days, not long-dwell takeovers. — [lilting.ch](https://lilting.ch/en/articles/pnpm-11-minimum-release-age-default-shai-hulud-defense)
- **Vercel April 2026 incident:**
  - A third-party AI tool (Context.ai) OAuth compromise led to a Vercel employee account takeover, which gave access to customer env vars **not marked "sensitive"**.
  - Vercel reports no evidence that Sensitive vars were accessed, and no Vercel-published npm packages or Next.js were tampered with.
  - Vercel's advice: rotate non-sensitive env vars (rotate upstream first), use Sensitive env vars, enable at least two authentication methods, and review activity logs.
  — [Vercel KB bulletin](https://examples.vercel.com/kb/bulletin/vercel-april-2026-security-incident); [GitGuardian](https://blog.gitguardian.com/vercel-april-2026-incident-non-sensitive-environment-variables-need-investigation-too)
- **Next.js code-level controls:**
  - `import 'server-only'` causes a build error if the module is imported on the client.
  - Only the DAL should read `process.env`.
  - `NEXT_PUBLIC_*` vars are inlined into the client bundle.
  - React taint APIs (`experimental_taintObjectReference`, `experimental_taintUniqueValue`) are enabled with `experimental: { taint: true }` and are "an additional layer", not a substitute for filtering.
  — [Next.js Data Security guide](https://nextjs.org/docs/app/guides/data-security)

### Inferences
- **Recommended setup for the portfolio:**
  - pnpm 11 with `minimumReleaseAge: 1440` (or more), `allowBuilds` listing only `sharp`, `esbuild` and `@tailwindcss/oxide` as needed, and `trustPolicy: no-downgrade`.
  - Commit `pnpm-lock.yaml` and install with `--frozen-lockfile` in CI (Vercel does this automatically when a lockfile exists).
  - Pin exact versions for direct dependencies.
- **Renovate:** `minimumReleaseAge: "3 days"` for non-security updates, with security updates exempt so Next.js patches land fast. **Dependabot:** use its `cooldown` option for the same effect. (The Renovate and Dependabot cooldown keys weren't verified against current docs in this pass.)
- **GitHub Actions:** pin actions to commit SHAs, give `GITHUB_TOKEN` least privilege (`permissions: contents: read`), and never put npm tokens in CI for a non-publishing portfolio repo.
- **Vercel env vars:**
  - Mark every secret (RESEND_API_KEY, TURNSTILE_SECRET_KEY, SANITY write token, revalidate secret) as **Sensitive**.
  - Scope secrets to Production only where possible, and keep Preview deployments on separate, lower-privilege keys.
  - Turn on Vercel Deployment Protection for previews.
  - Rotate anything created before April 2026 that wasn't marked Sensitive.
  - Enable 2FA/passkeys on the Vercel and GitHub accounts, and review the third-party OAuth apps connected to Google Workspace / GitHub, since that was the April 2026 entry vector.
- Add a pre-commit secret scanner (gitleaks or GitHub push protection). `.env` files are already untracked in this repo but should be confirmed in `.gitignore`.

### Gaps
- Didn't verify the current Renovate `minimumReleaseAge` and Dependabot `cooldown` syntax against 2026 docs.
- Couldn't confirm whether npm CLI has shipped a default-on cooldown by Oct 2026; the sources conflict.
- No primary npm/GitHub source fetched on the 2026 status of classic token deprecation.

## 6. Securing an optional CMS/admin route (auth, draft mode, webhooks)

### Takeaway
If a CMS is added, keep editing in the hosted CMS, or put an embedded studio behind the CMS's own login, with a path-scoped CSP. Turn on Draft Mode only through a route that checks a secret or uses the CMS's signed handshake. Verify the HMAC signature on every revalidation webhook before calling `revalidateTag`. Re-check auth in every admin Server Action, never in `proxy.ts` alone.

### Cited Findings
- **Sanity + Next.js pattern:** `parseBody` from `next-sanity/webhook` validates the webhook signature against a secret env var, returns 401 on an invalid signature, then calls `revalidateTag` by document type. Configure the webhook in Sanity under Settings → API → Webhooks. — [skills.sh vercel-plugin cms](https://skills.sh/vercel/vercel-plugin/cms) (mirror of a plugin skill page, not official Sanity docs)
- **Draft mode / visual editing:** render `<VisualEditing>` only when `(await draftMode()).isEnabled`. In next-sanity v11+, import it from `next-sanity/visual-editing`. Visual Editing requires Sanity Studio v5+ (React 19.2). — [skills.sh vercel-plugin cms](https://skills.sh/vercel/vercel-plugin/cms)
- The official guide says page-level auth doesn't protect Server Actions, so re-check inside each action. It recommends a `server-only` DAL with authorization checks. — [Next.js Data Security guide](https://nextjs.org/docs/app/guides/data-security)
- Several 2026 advisories were authorization bypasses of middleware/proxy, including segment-prefetch URLs, i18n default locale, and dynamic param injection. — [Vercel changelog May 2026](https://vercel.com/changelog/next-js-may-2026-security-release)

### Inferences
- **Webhook route (`app/api/revalidate/route.ts`):**
  - Read the raw body (`await req.text()`) and verify the HMAC signature with a constant-time compare (`crypto.timingSafeEqual`), or use the CMS SDK helper (`parseBody` / `@sanity/webhook` `isValidSignature`).
  - Reject stale timestamps to block replays.
  - Validate the payload with Zod, then `revalidateTag(tag)` only for an allowlisted set of tags.
  - Exclude this route from the CSP proxy matcher (the docs' matcher already skips `/api`).
- **Draft mode enable route:** require a secret (or the CMS's `defineEnableDraftMode` helper, which validates a signed preview URL), validate the redirect `slug` against your own routes to avoid open redirects, and set `draftMode().enable()`. The resulting `__prerender_bypass` cookie is HttpOnly, Secure and SameSite=None for iframe preview, so scope preview iframes with `frame-ancestors` to the CMS origin only.
- **Admin routes:**
  - Prefer the hosted CMS UI (sanity.studio / the CMS's own dashboard). That removes all auth code from the portfolio.
  - If you need a custom `/admin`, use a maintained auth library (Auth.js / Clerk / Better Auth) with passkeys or GitHub OAuth limited to your own account ID.
  - Add `noindex` (`robots: { index: false }`) and Vercel Deployment Protection / password protection where possible.
  - Put per-action `auth()` checks in a DAL.
- Use read-only CMS tokens on the public site, and keep any write token server-only and Sensitive in Vercel.

### Gaps
- No official Sanity docs fetched; the details come from a mirrored skill page. Exact current APIs (`defineEnableDraftMode`, `@sanity/webhook` vs `next-sanity/webhook`) should be checked against sanity.io docs.
- No research on alternative CMSs (Payload, Keystatic, Contentful) and their specific security configs.
- No 2026 source on the exact cookie attributes of Next.js 16's draft-mode cookie.
