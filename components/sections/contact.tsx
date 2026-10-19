import type { Profile } from "@/lib/content";
import { ContactDialog } from "../contact-dialog";
import { CopyEmailButton } from "../copy-email";
import { Download, LinkedIn } from "../icons";
import { ButtonLink } from "../ui/button";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section aria-labelledby="contact-title" id="contact" className="container-page py-20 sm:py-28">
      <div className="reveal tile glow px-6 py-14 text-center sm:px-12 sm:py-20">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title" className="mx-auto mt-4 max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-7xl">
          Let&apos;s build <em className="accent">something</em> together
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          Hiring, collaborating or just curious? I&apos;d love to hear from you.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ContactDialog />
          <ButtonLink href={profile.linkedin} external variant="secondary">
            <LinkedIn className="size-4" /> LinkedIn
          </ButtonLink>
          <ButtonLink href={profile.resume} variant="secondary" target="_blank" rel="noopener">
            <Download className="size-4" /> Résumé
          </ButtonLink>
        </div>
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-sm text-muted">or email me directly</p>
          <CopyEmailButton email={profile.email} />
        </div>
      </div>
    </section>
  );
}
