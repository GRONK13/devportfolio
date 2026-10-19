import { profile } from "@/content/profile";
import { ContactForm } from "../contact-form";
import { CopyEmailButton } from "../copy-email";
import { ArrowUpRight, GitHub, LinkedIn } from "../icons";
import { Section } from "../section";

export function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact"
      title="Let's work together"
      intro="Hiring, collaborating, or just want to say hi? Send a message or reach me directly."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="reveal space-y-6">
          <div>
            <p className="text-sm text-muted">Email me directly</p>
            <CopyEmailButton email={profile.email} className="mt-2" />
          </div>
          <ul className="space-y-2">
            <li>
              <a href={profile.linkedin.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 hover:text-accent">
                <LinkedIn className="size-4" /> Connect on LinkedIn
                <ArrowUpRight className="size-3.5 opacity-50 group-hover:opacity-100" />
              </a>
            </li>
            <li>
              <a href={profile.github.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 hover:text-accent">
                <GitHub className="size-4" /> Follow on GitHub
                <ArrowUpRight className="size-3.5 opacity-50 group-hover:opacity-100" />
              </a>
            </li>
          </ul>
          <p className="text-sm text-muted">{profile.location}</p>
        </div>
        <div className="reveal">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
