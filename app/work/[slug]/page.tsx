import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCover } from "@/components/project-cover";
import { getProject, getProjects } from "@/lib/content";
import { pad } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

// Only the projects in content/projects exist; anything else is a static 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { type: "article", title: project.title, description: project.summary, url: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const projects = getProjects();
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const facts = [
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Team", value: project.team },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  return (
    <article className="pb-20">
      <header className="frame pt-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="label text-muted">
          <ol className="flex gap-2">
            <li>
              <Link href="/#work" className="link hover:text-fg">
                Work
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-fg">
              {pad(index + 1)}
            </li>
          </ol>
        </nav>
        <h1 className="display mt-10 text-[clamp(3rem,11vw,10rem)] md:mt-14">{project.title}</h1>
        <p className="mt-8 max-w-3xl text-[clamp(1.25rem,2.4vw,1.9rem)] leading-snug font-medium tracking-tight">{project.summary}</p>

        <dl className="grid-12 mt-12 gap-y-6 border-t border-rule pt-6">
          {facts.map((f) => (
            <div key={f.label} className="col-span-2">
              <dt className="label text-muted">{f.label}</dt>
              <dd className="mt-1">{f.value}</dd>
            </div>
          ))}
          <div className="col-span-4 md:col-span-6">
            <dt className="label text-muted">Stack</dt>
            <dd className="mt-1">{project.stack.join(", ")}</dd>
          </div>
          {(project.links.live || project.links.repo || project.links.video) && (
            <div className="col-span-4 md:col-span-3">
              <dt className="label text-muted">Links</dt>
              <dd className="mt-1">
                <ul className="flex flex-wrap gap-x-5 gap-y-1">
                  {[
                    { href: project.links.live, label: "Live site" },
                    { href: project.links.repo, label: "Source code" },
                    { href: project.links.video, label: "Video" },
                  ]
                    .filter((l): l is { href: string; label: string } => Boolean(l.href))
                    .map((l) => (
                      <li key={l.label}>
                        <a href={l.href} target="_blank" rel="noopener" className="link hover:text-accent">
                          {l.label}
                          <span aria-hidden="true"> ↗</span>
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </header>

      <div className="frame mt-12 md:mt-16">
        <ProjectCover project={project} sizes="(min-width: 1440px) 1344px, 100vw" priority />
      </div>

      {project.metrics.length > 0 && (
        <dl className="frame grid-12 mt-16 gap-y-8">
          {project.metrics.map((m) => (
            <div key={m.label} className="col-span-2 flex flex-col-reverse md:col-span-3">
              <dt className="label mt-3 text-muted">{m.label}</dt>
              <dd className="display text-5xl">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="frame grid-12 mt-16 md:mt-24">
        <div
          className="prose col-span-4 text-lg md:col-span-8 md:col-start-3"
          // Compiled from content/projects/*.md at build time with raw HTML disabled.
          dangerouslySetInnerHTML={{ __html: project.html }}
        />
      </div>

      {next && next.slug !== project.slug && (
        <nav aria-label="Next project" className="frame mt-24 md:mt-32">
          <Link href={`/work/${next.slug}`} className="group block border-t border-rule pt-6">
            <span className="label text-muted">Next project</span>
            <span className="display mt-4 block text-[clamp(2.5rem,8vw,7rem)] group-hover:text-accent">
              {next.title}
              <span aria-hidden="true"> →</span>
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}
