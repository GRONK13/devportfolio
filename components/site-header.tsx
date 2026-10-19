"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { sections, type SectionId } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CommandMenu } from "./command-menu";
import { Download, Menu, Search } from "./icons";
import { ThemeToggle } from "./theme";

function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

export function SiteHeader() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled ? "border-border bg-bg/80 backdrop-blur-lg" : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label={`${profile.name}, home`}>
          <span className="grid size-8 place-items-center rounded-lg bg-fg font-mono text-xs font-bold text-bg">{profile.initials}</span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Sections" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? "location" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm transition-colors hover:text-fg",
                    active === section.id ? "text-fg" : "text-muted",
                  )}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="hidden items-center gap-2 rounded-lg border border-border px-2.5 py-1.5 text-sm text-muted transition-colors hover:text-fg md:inline-flex"
            aria-label="Open quick navigation"
            aria-keyshortcuts="Control+K Meta+K"
          >
            <Search className="size-4" />
            <kbd className="font-mono text-[11px]">⌘K</kbd>
          </button>
          <ThemeToggle />
          <a
            href={profile.resume.href}
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-1.5 rounded-lg bg-fg px-3 py-1.5 text-sm font-medium text-bg transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <Download className="size-4" />
            Résumé
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>
      <CommandMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </header>
  );
}
