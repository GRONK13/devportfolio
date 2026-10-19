import { AccentText } from "@/components/accent-text";
import { Availability } from "@/components/availability";
import type { Profile } from "@/lib/content";

/** Server-rendered and visible at first paint: the name is the LCP element, never hidden for an intro. */
export function Hero({ profile }: { profile: Profile }) {
  const [first, ...rest] = profile.name.split(" ");
  return (
    <section aria-labelledby="hero-name" className="frame pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="label flex flex-wrap justify-between gap-x-6 gap-y-2 text-muted">
        <p>
          {profile.role} — {profile.location}
        </p>
        <p className="text-fg">
          <Availability availability={profile.availability} />
        </p>
      </div>

      <h1 id="hero-name" className="display mt-10 text-[clamp(3.75rem,20vw,16rem)] md:mt-16 md:text-[clamp(3.75rem,17vw,16rem)]">
        <span className="block">{first}</span>
        <span className="block md:pl-[12%]">{rest.join(" ")}</span>
      </h1>

      <div className="grid-12 mt-12 gap-y-8 md:mt-20">
        <p className="col-span-4 text-[clamp(1.6rem,3.4vw,2.75rem)] leading-[1.08] font-medium tracking-[-0.025em] md:col-span-7">
          <AccentText text={profile.headline} />
        </p>
        <div className="col-span-4 md:col-span-4 md:col-start-9">
          <p className="text-muted">{profile.intro}</p>
          <ul className="mt-8 flex flex-wrap gap-3">
            <li>
              <a
                href="#work"
                className="label inline-flex h-11 items-center bg-accent-fill px-5 font-medium text-on-accent hover:bg-fg hover:text-bg"
              >
                View work
              </a>
            </li>
            <li>
              <a href={profile.resume.file} className="label inline-flex h-11 items-center border border-fg px-5 hover:bg-fg hover:text-bg">
                Résumé
                <span className="ml-2 text-[0.65rem] opacity-70">PDF {profile.resume.sizeKB} KB</span>
              </a>
            </li>
            <li>
              <a href="#contact" className="label inline-flex h-11 items-center border border-rule px-5 hover:border-fg">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
