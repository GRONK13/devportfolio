"use client";

import { useEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/contact-form";

/**
 * Mounts the contact form only once the visitor scrolls near it. A <form> with autocomplete
 * fields makes the browser run its autofill scan at page load, which measurably added
 * main-thread work on mobile (docs/decisions.md, "Contact form loads near the viewport").
 * The space is reserved so nothing shifts when it appears, and the email address above the
 * form covers visitors without JavaScript.
 */
export function LazyContactForm({ email }: { email: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={show ? undefined : "min-h-[34rem] sm:min-h-[25rem]"}>
      {show ? (
        <ContactForm />
      ) : (
        <noscript>
          <p className="text-muted">
            The form needs JavaScript. Email me at <a href={`mailto:${email}`}>{email}</a> instead.
          </p>
        </noscript>
      )}
    </div>
  );
}
