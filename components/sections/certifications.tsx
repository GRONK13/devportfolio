import { Section } from "@/components/section";
import type { Certification } from "content-collections";
import { formatDate } from "@/lib/format";

type Cert = Certification["items"][number];

export function Certifications({ items }: { items: Cert[] }) {
  if (items.length === 0) return null;
  return (
    <Section id="certifications" index={6} title="Certifications">
      <ul className="border-t border-rule">
        {items.map((cert) => (
          <li key={cert.verifyUrl} className="grid-12 reveal gap-y-2 border-b border-rule py-6">
            <p className="label col-span-4 pt-1.5 text-muted md:col-span-3">
              {cert.issuer} · <time dateTime={cert.issued}>{formatDate(cert.issued)}</time>
            </p>
            <div className="col-span-4 md:col-span-6">
              <h3 className="text-xl font-semibold tracking-tight">{cert.name}</h3>
              <p className="mt-1 text-muted">{cert.summary}</p>
              {cert.skills.length > 0 && <p className="label mt-3 text-muted">{cert.skills.join(" · ")}</p>}
            </div>
            <p className="col-span-4 md:col-span-3 md:text-right">
              <a href={cert.verifyUrl} target="_blank" rel="noopener" className="label link hover:text-accent">
                Verify credential<span aria-hidden="true"> ↗</span>
                <span className="sr-only">: {cert.name} (opens in a new tab)</span>
              </a>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
