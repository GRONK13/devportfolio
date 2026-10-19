import Image from "next/image";
import { Section } from "@/components/section";
import type { Profile } from "@/lib/content";
import { pad } from "@/lib/format";

export function About({ profile, values }: { profile: Profile; values: { title: string; description: string }[] }) {
  return (
    <Section id="about" index={2} title="About">
      <div className="grid-12 gap-y-10">
        {profile.photo && (
          <figure className="reveal col-span-4 md:col-span-4">
            <Image
              src={profile.photo.src}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              sizes="(min-width: 768px) 30vw, 100vw"
              className="aspect-[4/5] w-full object-cover grayscale"
            />
            <figcaption className="label mt-3 text-muted">{profile.location}</figcaption>
          </figure>
        )}
        <div
          className="prose reveal col-span-4 text-lg md:col-span-7 md:col-start-6 md:text-xl md:leading-relaxed"
          // Compiled from content/profile.yaml at build time with raw HTML disabled.
          dangerouslySetInnerHTML={{ __html: profile.aboutHtml }}
        />
      </div>

      <h3 className="label mt-20 text-muted">How I work</h3>
      <dl className="mt-6 grid grid-cols-1 border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, i) => (
          <div key={value.title} className="reveal border-b border-rule py-6 sm:pr-6 lg:border-b-0">
            <dt className="flex items-baseline gap-3 text-lg font-semibold">
              <span className="label font-normal text-accent" aria-hidden="true">
                {pad(i + 1)}
              </span>
              {value.title}
            </dt>
            <dd className="mt-2 text-muted">{value.description}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
