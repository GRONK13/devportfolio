import { certificates } from "@/content/certificates";
import { ArrowUpRight, ShieldCheck } from "../icons";
import { Section } from "../section";

export function Certifications() {
  return (
    <Section id="certifications" index="04" eyebrow="Certifications" title="Verified credentials">
      <ul className="grid gap-6 md:grid-cols-2">
        {certificates.map((cert) => (
          <li key={cert.title} className="reveal">
            <article className="card flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                  <ShieldCheck className="size-6" />
                </span>
                <p className="font-mono text-xs text-muted">{cert.issued}</p>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{cert.title}</h3>
              <p className="text-sm text-muted">{cert.issuer}</p>
              <p className="mt-3 leading-relaxed">{cert.summary}</p>
              <ul aria-label="Skills covered" className="mt-4 flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <li key={skill} className="chip text-xs">
                    {skill}
                  </li>
                ))}
              </ul>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-accent hover:underline hover:underline-offset-4"
              >
                Verify on Credly
                <ArrowUpRight className="size-4" />
                <span className="sr-only">: {cert.title} (opens in a new tab)</span>
              </a>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
