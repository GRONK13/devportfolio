"use client";

import { useEffect, useRef } from "react";
import { useMotionOk } from "@/lib/use-motion-ok";

const RADIUS = 320; // px of pointer influence
const BASE = { wdth: 112, wght: 780 }; // matches .display
const PEAK = { wdth: 78, wght: 900 }; // pressed: condensed and heavy, so glyphs shrink inside their boxes

/**
 * The hero name, one span per letter. With a fine pointer and no reduced-motion preference,
 * letters near the pointer are "pressed": condensed along Mona Sans' width axis and made heavier.
 *
 * Each letter's box is locked to its resting width before the effect starts, so glyphs change
 * inside their boxes and nothing around them moves (no layout shift). The parent h1 carries the accessible
 * name; these spans are decorative.
 */
export function PressureName({ lines }: { lines: string[] }) {
  const root = useRef<HTMLSpanElement>(null);
  const enabled = useMotionOk("(hover: hover) and (pointer: fine)");

  useEffect(() => {
    const el = root.current;
    if (!enabled || !el) return;
    const letters = [...el.querySelectorAll<HTMLSpanElement>("[data-letter]")];

    let frame = 0;
    let pointer: { x: number; y: number } | null = null;
    let visible = false;
    let locked = false;

    // Measure resting widths only once the web font is in (measuring the fallback font would
    // shift letters when Mona Sans arrives), and again after resizes, since the name is sized in vw.
    const lock = () => {
      for (const l of letters) {
        l.style.transition = "none"; // measure the resting shape, not a frame mid-transition
        l.style.width = "";
        l.style.fontVariationSettings = "";
      }
      for (const l of letters) l.style.width = `${l.getBoundingClientRect().width}px`;
      for (const l of letters) l.style.transition = "";
      locked = true;
    };
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) lock();
    });
    const onResize = () => {
      if (!locked) return;
      locked = false;
      pointer = null;
      requestAnimationFrame(lock);
    };

    const render = () => {
      frame = 0;
      for (const l of letters) {
        let t = 0;
        if (pointer) {
          const r = l.getBoundingClientRect();
          const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
          t = Math.max(0, 1 - d / RADIUS) ** 1.5;
        }
        const wdth = BASE.wdth + (PEAK.wdth - BASE.wdth) * t;
        const wght = BASE.wght + (PEAK.wght - BASE.wght) * t;
        l.style.fontVariationSettings = `"wdth" ${wdth.toFixed(1)}, "wght" ${wght.toFixed(0)}`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onMove = (e: PointerEvent) => {
      if (!visible || !locked) return;
      pointer = { x: e.clientX, y: e.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };

    // Only listen while the hero is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (!visible) onLeave();
    });
    io.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelled = true;
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      for (const l of letters) {
        l.style.width = "";
        l.style.fontVariationSettings = "";
      }
    };
  }, [enabled]);

  return (
    <span ref={root} aria-hidden="true">
      {lines.map((line, i) => (
        <span key={i} className={i > 0 ? "block md:pl-[12%]" : "block"}>
          {[...line].map((char, j) =>
            char === " " ? (
              " "
            ) : (
              <span key={j} data-letter className="pressure-letter">
                {char}
              </span>
            ),
          )}
        </span>
      ))}
    </span>
  );
}
