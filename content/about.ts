import type { About } from "./types";

// Positioning line (spec §3). Hero, About, metadata, OG, and the KB about
// answer all import this so a rewrite cannot drift.
export const HEADLINE =
  "Designer and builder working across product and AI.";

// Hero stacks these as separate lines. Joined with spaces they are HEADLINE.
export const HERO_KICKER = "Product · AI";
export const HERO_LINES = [
  "Designer and builder",
  "working across product and AI.",
] as const;
export const HERO_KEYWORDS = ["product", "AI"] as const;

// Placeholder about/résumé (spec §24.4). Final headline copy TBD by Adriana.
export const about: About = {
  headline: HEADLINE,
  greeting: "hey there, i'm adriana.",
  portrait: {
    src: "/images/adriana.png",
    alt: "Adriana So at a courtyard fountain",
    width: 768,
    height: 1024,
  },
  bio: [
    "Placeholder bio paragraph one. Adriana is a product experience designer working with emerging technology.",
    "Placeholder bio paragraph two. She moves between designing, researching, and building intelligent systems.",
  ],
  // Story copy — empty sections stay hidden until you paste text.
  // snapshot = Who I am · origin = Why UX / AI
  // philosophy: [{ hook: "One-line belief.", body: ["The paragraph under it."] }]
  snapshot: [],
  origin: [],
  philosophy: [],
  prior: [],
  community: [],
  offline: [],
  location: "—",
  focus: ["Product design", "AI interaction"],
  skills: [
    { group: "Design", items: ["Product design", "Interaction design", "Prototyping", "Design systems"] },
    { group: "Research", items: ["User research", "Synthesis", "Usability", "Human–AI interaction"] },
    { group: "Build", items: ["TypeScript", "React / Next.js", "LLM / RAG", "Design tokens"] },
  ],
  experience: [
    {
      role: "Research Assistant",
      org: "Skyscraper Games",
      location: "Newark",
      period: "February 2026 – Present",
    },
    {
      role: "UX Designer",
      org: "Wakefern Food Corp",
      location: "Newark",
      period: "February 2026 – May 2026",
    },
    {
      role: "Research Assistant",
      org: "Social Interaction Lab",
      location: "Newark",
      period: "September 2024 – December 2024",
    },
  ],
  education: [
    { credential: "Placeholder degree", org: "Placeholder University", period: "20— – 20—" },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/adriana-so-24071219b" },
    { label: "GitHub", href: "https://github.com/AdrianaSo123" },
  ],
  resumeUrl: undefined,
  contactEmail: "hello@example.com",
};
