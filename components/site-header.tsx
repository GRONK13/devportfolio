import Link from "next/link";
import type { Profile } from "@/lib/content";

/** Persistent header. Four short links fit at phone width, so there's no menu to open. */
export function SiteHeader({ profile }: { profile: Profile }) {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg/90 backdrop-blur-sm supports-[backdrop-filter]:bg-bg/75">
      <div className="frame flex h-14 items-center justify-between gap-4">
        <Link href="/" className="label font-medium tracking-[0.08em]">
          <span className="sm:hidden" aria-hidden="true">
            {initials(profile.name)}
          </span>
          <span className="max-sm:sr-only">{profile.name}</span>
        </Link>
        <nav aria-label="Main">
          <ul className="label flex items-center gap-4 sm:gap-7">
            <li>
              <Link href="/#work" className="hover:text-accent">
                Work
              </Link>
            </li>
            <li>
              <Link href="/#about" className="hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <a href={profile.resume.file} className="hover:text-accent">
                Résumé<span className="sr-only"> (PDF, {profile.resume.sizeKB} KB)</span>
              </a>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("");
