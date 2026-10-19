"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { sendMessage } from "@/app/actions";
import type { ContactField, ContactState } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./icons";

const initialState: ContactState = { status: "idle" };

const fieldClass =
  "w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-[15px] text-fg outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-accent/20 aria-[invalid=true]:border-danger";

function Field({
  name,
  label,
  state,
  children,
}: {
  name: ContactField;
  label: string;
  state: ContactState;
  children: (props: { id: string; name: string; "aria-invalid": boolean; "aria-describedby"?: string; defaultValue?: string }) => React.ReactNode;
}) {
  const id = `contact-${name}`;
  const error = state.fieldErrors?.[name];
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">
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
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ bare = false }: { bare?: boolean }) {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      // With JS, submit manually so React doesn't clear what the visitor typed when validation fails.
      // Without JS, the native form post still reaches the same server action.
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => formAction(data));
      }}
      className={cn("relative space-y-5", !bare && "tile p-6 sm:p-8")}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Name" state={state}>
          {(props) => <input {...props} type="text" autoComplete="name" required minLength={2} maxLength={80} placeholder="Jane Recruiter" className={fieldClass} />}
        </Field>
        <Field name="email" label="Email" state={state}>
          {(props) => <input {...props} type="email" autoComplete="email" required maxLength={254} placeholder="jane@company.com" className={fieldClass} />}
        </Field>
      </div>
      <Field name="message" label="Message" state={state}>
        {(props) => (
          <textarea
            {...props}
           
            required
            minLength={10}
            maxLength={4000}
            rows={5}
            placeholder="Tell me about the role or project…"
            className={cn(fieldClass, "resize-y")}
          />
        )}
      </Field>

      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          role="status"
          aria-live="polite"
          className={cn("text-sm", state.status === "success" ? "text-success" : state.status === "error" ? "text-danger" : "text-muted")}
        >
          {state.message ?? "Your details are only used to reply to you."}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-accent px-5 py-2.5 font-medium text-accent-fg transition-[filter] hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
          <ArrowRight className="size-4" />
        </button>
      </div>
    </form>
  );
}
