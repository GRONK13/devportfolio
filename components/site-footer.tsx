import Link from "next/link";
import type { Profile } from "@/lib/content";
import { getLastUpdated } from "@/lib/content";
import { ArrowUp, ArrowUpRight, Lock } from "./icons";

const REPO_URL = "https://github.com/GRONK13/devportfolio";

// Each line here describes protection that is actually configured; keep it in sync with SECURITY.md.
const protections = [
  "Strict Content-Security-Policy with a fresh nonce per request",
  "HSTS, no framing, no MIME sniffing, locked-down permissions",
  "Contact form validated, rate-limited and sent as plain text",
  "No admin login: content changes go through Git and CI",
];

export function SiteFooter({ profile }: { profile: Profile }) {
  const updated = getLastUpdated();
  return (
    <footer className="mt-10 border-t border-border">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1fr_1fr_1.4fr]">
        <div>
          <p className="font-display text-xl font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.role}</p>
          {updated && (
            <p className="mt-4 text-xs text-muted">
              Content updated <time dateTime={updated}>{new Date(`${updated}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</time>
            </p>
          )}
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-2 text-sm">
            <li><Link href="/#work" className="text-muted hover:text-fg">Work</Link></li>
            <li><a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">GitHub</a></li>
            <li><Link href="/#experience" className="text-muted hover:text-fg">Experience</Link></li>
            <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">LinkedIn</a></li>
            <li><Link href="/#about" className="text-muted hover:text-fg">About</Link></li>
            <li><a href={profile.resume} target="_blank" rel="noopener" className="text-muted hover:text-fg">Résumé</a></li>
            <li><Link href="/contact" className="text-muted hover:text-fg">Contact</Link></li>
            <li><a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">Source code</a></li>
          </ul>
        </nav>
        <div className="tile p-5" data-spotlight="">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Lock className="size-4 text-accent" /> How this site is secured
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted">
            {protections.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
          <a href={`${REPO_URL}/blob/main/SECURITY.md`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            Read SECURITY.md <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
      <div className="container-page flex items-center justify-between border-t border-border py-6 text-xs text-muted">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <a href="#top" className="inline-flex items-center gap-1 hover:text-fg">
          Back to top <ArrowUp className="size-3.5" />
        </a>
      </div>
    </footer>
  );
}
