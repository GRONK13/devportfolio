import Link from "next/link";
import { Section } from "@/components/section";
import type { Project } from "@/lib/content";

type Group = { name: string; note?: string; items: string[] };

/**
 * Skills with evidence instead of bars: each skill lists the projects whose stack uses it.
 * `projectsUsing` comes from the page so this stays a plain server component.
 */
export function Skills({ groups, projectsUsing }: { groups: Group[]; projectsUsing: (skill: string) => Project[] }) {
  return (
    <Section id="skills" index={5} title="Skills">
      <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.name}>
            <h3 className="text-xl font-semibold tracking-tight">{group.name}</h3>
            {group.note && <p className="label mt-1 text-muted">{group.note}</p>}
            <ul className="mt-5 border-t border-rule">
              {group.items.map((skill) => {
                const projects = projectsUsing(skill);
                return (
                  <li key={skill} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule py-2.5">
                    <span className="shrink-0">{skill}</span>
                    {projects.length > 0 && (
                      <span className="label ml-auto text-right text-muted">
                        <span className="sr-only">Used in </span>
                        {projects.map((p, i) => (
                          <span key={p.slug}>
                            {i > 0 && ", "}
                            <Link href={`/work/${p.slug}`} className="link hover:text-fg">
                              {p.title}
                            </Link>
                          </span>
                        ))}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
