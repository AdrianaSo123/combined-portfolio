import type { Project } from "./types";
import { BRAND } from "@/lib/theme";

// NOTE: Placeholder content. Structure matches spec §24.1 so real copy,
// metrics, and media can be dropped in later without layout changes.
// Media uses empty src -> UI renders a labeled placeholder panel.

const placeholderCover = (label: string): Project["cover"] => ({
  src: "",
  alt: `${label} — project cover (placeholder)`,
  width: 1600,
  height: 1000,
});

export const projects: Project[] = [
  {
    slug: "wakefern-lpga",
    index: "01",
    name: "Wakefern",
    subtitle: "ShopRite LPGA Classic",
    oneLiner:
      "A digital platform unifying schedules, event info, communications, and operational workflows for a major LPGA event.",
    disciplines: ["Product Design", "Systems"],
    year: 2026,
    status: "shipped",
    role: "Product Design",
    demonstrates: "I can do the job.",
    brand: { accent: "#c8102e" },
    cover: placeholderCover("Wakefern / ShopRite LPGA"),
    gallery: [],
    metrics: [
      { label: "Workflows unified", value: "—" },
      { label: "Stakeholder teams", value: "—" },
      { label: "Event scale", value: "—" },
    ],
    sections: [
      {
        kind: "context",
        heading: "Context",
        body: [
          "Placeholder: what was happening around the ShopRite LPGA Classic and why a unified digital platform was needed.",
        ],
      },
      {
        kind: "problem",
        heading: "Problem",
        body: ["Placeholder: the core problem that needed solving."],
      },
      {
        kind: "role",
        heading: "Role",
        body: ["Placeholder: what Adriana owned across the engagement."],
      },
      {
        kind: "system",
        heading: "Understanding the system",
        body: [
          "Placeholder: users, stakeholders, workflows, constraints, research, and existing processes.",
        ],
      },
      {
        kind: "design",
        heading: "Design",
        body: ["Placeholder: key decisions and explorations."],
      },
      {
        kind: "iteration",
        heading: "Iteration",
        body: ["Placeholder: what changed and why."],
      },
      {
        kind: "final",
        heading: "Final experience",
        body: ["Placeholder: the resulting product."],
      },
      {
        kind: "outcome",
        heading: "Outcome",
        body: ["Placeholder: impact, results, learning, and next steps."],
      },
    ],
    featured: true,
  },
  {
    slug: "lyra",
    index: "02",
    name: "Lyra",
    subtitle: "Placeholder subtitle",
    oneLiner:
      "Placeholder: a project establishing range in interaction design and emerging technology, distinct from Wakefern.",
    disciplines: ["Interaction Design", "Emerging Tech"],
    year: 2025,
    status: "prototype",
    role: "Product Design",
    demonstrates: "I have range.",
    brand: { accent: "#5b8def" },
    cover: placeholderCover("Lyra"),
    gallery: [],
    sections: [
      {
        kind: "context",
        heading: "Context",
        body: ["Placeholder context for Lyra."],
      },
      {
        kind: "design",
        heading: "Design",
        body: ["Placeholder design narrative for Lyra."],
      },
      {
        kind: "outcome",
        heading: "Outcome",
        body: ["Placeholder outcome for Lyra."],
      },
    ],
    featured: true,
  },
  {
    slug: "ai-chat-research",
    index: "03",
    name: "AI + Chat Research",
    subtitle: "Human–AI interaction study",
    oneLiner:
      "Research into conversational AI and human-AI interaction patterns, and what they imply for AI product design.",
    disciplines: ["Research", "AI Interaction"],
    year: 2026,
    status: "research",
    role: "Design Research",
    demonstrates: "This is where I'm going.",
    brand: { accent: BRAND.accent },
    cover: placeholderCover("AI + Chat Research"),
    gallery: [],
    sections: [
      {
        kind: "context",
        heading: "Research question",
        body: ["Placeholder: the guiding research question."],
      },
      {
        kind: "system",
        heading: "Methodology",
        body: ["Placeholder: how the research was conducted."],
      },
      {
        kind: "custom",
        heading: "Observations",
        body: ["Placeholder: interaction patterns and evidence observed."],
      },
      {
        kind: "outcome",
        heading: "Implications",
        body: ["Placeholder: synthesis and implications for AI product design."],
      },
    ],
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
