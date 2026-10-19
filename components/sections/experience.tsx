import type { ExperienceItem } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../ui/section-heading";

const VISIBLE = 3;

export function Experience({ items }: { items: ExperienceItem[] }) {
  const visible = items.slice(0, VISIBLE);
  const earlier = items.slice(VISIBLE);
  return (
    <section aria-labelledby="experience-title" id="experience" className="container-page py-20 sm:py-28">
      <SectionHeading id="experience-title" eyebrow="Experience" title="Where I've *worked* and studied" />
      <ol className="reveal relative space-y-3">
        {visible.map((item) => (
          <TimelineEntry key={`${item.org}-${item.start}`} item={item} />
        ))}
      </ol>
      {earlier.length > 0 && (
        <details className="group mt-3">
          <summary className="cursor-pointer list-none rounded-xl px-5 py-3 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Show {earlier.length} earlier {earlier.length === 1 ? "entry" : "entries"}</span>
            <span className="hidden group-open:inline">Hide earlier entries</span>
          </summary>
          <ol className="mt-3 space-y-3">
            {earlier.map((item) => (
              <TimelineEntry key={`${item.org}-${item.start}`} item={item} />
            ))}
          </ol>
        </details>
      )}
    </section>
  );
}

function TimelineEntry({ item }: { item: ExperienceItem }) {
  return (
    <li className="tile grid gap-x-8 gap-y-2 p-5 sm:grid-cols-[11rem_1fr] sm:p-6">
      <div className="flex items-center gap-2 sm:flex-col sm:items-start">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider",
            item.kind === "work" ? "bg-accent/15 text-accent" : "bg-accent-2/15 text-accent-2",
          )}
        >
          {item.kind === "work" ? "Work" : "Education"}
        </span>
        <p className="font-mono text-xs text-muted">{item.period}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
        <p className="text-muted">{item.org}</p>
        <p className="mt-2 leading-relaxed">{item.summary}</p>
        {item.highlights && (
          <ul className="mt-3 space-y-1.5 text-sm text-muted">
            {item.highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
