// Shared chat policy constants (audit finding #9). One owner, both sides of
// the wire import from here.

export const MAX_MESSAGE_LENGTH = 500;

export const RATE_LIMIT = {
  windowMs: 60_000,
  maxPerWindow: 20,
} as const;
