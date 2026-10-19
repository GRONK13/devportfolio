import { RichText } from "./rich-text";

export function SectionHeading({ id, eyebrow, title, intro }: { id: string; eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="reveal mb-10 flex max-w-2xl flex-col gap-3 sm:mb-12">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="text-4xl font-semibold leading-[1.05] sm:text-5xl">
        <RichText text={title} />
      </h2>
      {intro && <p className="text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}
