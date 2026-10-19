"use client";

import { Moon, Sun } from "./icons";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "theme";

/** Runs before first paint (inlined with the CSP nonce) so the page never flashes the wrong theme. */
export const themeInitScript = `(()=>{try{const t=localStorage.getItem("${STORAGE_KEY}");const d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch{}})()`;

export function toggleTheme() {
  const root = document.documentElement;
  const next = root.classList.contains("dark") ? "light" : "dark";
  root.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable (private mode); the toggle still works for this visit.
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg",
        className,
      )}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <Sun className="hidden size-[18px] dark:block" />
      <Moon className="size-[18px] dark:hidden" />
    </button>
  );
}
