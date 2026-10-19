import { skillGroups } from "@/content/skills";
import { Section } from "../section";

export function Skills() {
  return (
    <Section id="skills" index="03" eyebrow="Skills" title="Tools I reach for">
      <dl className="reveal card divide-y divide-border">
        {skillGroups.map((group) => (
          <div key={group.name} className="grid gap-3 p-5 sm:grid-cols-[12rem_1fr] sm:items-center sm:gap-6 sm:p-6">
            <dt className="font-mono text-sm text-muted">{group.name}</dt>
            <dd className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
