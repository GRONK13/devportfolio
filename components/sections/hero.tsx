import { certificates } from "@/content/certificates";
import { education, work } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { ArrowRight, Download, GitHub, LinkedIn, Mail, MapPin } from "../icons";

export function Hero() {
  const latestRole = work[0];
  const degree = education[0];

  const stats = [
    { value: projects.length, label: "Projects shipped" },
    { value: certificates.length, label: "Cisco certifications" },
    { value: work.length, label: "Dev internship" },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10" />

      <div className="container-page grid gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16 lg:pb-12 lg:pt-24">
        <div className="fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-sm text-muted backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {profile.availability}
          </p>

          <h1 id="hero-title" className="mt-6 text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
            {profile.name}
            <span className="mt-2 block text-muted">{profile.role}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-medium text-accent-fg shadow-sm transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
            >
              View my work
              <ArrowRight className="size-4" />
            </a>
            <a
              href={profile.resume.href}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 font-medium transition-colors hover:border-fg/30"
            >
              <Download className="size-4" />
              {profile.resume.label}
            </a>
            <div className="flex items-center gap-1 sm:ml-2">
              <SocialLink href={profile.github.url} label="GitHub">
                <GitHub className="size-5" />
              </SocialLink>
              <SocialLink href={profile.linkedin.url} label="LinkedIn">
                <LinkedIn className="size-5" />
              </SocialLink>
              <SocialLink href={`mailto:${profile.email}`} label="Email">
                <Mail className="size-5" />
              </SocialLink>
            </div>
          </div>
        </div>

        <aside aria-label="At a glance" className="fade-up card p-6 shadow-sm [animation-delay:120ms] sm:p-7">
          <p className="eyebrow">At a glance</p>
          <dl className="mt-5 space-y-4 text-sm">
            <GlanceRow label="Based in">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-muted" />
                {profile.location}
              </span>
            </GlanceRow>
            {latestRole && (
              <GlanceRow label="Latest role">
                {latestRole.title}, {latestRole.org}
              </GlanceRow>
            )}
            {degree && (
              <GlanceRow label="Education">
                {degree.title}, {degree.org}
              </GlanceRow>
            )}
            <GlanceRow label="Focus">
              <span className="flex flex-wrap gap-1.5">
                {profile.focusAreas.map((area) => (
                  <span key={area} className="chip text-xs">
                    {area}
                  </span>
                ))}
              </span>
            </GlanceRow>
          </dl>
          <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs leading-snug text-muted">{stat.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}

function GlanceRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      {children}
    </a>
  );
}
