"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionOk } from "@/lib/use-motion-ok";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/+-";
const FRAME_MS = 45;
const FRAMES_PER_CHAR = 2;

/**
 * Mono label that flips through characters once, like a departures board, the first time it
 * scrolls into view, then settles on the real text. Use it only on monospace uppercase text, so
 * every frame has the same width (no layout shift). The real text is always in the DOM for
 * assistive tech; the animated copy is decorative.
 */
export function SplitFlap({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const enabled = useMotionOk();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        let frame = 0;
        const total = text.length * FRAMES_PER_CHAR + 6;
        timer = window.setInterval(() => {
          frame++;
          const settled = Math.floor(frame / FRAMES_PER_CHAR);
          setShown(
            [...text]
              .map((c, i) => (i < settled || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
              .join(""),
          );
          if (frame >= total) {
            window.clearInterval(timer);
            setShown(text);
          }
        }, FRAME_MS);
      },
      { threshold: 1 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [enabled, text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {shown}
      </span>
    </>
  );
}
