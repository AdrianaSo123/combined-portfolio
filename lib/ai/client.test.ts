import { describe, it, expect, vi, afterEach } from "vitest";
import { askPortfolio } from "./client";

function mockFetch(response: { ok: boolean; status?: number; body: unknown }) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: response.ok,
      status: response.status ?? (response.ok ? 200 : 500),
      json: async () => response.body,
    })
  );
}

afterEach(() => vi.unstubAllGlobals());

const valid = {
  answer: "hi",
  suggestedDestinations: [{ label: "ABOUT", href: "/about", kind: "about" }],
  citations: ["about-1"],
  fallback: true,
};

describe("askPortfolio", () => {
  it("returns a validated answer on success", async () => {
    mockFetch({ ok: true, body: valid });
    await expect(askPortfolio("hi")).resolves.toEqual(valid);
  });

  it("throws on a non-2xx response instead of trusting the body", async () => {
    mockFetch({ ok: false, status: 429, body: { error: "nope" } });
    await expect(askPortfolio("hi")).rejects.toThrow(/429/);
  });

  it("throws when the response shape is malformed", async () => {
    mockFetch({ ok: true, body: { answer: 123 } });
    await expect(askPortfolio("hi")).rejects.toThrow(/malformed/i);
  });
});
