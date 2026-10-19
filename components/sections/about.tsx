import { profile } from "@/content/profile";
import { Section } from "../section";

export function About() {
  return (
    <Section id="about" index="05" eyebrow="About" title="A bit about me">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="reveal space-y-5 text-lg leading-relaxed text-muted">
          {profile.story.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        <ul className="reveal grid gap-3 self-start sm:grid-cols-2 lg:grid-cols-1">
          {profile.values.map((value) => (
            <li key={value.title} className="card p-5">
              <h3 className="font-semibold">{value.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{value.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
