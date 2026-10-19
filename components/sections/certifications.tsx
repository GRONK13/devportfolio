import { getCertifications } from "@/lib/content";
import { ArrowUpRight, ShieldCheck } from "../icons";
import { SectionHeading } from "../ui/section-heading";
import { Tile } from "../ui/tile";

export function Certifications() {
  const certifications = getCertifications();
  return (
    <section aria-labelledby="certifications-title" id="certifications" className="container-page py-20 sm:py-28">
      <SectionHeading id="certifications-title" eyebrow="Certifications" title="Verified *credentials*" />
      <ul className="grid gap-5 md:grid-cols-2">
        {certifications.map((cert) => (
          <li key={cert.verifyUrl} className="reveal">
            <Tile className="group h-full">
              <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="flex h-full gap-5 p-6">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent/12 text-accent">
                  <ShieldCheck className="size-7" />
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="flex items-start justify-between gap-3">
                    <span>
                      <span className="block text-lg font-semibold">{cert.title}</span>
                      <span className="block text-sm text-muted">
                        {cert.issuer} · <time dateTime={cert.issued}>{formatMonth(cert.issued)}</time>
                      </span>
                    </span>
                    <ArrowUpRight className="size-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                  </span>
                  <span className="mt-3 block leading-relaxed text-muted">{cert.summary}</span>
                  <span className="mt-auto pt-4 text-sm font-medium text-accent">
                    Verify on Credly<span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </span>
              </a>
            </Tile>
          </li>
        ))}
      </ul>
    </section>
  );
}

function formatMonth(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}
