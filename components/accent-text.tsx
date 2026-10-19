import { Fragment } from "react";

/** Renders `*word*` in content strings in the accent style. Everything else is plain text. */
export function AccentText({ text }: { text: string }) {
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
      <em key={i} className="text-accent not-italic">
        {part.slice(1, -1)}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** The same string with the asterisks removed, for metadata and alt text. */
export const plainText = (text: string) => text.replace(/\*([^*]+)\*/g, "$1");
