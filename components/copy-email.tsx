"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "./icons";
import { cn } from "@/lib/utils";

export function CopyEmailButton({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      className={cn(
        "group inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 font-mono text-sm transition-colors hover:border-accent",
        className,
      )}
    >
      <span>{email}</span>
      {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4 text-muted group-hover:text-fg" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}
