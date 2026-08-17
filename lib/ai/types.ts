import type { Destination } from "@/content/types";

// Response contract (spec §19.3). The UI renders this deterministically.
export type PortfolioAnswer = {
  answer: string;
  suggestedDestinations: Destination[];
  citations: string[];
  fallback: boolean;
};

export type ChatRequest = {
  message: string;
};
