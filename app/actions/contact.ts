"use server";

import { checkRateLimit } from "@vercel/firewall";
import { checkBotId } from "botid/server";
import { headers } from "next/headers";
import { contactSchema, type ContactField, type ContactState } from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/email";
import { createRateLimiter } from "@/lib/rate-limit";

/**
 * ID of the Vercel Firewall rate-limit rule (Firewall → Rules → "@vercel/firewall" condition).
 * Without that rule the WAF check reports "not-found" and only the in-memory limiter applies.
 */
const RATE_LIMIT_RULE_ID = "contact-form";

// Per-instance backstop for the WAF rule; serverless instances don't share it.
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

const FALLBACK = "Your message couldn't be sent right now. Please email me directly instead.";

/**
 * The contact form's Server Action. Server Actions are public POST endpoints, so every layer
 * runs here on the server: honeypot → BotID → rate limit → Zod → send. Errors stay generic.
 */
export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot: people never see or fill this field. Pretend it worked so bots learn nothing.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "success", message: "Thanks! Your message is on its way." };
  }

  // BotID needs the client script, so a submission without JavaScript is treated as a bot.
  // The email address stays visible on the page for those visitors.
  // Fail closed: if BotID can't give a verdict (outage, missing OIDC token off Vercel), refuse
  // politely instead of crashing the form.
  const verdict = await checkBotId().catch((error: unknown) => {
    console.error("[contact] BotID check failed:", error instanceof Error ? error.message : error);
    return { isBot: true };
  });
  if (verdict.isBot) {
    return { status: "error", message: FALLBACK, values };
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  const waf = process.env.VERCEL
    ? await checkRateLimit(RATE_LIMIT_RULE_ID, { headers: requestHeaders, timeout: 3000 }).catch(() => ({
        rateLimited: false,
        error: "timeout",
      }))
    : { rateLimited: false };
  if ("error" in waf && waf.error) console.warn("[contact] firewall rate limit unavailable:", waf.error);
  if (waf.rateLimited || !limiter(ip).ok) {
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
    return { status: "error", message: FALLBACK, values };
  }
  return { status: "success", message: "Thanks! Your message is on its way. I'll reply soon." };
}
