"use server";

import { headers } from "next/headers";
import { contactSchema, type ContactField, type ContactState } from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/email";
import { createRateLimiter } from "@/lib/rate-limit";

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "success", message: "Thanks! Your message is on its way." };
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  const { ok } = limiter(ip);
  if (!ok) {
    return { status: "error", message: "Too many messages. Please try again in a few minutes.", values };
  }

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }

  const result = await sendContactEmail(parsed.data);
  if (!result.ok) {
    return {
      status: "error",
      message: "Your message couldn't be sent right now. Please email me directly instead.",
      values,
    };
  }

  return { status: "success", message: "Thanks! Your message is on its way. I'll reply soon." };
}
