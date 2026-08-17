import { describe, it, expect } from "vitest";
import { POST } from "./route";
import type { PortfolioAnswer } from "@/lib/ai/types";

// Each test uses a distinct client IP so the module-level rate limiter does not
// leak state between cases.
function request(body: unknown, ip: string): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/chat", () => {
  it("answers a valid message with a grounded PortfolioAnswer", async () => {
    const res = await POST(request({ message: "What have you shipped?" }, "1.1.1.1"));
    expect(res.status).toBe(200);
    const data = (await res.json()) as PortfolioAnswer;
    expect(data.answer).toBeTruthy();
    expect(data.citations).toContain("wakefern-1");
    expect(data.suggestedDestinations[0]?.href).toBe("/work/wakefern-lpga");
  });

  it("rejects an empty message with 400", async () => {
    const res = await POST(request({ message: "   " }, "2.2.2.2"));
    expect(res.status).toBe(400);
  });

  it("rejects a non-string message with 400", async () => {
    const res = await POST(request({ message: 123 }, "3.3.3.3"));
    expect(res.status).toBe(400);
  });

  it("rejects invalid JSON with 400", async () => {
    const res = await POST(request("{not json", "4.4.4.4"));
    expect(res.status).toBe(400);
  });

  it("rate-limits after the allowance is exceeded", async () => {
    const ip = "5.5.5.5";
    let last = 200;
    for (let i = 0; i < 25; i++) {
      const res = await POST(request({ message: "hello" }, ip));
      last = res.status;
    }
    expect(last).toBe(429);
  });
});
