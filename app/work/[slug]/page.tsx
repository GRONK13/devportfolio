import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitHub } from "@/components/icons";
import { ProjectArt } from "@/components/sections/project-art";
import { ButtonLink } from "@/components/ui/button";
import { getProject, getProjects } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: project.href },
    openGraph: { title: project.title, description: project.summary, url: project.href },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const projects = getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const facts = [
    { label: "Role", value: project.role },
    { label: "Team", value: project.team },
    { label: "Year", value: project.year },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  return (
    <article style={{ "--tint": project.color } as CSSProperties}>
      <header className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[36rem]"
          style={{ background: `radial-gradient(40rem 22rem at 15% 0%, color-mix(in oklch, ${project.color} 26%, transparent), transparent 70%)` }}
        />
        <div className="container-page pb-10 pt-8 sm:pt-12">
          <Link href="/#work" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
            <ArrowLeft className="size-4" /> All work
          </Link>
          <p className="eyebrow mt-10 flex items-center gap-2">
            <span aria-hidden="true" className="size-2 rounded-full" style={{ background: project.color }} />
            Case study
          </p>
          <h1 className="rise mt-3 max-w-4xl text-5xl font-semibold leading-[1] sm:text-7xl">{project.title}</h1>
          <p className="rise mt-5 max-w-2xl text-xl leading-relaxed text-muted [--i:1]">{project.summary}</p>
          <div className="rise mt-8 flex flex-wrap gap-3 [--i:2]">
            {project.links.live && (
              <ButtonLink href={project.links.live} external>
                Visit live site <ArrowUpRight className="size-4" />
              </ButtonLink>
            )}
            {project.links.repo && (
              <ButtonLink href={project.links.repo} external variant="secondary">
                <GitHub className="size-4" /> Source code
              </ButtonLink>
            )}
          </div>
        </div>
      </header>

      <div className="container-page">
        <div className="browser-frame rise [--i:3]">
          <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            {project.links.live && <span className="ml-3 truncate font-mono text-xs text-muted">{new URL(project.links.live).host}</span>}
          </div>
          <div className="relative aspect-[16/9]">
            {project.cover ? (
              <Image src={project.cover.src} alt={project.cover.alt} fill priority sizes="(min-width: 1216px) 1152px, 100vw" className="object-cover object-top" />
            ) : (
              <ProjectArt project={project} large />
            )}
          </div>
        </div>
      </div>

      <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_18rem] lg:gap-20">
        {/* bodyHtml is rendered from the project's Markdown with raw HTML disabled (lib/content/markdown.ts). */}
        <div className="prose-content max-w-2xl [&>h2:first-child]:mt-0" dangerouslySetInnerHTML={{ __html: project.bodyHtml }} />
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="tile space-y-6 p-6">
            {facts.length > 0 && (
              <dl className="space-y-4">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="eyebrow">{fact.label}</dt>
                    <dd className="mt-1 font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <div>
              <p className="eyebrow">Stack</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li key={tech} className="chip text-xs">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {next && next.slug !== project.slug && (
        <div className="container-page pb-8">
          <Link href={next.href} className="tile group flex items-center justify-between gap-6 p-6 sm:p-8" data-spotlight="" style={{ "--tint": next.color } as CSSProperties}>
            <span>
              <span className="eyebrow">Next project</span>
              <span className="mt-2 block font-display text-3xl font-semibold tracking-tight sm:text-4xl">{next.title}</span>
              <span className="mt-1 block text-muted">{next.summary}</span>
            </span>
            <ArrowRight className="size-7 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-fg" />
          </Link>
        </div>
      )}
    </article>
  );
}
