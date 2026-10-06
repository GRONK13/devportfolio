import Link from "next/link";
import { Github, Linkedin, Mail, Code } from "lucide-react";
import { personalInfo as defaultPersonalInfo, PersonalInfo } from "@/data/personal-info";

export interface FooterProps {
  personalInfo?: PersonalInfo;
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Certificates", href: "/certificates" },
  { name: "Contact", href: "/contact" },
];

export function Footer({ personalInfo = defaultPersonalInfo }: FooterProps = {}) {
  const currentYear = new Date().getFullYear();
  const cityName = personalInfo.location?.city || "Taguig City";
  const githubHref = personalInfo.social?.github || (personalInfo.github ? `https://github.com/${personalInfo.github}` : "https://github.com");
  const linkedinHref = personalInfo.social?.linkedin || "https://linkedin.com";
  const emailHref = personalInfo.email
    ? `mailto:${personalInfo.email}`
    : (personalInfo.social?.email || "mailto:gregg.marayan@gmail.com");

  return (
    <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        {/* Top Tier */}
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          {/* Developer identity and availability badge */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="group flex items-center space-x-2 text-foreground transition-colors hover:text-primary"
              >
                <Code className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                <span className="text-xl font-bold tracking-tight">
                  {personalInfo.name}
                </span>
              </Link>

              {/* Live Taguig availability status badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Available for work • {cityName}</span>
              </div>
            </div>

            <p className="max-w-md text-sm text-muted-foreground">
              {personalInfo.subtitle || `${personalInfo.title} — ${personalInfo.descriptions.short}`}
            </p>
          </div>

          {/* Quick navigation links & Accessible social icons */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium" aria-label="Footer navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${personalInfo.name} on GitHub`}
                className="rounded-lg border border-border/40 bg-background/50 p-2 text-muted-foreground transition-colors hover:border-border hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${personalInfo.name} on LinkedIn`}
                className="rounded-lg border border-border/40 bg-background/50 p-2 text-muted-foreground transition-colors hover:border-border hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={emailHref}
                aria-label={`Send email to ${personalInfo.name}`}
                className="rounded-lg border border-border/40 bg-background/50 p-2 text-muted-foreground transition-colors hover:border-border hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/40 py-6 text-xs text-muted-foreground sm:flex-row">
          <p suppressHydrationWarning>
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-muted-foreground/80">
            <span>Built with</span>
            <span className="font-medium text-foreground">Next.js</span>
            <span>&</span>
            <span className="font-medium text-foreground">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
