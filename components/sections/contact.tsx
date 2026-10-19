import { Availability } from "@/components/availability";
import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/section";
import type { Profile } from "@/lib/content";

/** The email address is always visible as text, so contact never depends on JavaScript or the form. */
export function Contact({ profile }: { profile: Profile }) {
  return (
    <Section id="contact" index={7} title="Contact" aside={<Availability availability={profile.availability} />}>
      <p className="max-w-2xl text-xl text-muted md:text-2xl">
        Hiring, collaborating or just want to talk shop? Send a message or email me directly.
      </p>
      <a
        href={`mailto:${profile.email}`}
        className="display mt-8 inline-block text-[clamp(1.6rem,6.4vw,6rem)] break-all decoration-accent decoration-2 underline-offset-[0.15em] hover:text-accent hover:underline sm:break-normal"
      >
        {profile.email}
      </a>

      <div className="grid-12 mt-16 gap-y-12 md:mt-24">
        <div className="col-span-4 md:col-span-8">
          <h3 className="label mb-8 text-muted">Send a message</h3>
          <ContactForm />
        </div>
        <div className="col-span-4 md:col-span-3 md:col-start-10">
          <h3 className="label text-muted">Elsewhere</h3>
          <ul className="mt-8 space-y-3 border-t border-rule pt-4">
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
                Résumé <span className="text-muted">(PDF, {profile.resume.sizeKB} KB)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
