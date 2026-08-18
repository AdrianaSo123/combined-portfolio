import { kbText, kbDestinations } from "@/content/kb";
import { TOP_DESTINATIONS, UNKNOWN_ANSWER } from "./constants";
import type { PortfolioAnswer } from "./types";

// Deterministic intent table (spec §19.5). Guarantees the conversational
// portfolio works with zero AI availability, and powers the suggested prompts.
//
// NOTE: intents are evaluated in order — first match wins. Keep more specific
// patterns above broader ones. Routing is pinned by tests (see fallback.test.ts).

type Intent = {
  id: string;
  match: RegExp;
  answer: string;
  destinationsFrom: string[]; // KB entry ids
};

const intents: Intent[] = [
  {
    id: "process",
    match: /\b(process|how do you work|how does adriana work|how you work|method)\b/i,
    answer: kbText("process-1"),
    destinationsFrom: ["process-1"],
  },
  {
    id: "about",
    match: /\b(who|about|adriana|background|résumé|resume|contact|hire)\b/i,
    answer: kbText("about-1"),
    destinationsFrom: ["about-1"],
  },
  {
    id: "projects",
    match: /\b(projects?|portfolio|selected work|product design|design work|case study)\b/i,
    answer:
      "Selected work includes a live product platform for Wakefern / ShopRite LPGA, Lyra for interaction range, and research on conversational AI.",
    destinationsFrom: ["wakefern-1", "lyra-1", "ai-research-1"],
  },
  {
    id: "ai-research",
    match: /\b(ai|research|conversational|chat|human-ai|llm)\b/i,
    answer: kbText("ai-research-1"),
    destinationsFrom: ["ai-research-1"],
  },
  {
    id: "technical",
    match: /\b(technical|build|built|code|engineer|prototype|lab|experiment)\b/i,
    answer: kbText("lab-1"),
    destinationsFrom: ["lab-1"],
  },
  {
    id: "shipped",
    match: /\b(ship|shipped|launch|launched|live|wakefern|lpga)\b/i,
    answer: kbText("wakefern-1"),
    destinationsFrom: ["wakefern-1"],
  },
];

function matchIntent(message: string): Intent | undefined {
  return intents.find((intent) => intent.match.test(message));
}

export function scriptedAnswer(message: string): PortfolioAnswer {
  const intent = matchIntent(message.trim());

  if (!intent) {
    return {
      answer: UNKNOWN_ANSWER,
      suggestedDestinations: TOP_DESTINATIONS,
      citations: [],
      fallback: true,
    };
  }

  return {
    answer: intent.answer,
    suggestedDestinations: kbDestinations(intent.destinationsFrom),
    citations: intent.destinationsFrom,
    fallback: true,
  };
}
