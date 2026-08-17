import { routes } from "@/lib/routes";
import type { Destination } from "@/content/types";
import type { PortfolioAnswer } from "./types";

// Transport boundary: the view calls this; it owns the wire format and
// validates the response instead of blindly casting.

function isDestination(value: unknown): value is Destination {
  if (typeof value !== "object" || value === null) return false;
  const d = value as Record<string, unknown>;
  return typeof d.label === "string" && typeof d.href === "string" && typeof d.kind === "string";
}

function isPortfolioAnswer(value: unknown): value is PortfolioAnswer {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.answer === "string" &&
    Array.isArray(v.suggestedDestinations) &&
    v.suggestedDestinations.every(isDestination) &&
    Array.isArray(v.citations) &&
    typeof v.fallback === "boolean"
  );
}

export async function askPortfolio(message: string): Promise<PortfolioAnswer> {
  const res = await fetch(routes.chatApi, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error(`Chat request failed: ${res.status}`);
  }

  const data: unknown = await res.json();
  if (!isPortfolioAnswer(data)) {
    throw new Error("Malformed chat response.");
  }

  return data;
}
