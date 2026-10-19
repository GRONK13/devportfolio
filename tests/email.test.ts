import { describe, expect, it } from "vitest";
import { formatContactEmail } from "@/lib/email";

describe("formatContactEmail", () => {
  it("produces plain text that keeps markup inert", () => {
    const email = formatContactEmail({ name: "Eve", email: "eve@example.com", message: "<img src=x onerror=alert(1)>" });
    expect(email.subject).toBe("Portfolio message from Eve");
    expect(email.text).toContain("<img src=x onerror=alert(1)>");
    expect(email).not.toHaveProperty("html");
  });
});
