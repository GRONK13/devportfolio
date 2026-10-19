import type { Profile } from "@/lib/content";
import { Avatar } from "../ui/avatar";
import { SectionHeading } from "../ui/section-heading";
import { Tile } from "../ui/tile";

export function About({ profile }: { profile: Profile }) {
  return (
    <section aria-labelledby="about-title" id="about" className="container-page py-20 sm:py-28">
      <SectionHeading id="about-title" eyebrow="About" title="A bit *about me*" />
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div className="reveal flex flex-col gap-8 sm:flex-row sm:items-start">
          <Avatar profile={profile} className="size-28 shrink-0 sm:size-36" />
          {/* storyHtml is rendered from content/profile.md with raw HTML disabled (lib/content/markdown.ts). */}
          <div className="prose-content text-lg" dangerouslySetInnerHTML={{ __html: profile.storyHtml }} />
        </div>
        <ul className="reveal grid gap-3 self-start sm:grid-cols-2">
          {profile.values.map((value, i) => (
            <li key={value.title}>
              <Tile className="h-full p-5">
                <p className="font-mono text-xs text-accent">0{i + 1}</p>
                <h3 className="mt-2 font-sans text-base font-semibold tracking-normal">{value.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{value.body}</p>
              </Tile>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
