import type { CSSProperties } from "react";
import type { Project } from "@/lib/content";

/** Generated cover for projects without a screenshot: the title on a field of the project's color. */
export function ProjectArt({ project, large }: { project: Project; large?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 grid place-items-center overflow-hidden"
      style={
        {
          "--c": project.color,
          background:
            "radial-gradient(70% 90% at 20% 10%, color-mix(in oklch, var(--c) 55%, transparent), transparent 70%), radial-gradient(60% 80% at 90% 100%, color-mix(in oklch, var(--c) 35%, transparent), transparent 70%), var(--surface-2)",
        } as CSSProperties
      }
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
      />
      <div className="relative px-6 text-center">
        <p className={large ? "font-display text-5xl font-semibold tracking-tight sm:text-7xl" : "font-display text-4xl font-semibold tracking-tight"}>
          {project.title}
        </p>
        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">{project.stack.slice(0, 3).join(" · ")}</p>
      </div>
    </div>
  );
}
