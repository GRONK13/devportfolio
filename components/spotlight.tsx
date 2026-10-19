"use client";

import { useEffect } from "react";

/** One pointer listener for the whole page that feeds the cursor position to the hovered tile's spotlight. */
export function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    function onMove(event: PointerEvent) {
      const tile = (event.target as Element | null)?.closest?.<HTMLElement>("[data-spotlight]");
      if (!tile) return;
      const rect = tile.getBoundingClientRect();
      tile.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      tile.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
