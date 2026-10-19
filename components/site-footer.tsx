import { profile } from "@/content/profile";
import { ArrowUp } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, deployed on Vercel.
        </p>
        <div className="flex items-center gap-5">
          <a href="https://github.com/GRONK13/devportfolio" target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            Source
          </a>
          <a href="#top" className="inline-flex items-center gap-1 hover:text-fg">
            Back to top <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
