import { z } from "zod";

// Control characters (including CR/LF) are never valid in single-line fields;
// rejecting them rules out header injection through the email subject.
const singleLine = (label: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, `${label} must be at least ${min} characters.`)
    .max(max, `${label} must be at most ${max} characters.`)
    .refine((value) => !/[\p{Cc}]/u.test(value), `${label} contains invalid characters.`);

export const contactSchema = z.object({
  name: singleLine("Name", 2, 80),
  email: z.email("Enter a valid email address.").max(254, "Email is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(4000, "Message must be at most 4,000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactField = keyof ContactInput;

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
}
