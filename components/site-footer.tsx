import type { Profile } from "@/lib/content";

export function SiteFooter({ profile }: { profile: Profile }) {
  return (
    <footer className="frame pb-10">
      <div className="grid-12 label gap-y-4 border-t border-rule pt-6 text-muted">
        <p className="col-span-4 md:col-span-4">
          © {new Date().getFullYear()} {profile.fullName}
        </p>
        <p className="col-span-4 md:col-span-4">
          <a href={`mailto:${profile.email}`} className="link normal-case tracking-normal">
            {profile.email}
          </a>
        </p>
        <ul className="col-span-4 flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
          {profile.socials.map((s) => (
            <li key={s.url}>
              <a href={s.url} rel="me noopener" target="_blank" className="hover:text-fg">
                {s.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resume.file} className="hover:text-fg">
              Résumé<span className="sr-only"> (PDF, {profile.resume.sizeKB} KB)</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
