import { education, work, type TimelineItem } from "@/content/experience";
import { Section } from "../section";

export function Experience() {
  return (
    <Section id="experience" index="02" eyebrow="Experience" title="Where I've worked and studied">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Timeline label="Work" items={work} />
        <Timeline label="Education" items={education} />
      </div>
    </Section>
  );
}

function Timeline({ label, items }: { label: string; items: TimelineItem[] }) {
  return (
    <div className="reveal">
      <h3 className="mb-6 font-mono text-sm uppercase tracking-wider text-muted">{label}</h3>
      <ol className="relative space-y-8 border-l border-border pl-6">
        {items.map((item) => (
          <li key={`${item.org}-${item.title}`} className="relative">
            <span aria-hidden="true" className="absolute -left-[29px] top-1.5 size-2.5 rounded-full border-2 border-bg bg-accent ring-1 ring-accent/40" />
            <p className="font-mono text-xs text-muted">{item.period}</p>
            <h4 className="mt-1 text-lg font-semibold leading-snug">{item.title}</h4>
            <p className="text-muted">{item.org}</p>
            <p className="mt-2 leading-relaxed">{item.summary}</p>
            {item.highlights && (
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {item.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-muted" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
