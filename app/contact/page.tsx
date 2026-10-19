import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { CopyEmailButton } from "@/components/copy-email";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send Gregg a message about a role, a project or anything else.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const profile = getProfile();
  return (
    <div className="container-page grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 text-5xl font-semibold leading-[1.02] sm:text-6xl">
          Let&apos;s <em className="accent">talk</em>
        </h1>
        <p className="mt-5 text-lg text-muted">Hiring, collaborating or just curious? Send a message, or email me directly.</p>
        <div className="mt-6">
          <CopyEmailButton email={profile.email} />
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
