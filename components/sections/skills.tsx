import { getSkills } from "@/lib/content";
import { SectionHeading } from "../ui/section-heading";
import { Tile } from "../ui/tile";

export function Skills() {
  const groups = getSkills();
  return (
    <section aria-labelledby="skills-title" id="skills" className="container-page py-20 sm:py-28">
      <SectionHeading id="skills-title" eyebrow="Skills" title="Tools I *reach for*" />
      <div className="grid gap-5 md:grid-cols-3">
        {groups.map((group, i) => (
          <Tile key={group.name} className="reveal p-6 sm:p-7">
            <p className="font-mono text-xs text-muted">0{i + 1}</p>
            <h3 className="mt-2 text-2xl font-semibold">{group.name}</h3>
            {group.note && <p className="mt-1 text-sm text-muted">{group.note}</p>}
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li key={skill} className="chip">
                  {skill}
                </li>
              ))}
            </ul>
          </Tile>
        ))}
      </div>
    </section>
  );
}
