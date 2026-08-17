import { RATE_LIMIT } from "./constants";

// Fixed-window rate limiter (audit finding #4). The clock is injectable so it
// is deterministic under test, and expired windows are evicted so the store
// does not grow unbounded. Swap the in-memory store for a durable one
// (e.g. Upstash) in production per spec §29.

type Window = { count: number; startedAt: number };

export type RateLimiterOptions = {
  windowMs?: number;
  maxPerWindow?: number;
  now?: () => number;
};

export class RateLimiter {
  private readonly windowMs: number;
  private readonly maxPerWindow: number;
  private readonly now: () => number;
  private readonly windows = new Map<string, Window>();

  constructor(options: RateLimiterOptions = {}) {
    this.windowMs = options.windowMs ?? RATE_LIMIT.windowMs;
    this.maxPerWindow = options.maxPerWindow ?? RATE_LIMIT.maxPerWindow;
    this.now = options.now ?? Date.now;
  }

  // Returns true when the caller has exceeded the allowance for the window.
  isLimited(key: string): boolean {
    const current = this.now();
    const existing = this.windows.get(key);

    if (!existing || current - existing.startedAt > this.windowMs) {
      this.evictExpired(current);
      this.windows.set(key, { count: 1, startedAt: current });
      return false;
    }

    existing.count += 1;
    return existing.count > this.maxPerWindow;
  }

  private evictExpired(current: number): void {
    for (const [key, window] of this.windows) {
      if (current - window.startedAt > this.windowMs) {
        this.windows.delete(key);
      }
    }
  }
}
