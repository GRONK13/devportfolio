"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/content/toc";

/**
 * Sticky "Contents" for a case study. Plain anchor links (works without JavaScript); the
 * section currently being read is marked with aria-current="location". Not motion, so it
 * stays on with reduced motion.
 */
export function CaseContents({ toc }: { toc: TocEntry[] }) {
  const [active, setActive] = useState(toc[0]?.id);

  useEffect(() => {
    const headings = toc.map((t) => document.getElementById(t.id)).filter((h): h is HTMLElement => h !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      // The last heading that has passed 35% of the viewport height is the one being read.
      const line = window.innerHeight * 0.35;
      let current = headings[0]?.id;
      for (const h of headings) if (h.getBoundingClientRect().top <= line) current = h.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [toc]);

  if (toc.length < 2) return null;
  return (
    <nav aria-label="Contents" className="sticky top-24">
      <h2 className="label text-muted">Contents</h2>
      <ol className="mt-4 space-y-2 border-l border-rule">
        {toc.map((t) => (
          <li key={t.id}>
            <a
              href={`#${t.id}`}
              aria-current={active === t.id ? "location" : undefined}
              className="-ml-px block border-l border-transparent pl-3 text-sm text-muted hover:text-fg aria-[current=location]:border-accent aria-[current=location]:text-fg"
            >
              {t.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
