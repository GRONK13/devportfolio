import { Section } from "@/components/section";
import type { Now as NowData } from "content-collections";
import { formatDate } from "@/lib/format";

export function Now({ now }: { now: NowData }) {
  return (
    <Section
      id="now"
      index={3}
      title="Now"
      aside={
        <>
          Updated <time dateTime={now.updated}>{formatDate(now.updated)}</time>
        </>
      }
    >
      <dl className="grid-12 gap-y-8">
        {now.items.map((item) => (
          <div key={item.label} className="col-span-4">
            <dt className="label text-accent">{item.label}</dt>
            <dd className="mt-3 text-xl leading-snug font-medium tracking-tight md:text-2xl">{item.text}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
