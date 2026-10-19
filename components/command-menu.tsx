"use client";

import { useEffect, useId, useMemo, useRef, useState, type ComponentType, type SVGProps } from "react";
import { useRouter } from "next/navigation";
import { sections } from "@/lib/site";
import { ArrowUpRight, Copy, Download, Folder, GitHub, Hash, LinkedIn, Mail, Moon, Search } from "./icons";
import { toggleTheme } from "./theme";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  group: "Jump to" | "Projects" | "Links" | "Actions";
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  run: () => void;
}

export interface CommandMenuData {
  projects: { title: string; href: string }[];
  email: string;
  github: string;
  linkedin: string;
  resume: string;
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function buildCommands(data: CommandMenuData, go: (href: string) => void): Command[] {
  return [
    ...sections.map((s) => ({ id: `section-${s.id}`, label: s.label, group: "Jump to" as const, icon: Hash, run: () => go(`/#${s.id}`) })),
    ...data.projects.map((p) => ({ id: `project-${p.href}`, label: p.title, group: "Projects" as const, icon: Folder, run: () => go(p.href) })),
    { id: "resume", label: "Download résumé", group: "Links", icon: Download, run: () => openExternal(data.resume) },
    { id: "github", label: "GitHub", group: "Links", icon: GitHub, run: () => openExternal(data.github) },
    { id: "linkedin", label: "LinkedIn", group: "Links", icon: LinkedIn, run: () => openExternal(data.linkedin) },
    { id: "email", label: "Send an email", group: "Links", icon: Mail, run: () => (window.location.href = `mailto:${data.email}`) },
    { id: "copy-email", label: "Copy email address", group: "Actions", icon: Copy, run: () => void navigator.clipboard?.writeText(data.email) },
    { id: "theme", label: "Toggle dark mode", group: "Actions", icon: Moon, run: toggleTheme },
  ];
}

export function CommandMenu({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CommandMenuData;
}) {
  const router = useRouter();
  const commands = useMemo(() => buildCommands(data, (href) => router.push(href)), [data, router]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => `${c.label} ${c.group}`.toLowerCase().includes(q)) : commands;
  }, [query, commands]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery("");
      setActive(0);
      dialog.showModal();
      // Avoid popping the on-screen keyboard on touch devices.
      if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!dialogRef.current?.open);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange]);

  function run(command: Command | undefined) {
    if (!command) return;
    onOpenChange(false);
    command.run();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Quick navigation"
      onClose={() => onOpenChange(false)}
      onClick={(event) => event.target === dialogRef.current && onOpenChange(false)}
      className="m-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-3xl border border-border bg-surface p-0 text-fg shadow-2xl"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search className="size-4 shrink-0 text-muted" />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((i) => Math.min(i + 1, results.length - 1));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((i) => Math.max(i - 1, 0));
            } else if (event.key === "Enter") {
              event.preventDefault();
              run(results[active]);
            }
          }}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
          aria-autocomplete="list"
          placeholder="Search sections, projects, links…"
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
        />
        <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted sm:block">Esc</kbd>
      </div>
      <ul id={listId} role="listbox" aria-label="Results" className="max-h-[min(60vh,26rem)] overflow-y-auto p-2">
        {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">No results for “{query}”</li>}
        {results.map((command, index) => {
          const showGroup = command.group !== results[index - 1]?.group;
          const Icon = command.icon;
          return (
            <li key={command.id} role="presentation">
              {showGroup && <div className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-wider text-muted">{command.group}</div>}
              <div
                id={`${listId}-${command.id}`}
                role="option"
                aria-selected={index === active}
                onMouseMove={() => setActive(index)}
                onClick={() => run(command)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                  index === active ? "bg-accent/12 text-fg" : "text-muted",
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="flex-1 truncate">{command.label}</span>
                {command.group === "Links" && <ArrowUpRight className="size-3.5 opacity-60" />}
              </div>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
}
