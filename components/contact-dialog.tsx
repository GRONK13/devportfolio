"use client";

import { useRef } from "react";
import { ContactForm } from "./contact-form";
import { Send, X } from "./icons";
import { buttonClass } from "./ui/button";

/** "Write a message" opens the form in a dialog; without JavaScript the link goes to the /contact page instead. */
export function ContactDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <a
        href="/contact"
        onClick={(event) => {
          event.preventDefault();
          dialogRef.current?.showModal();
        }}
        className={buttonClass("primary")}
      >
        <Send className="size-4" /> Write a message
      </a>
      <dialog
        ref={dialogRef}
        aria-labelledby="contact-dialog-title"
        onClick={(event) => event.target === dialogRef.current && dialogRef.current?.close()}
        className="m-auto w-[min(40rem,calc(100vw-2rem))] max-w-none bg-transparent p-0 text-fg"
      >
        <div className="tile p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 id="contact-dialog-title" className="text-2xl font-semibold">
                Send a message
              </h2>
              <p className="mt-1 text-sm text-muted">It lands straight in my inbox.</p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex size-9 items-center justify-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>
          <ContactForm bare />
        </div>
      </dialog>
    </>
  );
}
