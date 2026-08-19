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
    highlightsHeading: "System",
    highlights: [
      "Ingests transcripts, notes, and survey verbatims into a normalized analysis pipeline.",
      "Produces structured synthesis outputs: themes, pain points, personas, codebook, and recommendations.",
      "Runs grounding checks on generated claims and repairs ungrounded evidence snippets.",
      "Supports deterministic transcript cleanup with optional LLM-assisted repair when input quality is low.",
    ],
    links: {
      demo: "https://so-kind-research-r9i5.vercel.app/",
      github: "https://github.com/AdrianaSo123/soKind_research",
    },
    media: {
      src: "/images/experiments/ux-synthesizer-hero.png",
      alt: "UX Synthesizer hero with insight cards and process steps",
      caption: "Qualitative inputs transformed into structured, grounded UX insights.",
      width: 1365,
      height: 900,
      fit: "cover",
    },
  },
  {
    slug: "so-studio-flow-mapper",
    index: "002",
    name: "So Studio Flow Mapper",
    blurb:
      "A companion lab prototype focused on mapping qualitative research operations from transcript ingestion through normalization, synthesis, and evidence checks.",
    stack: ["Swift", "Node.js", "OpenAI API", "Whisper"],
    keyDecision:
      "Separate pipeline observability from authoring so researchers can inspect where evidence quality drops before final synthesis.",
    outcome:
      "Improved trust in the analysis pipeline by making each stage visible and easier to troubleshoot.",
    proofSystem:
      "Schema validation at each stage boundary plus deterministic checkpointing for repeatable runs.",
    highlightsHeading: "So Studio Platform",
    highlights: [
      "So Studio Platform (Swift, Node.js, OpenAI API, Whisper).",
      "Created an MCP-compatible tool interface for integration with external agent frameworks.",
      "Built an end-to-end, production-connected AI system that automates content generation and deployment from voice input.",
      "Engineered a multi-stage pipeline (audio -> transcription -> LLM -> validation -> publishing) using OpenAI Whisper.",
      "Implemented an automated CI/CD pipeline where AI-generated content is version-controlled and deployed to production via GitHub -> Vercel integration.",
      "Implemented authentication-gated tool access, restricting admin capabilities to authorized users.",
    ],
    links: {
      demo: "https://so-studio-pi.vercel.app",
      github: "https://github.com/AdrianaSo123/soKind_research",
    },
    media: {
      src: "/images/experiments/ux-synthesizer-flow.png",
      alt: "So Studio flow mapping with UI panels and pipeline stages",
      caption: "Pipeline view from ingestion to grounded recommendation output.",
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
