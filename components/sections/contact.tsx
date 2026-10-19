import { Availability } from "@/components/availability";
import { Section } from "@/components/section";
import type { Profile } from "@/lib/content";

/** The email address is always visible as text, so contact never depends on JavaScript or a form. */
export function Contact({ profile }: { profile: Profile }) {
  return (
    <Section id="contact" index={7} title="Contact" aside={<Availability availability={profile.availability} />}>
      <p className="max-w-2xl text-xl text-muted md:text-2xl">
        Hiring, collaborating or just want to talk shop? Email is the fastest way to reach me.
      </p>
      <a
        href={`mailto:${profile.email}`}
        className="display mt-8 inline-block text-[clamp(1.6rem,6.4vw,6rem)] break-all decoration-accent decoration-2 underline-offset-[0.15em] hover:text-accent hover:underline sm:break-normal"
      >
        {profile.email}
      </a>
      <ul className="label mt-12 flex flex-wrap gap-x-8 gap-y-3">
        {profile.socials.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="me noopener" className="link hover:text-accent">
              {s.label}
              <span aria-hidden="true"> ↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
        <li>
          <a href={profile.resume.file} className="link hover:text-accent">
            Résumé (PDF, {profile.resume.sizeKB} KB)
          </a>
        </li>
      </ul>
    </Section>
  );
}
