import type { About } from "./types";

// Placeholder about/résumé (spec §24.4). Final headline copy TBD by Adriana.
export const about: About = {
  headline:
    "Designer and builder working across product, AI, and human-computer interaction.",
  bio: [
    "Placeholder bio paragraph one. Adriana is a product experience designer working with emerging technology.",
    "Placeholder bio paragraph two. She moves between designing, researching, and building intelligent systems.",
  ],
  location: "—",
  focus: ["Product design", "AI interaction", "Human-computer interaction"],
  skills: [
    { group: "Design", items: ["Product design", "Interaction design", "Prototyping", "Design systems"] },
    { group: "Research", items: ["User research", "Synthesis", "Usability", "Human–AI interaction"] },
    { group: "Build", items: ["TypeScript", "React / Next.js", "LLM / RAG", "Design tokens"] },
  ],
  experience: [
    {
      role: "Product Designer",
      org: "Placeholder Org",
      period: "20— – present",
      summary: "Placeholder summary of role and impact.",
    },
  ],
  education: [
    { credential: "Placeholder degree", org: "Placeholder University", period: "20— – 20—" },
  ],
  socials: [
    { label: "Email", href: "mailto:hello@example.com" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ],
  resumeUrl: undefined,
  contactEmail: "hello@example.com",
};
