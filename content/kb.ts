import type { Destination } from "./types";
import { HEADLINE } from "./about";
import { routes } from "@/lib/routes";

// Approved knowledge base (spec §24.3). The assistant may only state facts that
// exist here. Placeholder text now; expand with real, quotable content later.
export type KBEntry = {
  id: string;
  topic: string;
  kind: "project" | "experiment" | "resume" | "skill" | "about" | "faq";
  text: string;
  destinations?: Destination[];
};

export const knowledgeBase: KBEntry[] = [
  {
    id: "wakefern-1",
    topic: "wakefern",
    kind: "project",
    text: "Adriana was UX and product design intern at Wakefern Food Corp (February–May 2026), designing a mobile sponsor app and desktop admin platform for the ShopRite LPGA Classic. The work centralized personalized schedules, tournament information, wayfinding, communications, and administrative control for an event with 65,000+ attendees. Core workflows were approved for production implementation.",
    destinations: [
      { label: "WAKEFERN / SHOPRITE LPGA", href: routes.work("wakefern-lpga"), kind: "work" },
    ],
  },
  {
    id: "lyra-1",
    topic: "lyra",
    kind: "project",
    text: "Lyra is a project that establishes Adriana's range in interaction design and emerging technology.",
    destinations: [{ label: "LYRA", href: routes.work("lyra"), kind: "work" }],
  },
  {
    id: "ai-research-1",
    topic: "ai-research",
    kind: "project",
    text: "Adriana led a qualitative ChatGPT study with one older adult, finding that understanding responses did not create motivation to return. Barriers included knowing what to ask, unclear voice interaction states, and trust gaps around language capability and AI accuracy warnings.",
    destinations: [
      { label: "AI + CHAT RESEARCH", href: routes.work("ai-chat-research"), kind: "work" },
    ],
  },
  {
    id: "about-1",
    topic: "about",
    kind: "about",
    text: HEADLINE,
    destinations: [{ label: "ABOUT", href: routes.about, kind: "about" }],
  },
  {
    id: "lab-1",
    topic: "lab",
    kind: "experiment",
    text: "The Lab holds smaller technical experiments and tools, including UX Synthesizer and So Studio Flow Mapper. Together they cover grounded qualitative synthesis, pipeline observability, Zod validation, and evidence checks.",
    destinations: [{ label: "LAB", href: routes.experiments, kind: "experiment" }],
  },
  {
    id: "process-1",
    topic: "process",
    kind: "faq",
    text: "Adriana starts from the people and the system: context, constraints, then design and iteration until there is a clear outcome. The case studies follow that path — product work, interaction pieces, and AI research.",
    destinations: [
      { label: "SELECTED WORK", href: routes.workSection, kind: "work" },
      { label: "ABOUT", href: routes.about, kind: "about" },
    ],
  },
];

const byId: Record<string, KBEntry> = Object.fromEntries(
  knowledgeBase.map((entry) => [entry.id, entry])
);

// Loud lookup: fails with the offending id instead of a silent non-null
// assertion far from the cause.
export function getKBEntry(id: string): KBEntry {
  const entry = byId[id];
  if (!entry) throw new Error(`Unknown KB id: ${id}`);
  return entry;
}

export function kbText(id: string): string {
  return getKBEntry(id).text;
}

export function kbDestinations(ids: string[]): Destination[] {
  return ids.flatMap((id) => getKBEntry(id).destinations ?? []);
}
