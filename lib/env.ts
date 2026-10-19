import "server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_TO_EMAIL: z.email().optional(),
  CONTACT_FROM_EMAIL: z.string().min(3).optional(),
  GITHUB_TOKEN: z.string().min(1).optional(),
});

/** Server-only environment, validated once. Never import this from client code. */
export const serverEnv = serverEnvSchema.parse({
  RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL || undefined,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL || undefined,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || undefined,
});
