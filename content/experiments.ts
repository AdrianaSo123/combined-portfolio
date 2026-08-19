import type { Experiment } from "./types";

export const experiments: Experiment[] = [
  {
    slug: "ux-synthesizer",
    index: "001",
    name: "UX Synthesizer",
    blurb:
      "AI-assisted qualitative UX research synthesis: ingest transcripts, notes, and survey verbatims and produce structured insights - themes, pain points, personas, codebook, and recommendations - with grounding checks and a transcript cleanup pipeline.",
    stack: ["Next.js", "TypeScript", "OpenAI", "Zod", "Tailwind"],
    keyDecision:
      "Zod-validated analysis JSON plus deterministic transcript normalization, with optional LLM repair and evidence repair for ungrounded snippets.",
    outcome:
      "Researchers move from raw qualitative data to schema-valid, quote-backed outputs they can review, copy, and export without losing traceability to the source.",
    proofSystem:
      "Vitest and Playwright coverage in CI, grounding checks for every generated claim, and recovery paths when transcript quality is low.",
    links: {
      demo: "https://so-kind-research-r9i5.vercel.app/",
      github: "https://github.com/AdrianaSo123/soKind_research",
    },
    media: {
      src: "/images/experiments/ux-synthesizer-hero.png",
      alt: "UX Synthesizer hero with insight cards and process steps",
      width: 1365,
      height: 900,
      fit: "cover",
    },
    diagram: {
      src: "/images/experiments/ux-synthesizer-flow.png",
      alt: "So Studio product flow with app UI panels",
      width: 1543,
      height: 1019,
      fit: "cover",
    },
  },
];

export function getExperiment(slug: string): Experiment | undefined {
  return experiments.find((experiment) => experiment.slug === slug);
}

export function experimentParams(): { slug: string }[] {
  return experiments.map((experiment) => ({ slug: experiment.slug }));
}
