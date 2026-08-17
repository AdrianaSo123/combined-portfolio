import type { Destination } from "@/content/types";
import { routes } from "@/lib/routes";
import type { PortfolioAnswer } from "./types";

// Shared chat policy constants. One owner, both sides of the wire import from
// here. This module is dependency-light (no KB/intent table) so it is safe to
// import into client components.

export const MAX_MESSAGE_LENGTH = 500;

export const RATE_LIMIT = {
  windowMs: 60_000,
  maxPerWindow: 20,
} as const;

// Default navigation shown when no specific destination applies.
export const TOP_DESTINATIONS: Destination[] = [
  { label: "SELECTED WORK", href: routes.workSection, kind: "work" },
  { label: "LAB", href: routes.experiments, kind: "experiment" },
  { label: "ABOUT", href: routes.about, kind: "about" },
];

export const UNKNOWN_ANSWER =
  "I don't have anything about that in this portfolio — but you can explore my work below.";

// Single source for the client-side offline state: shown when the chat request
// itself fails, reusing the same top destinations.
export const OFFLINE_ANSWER: PortfolioAnswer = {
  answer: "The assistant is offline right now — explore my work below.",
  suggestedDestinations: TOP_DESTINATIONS,
  citations: [],
  fallback: true,
};
