import Image from "next/image";
import Link from "next/link";
import { Suspense, type CSSProperties } from "react";
import type { Profile, Project } from "@/lib/content";
import { getNow, getSkills } from "@/lib/content";
import { getGitHubSummary } from "@/lib/github";
import { ArrowRight, ArrowUpRight, Download, GitHub, LinkedIn, Mail, MapPin, Star } from "../icons";
import { LocalTime } from "../local-time";
import { Avatar } from "../ui/avatar";
import { ButtonLink } from "../ui/button";
import { RichText } from "../ui/rich-text";
import { Tile } from "../ui/tile";
import { ProjectArt } from "./project-art";

const rise = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero({ profile, featured }: { profile: Profile; featured?: Project }) {
  const now = getNow();
  const stack = getSkills().flatMap((g) => g.items);
  const githubUser = profile.github.split("/").filter(Boolean).at(-1) ?? "";

  return (
    <section aria-labelledby="hero-title" className="relative">
      <div aria-hidden="true" className="glow pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[42rem]" />
      <div className="container-page grid gap-4 pb-16 pt-6 sm:pt-10 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {/* Intro */}
        <Tile className="rise flex flex-col p-6 sm:p-9 md:col-span-2 lg:col-span-4 lg:row-span-2" style={rise(0)}>
          <div className="flex items-center gap-4">
            <Avatar profile={profile} priority className="size-16 shrink-0 sm:size-20" />
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1 text-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                {profile.availability}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="size-4 shrink-0" />
                {profile.location}
              </p>
            </div>
          </div>

          <h1 id="hero-title" className="mt-8 text-[2.75rem] font-semibold leading-[0.98] sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-3 font-display text-2xl font-medium tracking-tight text-muted sm:text-3xl">{profile.role}</p>
          <p className="mt-6 max-w-2xl font-display text-xl leading-snug tracking-tight sm:text-2xl">
            <RichText text={profile.headline} />
          </p>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{profile.intro}</p>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
            <ButtonLink href="/#work">
              See my work <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href={profile.resume} variant="secondary" target="_blank" rel="noopener">
              <Download className="size-4" /> Résumé
            </ButtonLink>
            <div className="flex items-center">
              <ButtonLink href={profile.github} external variant="ghost" size="icon" aria-label="GitHub">
                <GitHub className="size-5" />
              </ButtonLink>
              <ButtonLink href={profile.linkedin} external variant="ghost" size="icon" aria-label="LinkedIn">
                <LinkedIn className="size-5" />
              </ButtonLink>
              <ButtonLink href={`mailto:${profile.email}`} variant="ghost" size="icon" aria-label="Email">
                <Mail className="size-5" />
              </ButtonLink>
            </div>
          </div>
        </Tile>

        {/* Now */}
        <Tile className="rise flex flex-col p-6 sm:p-7 lg:col-span-2 lg:row-span-2" style={rise(1)}>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-display text-3xl font-semibold">
              <em className="accent">Now</em>
            </h2>
            <p className="text-xs text-muted">
              Updated <time dateTime={now.updated}>{formatDay(now.updated)}</time>
            </p>
          </div>
          <dl className="mt-6 flex flex-1 flex-col gap-6">
            {now.items.map((item) => (
              <div key={item.label} className="border-l-2 border-accent/60 pl-4">
                <dt className="eyebrow">{item.label}</dt>
                <dd className="mt-1 leading-snug">{item.text}</dd>
              </div>
            ))}
          </dl>
        </Tile>

        {/* Featured project */}
        {featured && (
          <Tile tint={featured.color} className="rise group lg:col-span-3" style={rise(2)}>
            <Link href={featured.href} className="flex h-full flex-col">
              <div className="relative aspect-[16/7] overflow-hidden border-b border-border">
                {featured.cover ? (
                  <Image
                    src={featured.cover.src}
                    alt={featured.cover.alt}
                    fill
                    sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                  />
                ) : (
                  <ProjectArt project={featured} />
                )}
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-bg/80 px-2.5 py-1 text-xs font-medium backdrop-blur">
                  <Star className="size-3.5 text-accent-2" /> Featured project
                </span>
              </div>
              <div className="flex flex-1 items-center justify-between gap-4 p-5">
                <div>
                  <p className="font-display text-lg font-semibold">{featured.title}</p>
                  <p className="text-sm text-muted">{featured.summary}</p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
              </div>
            </Link>
          </Tile>
        )}

        {/* Local time */}
        <Tile className="rise flex flex-col justify-between p-6 lg:col-span-1" style={rise(3)}>
          <p className="eyebrow">Local time</p>
          <div className="mt-6">
            <LocalTime timeZone={profile.timezone} />
          </div>
        </Tile>

        {/* GitHub */}
        <Tile className="rise flex flex-col p-6 lg:col-span-2" style={rise(4)}>
          <div className="flex items-center justify-between">
            <p className="eyebrow">On GitHub</p>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg" aria-label="Open GitHub profile">
              <GitHub className="size-5" />
            </a>
          </div>
          <Suspense fallback={<GitHubFallback url={profile.github} />}>
            <GitHubActivity username={githubUser} url={profile.github} />
          </Suspense>
        </Tile>

        {/* Stack marquee */}
        <Tile spotlight={false} className="rise marquee py-4 md:col-span-2 lg:col-span-6" style={rise(5)}>
          <ul aria-label="Tech stack" className="marquee-track flex w-max gap-3 px-3 motion-reduce:w-auto motion-reduce:flex-wrap">
            {[...stack, ...stack].map((skill, i) => (
              <li
                key={`${skill}-${i}`}
                aria-hidden={i >= stack.length ? true : undefined}
                className={i >= stack.length ? "chip text-sm motion-reduce:hidden" : "chip text-sm"}
              >
                {skill}
              </li>
            ))}
          </ul>
        </Tile>
      </div>
    </section>
  );
}

async function GitHubActivity({ username, url }: { username: string; url: string }) {
  const summary = await getGitHubSummary(username);
  if (!summary) return <GitHubFallback url={url} />;
  return (
    <>
      <dl className="mt-4 flex gap-8">
        <div className="flex flex-col-reverse">
          <dt className="text-xs text-muted">Public repos</dt>
          <dd className="font-display text-3xl font-semibold">{summary.publicRepos}</dd>
        </div>
        <div className="flex flex-col-reverse">
          <dt className="text-xs text-muted">Followers</dt>
          <dd className="font-display text-3xl font-semibold">{summary.followers}</dd>
        </div>
      </dl>
      {summary.recent.length > 0 && (
        <ul aria-label="Recently updated repositories" className="mt-4 space-y-1.5 text-sm">
          {summary.recent.map((repo) => (
            <li key={repo.name} className="flex items-center justify-between gap-3">
              <a href={repo.url} target="_blank" rel="noopener noreferrer" className="truncate hover:text-accent">
                {repo.name}
              </a>
              <span className="shrink-0 text-xs text-muted">{repo.language ?? ""}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function GitHubFallback({ url }: { url: string }) {
  return (
    <div className="mt-4 flex flex-1 flex-col justify-end">
      <p className="text-muted">Code for my projects, experiments and this site.</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 font-medium text-accent hover:underline">
        Browse repositories <ArrowUpRight className="size-4" />
      </a>
    </div>
  );
}

function formatDay(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}
