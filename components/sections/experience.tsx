import { Section } from "@/components/section";
import type { Timeline } from "content-collections";
import { formatYearMonth } from "@/lib/format";

type Entry = Timeline["entries"][number];

export function Experience({ entries }: { entries: Entry[] }) {
  const work = entries.filter((e) => e.kind === "work");
  const education = entries.filter((e) => e.kind === "education");
  return (
    <Section id="experience" index={4} title="Experience & education">
      <div className="space-y-16">
        {work.length > 0 && <Group title="Work" entries={work} />}
        {education.length > 0 && <Group title="Education" entries={education} />}
      </div>
    </Section>
  );
}

function Group({ title, entries }: { title: string; entries: Entry[] }) {
  return (
    <div>
      <h3 className="label text-muted">{title}</h3>
      <ol className="mt-4 border-t border-rule">
        {entries.map((e) => (
          <li key={`${e.org}-${e.start}`} className="grid-12 reveal gap-y-2 border-b border-rule py-6">
            <p className="label col-span-4 pt-1.5 text-muted md:col-span-3">
              <time dateTime={e.start}>{formatYearMonth(e.start)}</time>
              {" – "}
              {e.end === "present" ? "Present" : <time dateTime={e.end}>{formatYearMonth(e.end)}</time>}
            </p>
            <div className="col-span-4 md:col-span-5">
              <h4 className="text-xl font-semibold tracking-tight">{e.title}</h4>
              <p className="text-muted">
                {e.org}
                {e.location && ` · ${e.location}`}
              </p>
            </div>
            <div className="col-span-4 md:col-span-4">
              <p>{e.summary}</p>
              {e.highlights.length > 0 && (
                <ul className="mt-3 space-y-1 text-muted">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span aria-hidden="true" className="text-accent">
                        —
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
