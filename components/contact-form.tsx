"use client";

import { startTransition, useActionState, useEffect, useRef, type ReactNode } from "react";
import { sendMessage } from "@/app/actions/contact";
import type { ContactField, ContactState } from "@/lib/contact-schema";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full border-0 border-b border-rule bg-transparent px-0 py-3 text-lg text-fg placeholder:text-muted focus:border-fg focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-accent";

type FieldProps = {
  id: string;
  name: ContactField;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  defaultValue?: string;
};

function Field({
  name,
  label,
  state,
  className,
  children,
}: {
  name: ContactField;
  label: string;
  state: ContactState;
  className?: string;
  children: (props: FieldProps) => ReactNode;
}) {
  const id = `contact-${name}`;
  const error = state.fieldErrors?.[name];
  return (
    <div className={className}>
      <label htmlFor={id} className="label text-muted">
        {label}
      </label>
      {children({
        id,
        name,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? `${id}-error` : undefined,
        defaultValue: state.values?.[name],
      })}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-accent">
          <span aria-hidden="true">! </span>
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Progressive enhancement: with JavaScript the form submits through React (keeping what was typed
 * if validation fails); the visible email address covers anyone the form can't serve.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
    // Move focus to the first invalid field so keyboard users land where the problem is.
    if (state.fieldErrors) formRef.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => formAction(data));
      }}
      noValidate
      className="relative grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
    >
      <Field name="name" label="Name" state={state}>
        {(props) => <input {...props} type="text" autoComplete="name" required maxLength={80} className={inputClass} />}
      </Field>
      <Field name="email" label="Email" state={state}>
        {(props) => (
          <input {...props} type="email" autoComplete="email" inputMode="email" required maxLength={254} className={inputClass} />
        )}
      </Field>
      <Field name="message" label="Message" state={state} className="sm:col-span-2">
        {(props) => <textarea {...props} required maxLength={4000} rows={5} className={`${inputClass} resize-y`} />}
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots that fill it are ignored. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col-reverse items-start gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" aria-live="polite" className={state.status === "error" ? "text-accent" : "text-muted"}>
          {state.status === "success" && <span aria-hidden="true">✓ </span>}
          {state.message ?? "Your details are only used to reply to you."}
        </p>
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="label inline-flex h-12 shrink-0 items-center gap-3 bg-accent-fill px-6 font-medium text-on-accent hover:bg-fg hover:text-bg disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send message"}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
