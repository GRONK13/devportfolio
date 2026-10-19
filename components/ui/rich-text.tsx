import { Fragment } from "react";

/** Renders a single line where *words in asterisks* get the italic accent face. Everything else is plain text. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="accent">
            {part}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
