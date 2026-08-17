import { describe, it, expect } from "vitest";
import { RateLimiter } from "./rate-limit";

describe("RateLimiter", () => {
  it("allows requests up to the limit, then blocks", () => {
    const limiter = new RateLimiter({ maxPerWindow: 3, windowMs: 1000, now: () => 0 });
    expect(limiter.isLimited("a")).toBe(false); // 1
    expect(limiter.isLimited("a")).toBe(false); // 2
    expect(limiter.isLimited("a")).toBe(false); // 3
    expect(limiter.isLimited("a")).toBe(true); // 4 -> over
  });

  it("tracks keys independently", () => {
    const limiter = new RateLimiter({ maxPerWindow: 1, windowMs: 1000, now: () => 0 });
    expect(limiter.isLimited("a")).toBe(false);
    expect(limiter.isLimited("b")).toBe(false);
    expect(limiter.isLimited("a")).toBe(true);
  });

  it("resets after the window elapses", () => {
    let clock = 0;
    const limiter = new RateLimiter({ maxPerWindow: 1, windowMs: 1000, now: () => clock });
    expect(limiter.isLimited("a")).toBe(false);
    expect(limiter.isLimited("a")).toBe(true);
    clock = 2000;
    expect(limiter.isLimited("a")).toBe(false);
  });
});
