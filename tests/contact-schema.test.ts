import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

const valid = { name: "Jane Doe", email: "jane@example.com", message: "Hello, I'd like to talk about a role." };

describe("contactSchema", () => {
  it("accepts a normal message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("trims whitespace", () => {
    const parsed = contactSchema.parse({ ...valid, name: "  Jane Doe  " });
    expect(parsed.name).toBe("Jane Doe");
  });

  it("rejects newlines in the name to prevent header injection", () => {
    const result = contactSchema.safeParse({ ...valid, name: "Jane\r\nBcc: victim@example.com" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid emails", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects oversized messages", () => {
    expect(contactSchema.safeParse({ ...valid, message: "a".repeat(4001) }).success).toBe(false);
  });
});
