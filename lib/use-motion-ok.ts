"use client";

import { useSyncExternalStore } from "react";

const NO_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";

/**
 * The one switch for JavaScript-driven motion: true only when the visitor hasn't asked for
 * reduced motion (and, optionally, an extra media query matches, e.g. "(pointer: fine)").
 * CSS motion uses the same media query directly. Always false during server render, so effects
 * only start after hydration and the server HTML is the static version.
 */
export function useMotionOk(extraQuery?: string): boolean {
  const query = extraQuery ? `${NO_REDUCED_MOTION} and ${extraQuery}` : NO_REDUCED_MOTION;
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
