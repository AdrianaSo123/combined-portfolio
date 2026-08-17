import type { Experiment } from "./types";

// Placeholder Lab entries (spec §10 / §24.2). Add real experiments gradually.
export const experiments: Experiment[] = [
  {
    slug: "ux-synthesizer",
    index: "001",
    name: "UX Synthesizer",
    blurb: "AI-assisted research synthesis with structured evidence.",
    stack: ["Next.js", "TypeScript", "LLM API"],
    keyDecision:
      "Placeholder: one interesting technical decision behind the tool.",
    links: { demo: "#", github: "#", notes: "#" },
  },
];

export function getExperiment(slug: string): Experiment | undefined {
  return experiments.find((e) => e.slug === slug);
}
