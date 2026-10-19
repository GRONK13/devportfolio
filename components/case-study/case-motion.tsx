"use client";

import { useEffect } from "react";
import { useMotionOk } from "@/lib/use-motion-ok";

/**
 * Scroll set pieces for a case study, driven by GSAP (ScrollTrigger + SplitText). GSAP is
 * imported dynamically here, so it ships only with /work/* pages, never with the home page, and
 * only loads when the visitor hasn't asked for reduced motion.
 *
 * Rules: transforms and opacity only (no layout shift), and nothing that is already on screen
 * when the effects start is hidden, so there's no flicker and LCP is untouched.
 *
 * Targets are marked with data attributes in app/work/[slug]/page.tsx:
 *   [data-case-progress]    reading-progress hairline (scrubbed)
 *   [data-case-cover]       cover frame; its image drifts and zooms slightly (scrubbed)
 *   [data-case-prose] h2    section headings rise in word by word (once, below the fold only)
 *   [data-case-next-title]  next-project title; letters rise into place (scrubbed)
 */
export function CaseMotion() {
  const enabled = useMotionOk();

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let revert: (() => void) | undefined;

    // Nothing here is visible before the visitor scrolls, so set up off the critical path:
    // on browser idle time, or on the first scroll if that comes sooner.
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      window.removeEventListener("scroll", start);
      if (idle) window.cancelIdleCallback?.(idle);
      void setUp();
    };
    const idle = window.requestIdleCallback?.(start, { timeout: 2500 });
    if (!idle) setTimeout(start, 1200); // Safari has no requestIdleCallback
    window.addEventListener("scroll", start, { passive: true, once: true });

    const setUp = async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);
      await document.fonts.ready; // split text only after the real font has set line breaks
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-case-progress]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } },
        );

        // Starts from the page top, so the first frame is the resting state (no jump on load).
        gsap.to("[data-case-cover] img", {
          yPercent: 6,
          scale: 1.08,
          ease: "none",
          scrollTrigger: { trigger: "[data-case-cover]", start: 0, end: "bottom top", scrub: true },
        });

        for (const heading of document.querySelectorAll<HTMLElement>("[data-case-prose] h2")) {
          if (heading.getBoundingClientRect().top < window.innerHeight) continue; // already visible
          SplitText.create(heading, {
            type: "words",
            mask: "words",
            aria: "auto",
            onSplit: (self) =>
              gsap.from(self.words, {
                yPercent: 110,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.06,
                scrollTrigger: { trigger: heading, start: "top 85%", once: true },
              }),
          });
        }

        const next = document.querySelector<HTMLElement>("[data-case-next-title]");
        if (next && next.getBoundingClientRect().top >= window.innerHeight) {
          SplitText.create(next, {
            type: "lines,chars",
            mask: "lines",
            aria: "none", // the link carries its own aria-label
            onSplit: (self) =>
              gsap.from(self.chars, {
                yPercent: 100,
                ease: "none",
                stagger: 0.02,
                scrollTrigger: { trigger: next, start: "top bottom", end: "top 60%", scrub: true },
              }),
          });
        }
      });
      revert = () => ctx.revert();
    };

    return () => {
      cancelled = true;
      started = true; // stop a pending start
      window.removeEventListener("scroll", start);
      if (idle) window.cancelIdleCallback?.(idle);
      revert?.();
    };
  }, [enabled]);

  return null;
}
