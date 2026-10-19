import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  checkBotId: vi.fn(),
  checkRateLimit: vi.fn(),
  sendContactEmail: vi.fn(),
}));

vi.mock("botid/server", () => ({ checkBotId: mocks.checkBotId }));
vi.mock("@vercel/firewall", () => ({ checkRateLimit: mocks.checkRateLimit }));
vi.mock("@/lib/email", () => ({ sendContactEmail: mocks.sendContactEmail }));
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": `203.0.113.${Math.floor(Math.random() * 250)}` }),
}));

const { sendMessage } = await import("@/app/actions/contact");

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [k, v] of Object.entries(fields)) data.set(k, v);
  return data;
};
const valid = { name: "Jane Recruiter", email: "jane@company.com", message: "Hi Gregg, we have a role you might like." };
const idle = { status: "idle" as const };

beforeEach(() => {
  vi.clearAllMocks();
  mocks.checkBotId.mockResolvedValue({ isBot: false, isHuman: true });
  mocks.checkRateLimit.mockResolvedValue({ rateLimited: false });
  mocks.sendContactEmail.mockResolvedValue({ ok: true });
});

describe("sendMessage", () => {
  it("sends a valid message", async () => {
    const state = await sendMessage(idle, form(valid));
    expect(state.status).toBe("success");
    expect(mocks.sendContactEmail).toHaveBeenCalledWith(valid);
  });

  it("pretends to succeed for honeypot hits without sending or checking further", async () => {
    const state = await sendMessage(idle, form({ ...valid, website: "https://spam.example" }));
    expect(state.status).toBe("success");
    expect(mocks.checkBotId).not.toHaveBeenCalled();
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it("refuses bots with a generic message", async () => {
    mocks.checkBotId.mockResolvedValue({ isBot: true, isHuman: false });
    const state = await sendMessage(idle, form(valid));
    expect(state.status).toBe("error");
    expect(state.message).toMatch(/email me directly/);
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it("returns field errors and keeps what was typed", async () => {
    const state = await sendMessage(idle, form({ ...valid, email: "nope" }));
    expect(state.fieldErrors?.email).toBeTruthy();
    expect(state.values?.message).toBe(valid.message);
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it("checks the Vercel Firewall rule when running on Vercel", async () => {
    vi.stubEnv("VERCEL", "1");
    mocks.checkRateLimit.mockResolvedValue({ rateLimited: true });
    const state = await sendMessage(idle, form(valid));
    vi.unstubAllEnvs();
    expect(mocks.checkRateLimit).toHaveBeenCalledWith("contact-form", expect.objectContaining({ headers: expect.any(Headers) }));
    expect(state.message).toMatch(/Too many messages/);
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it("falls back to the email address when the provider fails", async () => {
    mocks.sendContactEmail.mockResolvedValue({ ok: false, reason: "provider-error" });
    const state = await sendMessage(idle, form(valid));
    expect(state.status).toBe("error");
    expect(state.message).toMatch(/email me directly/);
  });
});
