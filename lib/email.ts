import "server-only";
import { getProfile } from "@/lib/content";
import type { ContactInput } from "./contact-schema";
import { serverEnv } from "./env";

export type SendResult = { ok: true } | { ok: false; reason: "not-configured" | "provider-error" };

/** Formats a submission as plain text, so nothing a visitor types is ever rendered as HTML. */
export function formatContactEmail({ name, email, message }: ContactInput) {
  return {
    subject: `Portfolio message from ${name}`,
    text: [`From: ${name} <${email}>`, "", message, "", "—", "Sent from the contact form on your portfolio."].join("\n"),
  };
}

export async function sendContactEmail(input: ContactInput): Promise<SendResult> {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = serverEnv;

  if (!RESEND_API_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY not set; skipping send for", input.email);
      return { ok: true };
    }
    return { ok: false, reason: "not-configured" };
  }

  const { subject, text } = formatContactEmail(input);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [CONTACT_TO_EMAIL ?? getProfile().email],
      reply_to: input.email,
      subject,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);

  if (!response?.ok) {
    console.error("[contact] email provider error", response?.status ?? "network");
    return { ok: false, reason: "provider-error" };
  }
  return { ok: true };
}
