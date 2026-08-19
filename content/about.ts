import type { About } from "./types";

// Positioning line (spec §3). Hero, About, metadata, OG, and the KB about
// answer all import this so a rewrite cannot drift.
export const HEADLINE =
  "UX researcher and designer focused on people, technology, and approachable AI.";

// Hero stacks these as separate lines. Joined with spaces they are HEADLINE.
export const HERO_KICKER = "Product · AI";
export const HERO_LINES = [
  "UX researcher and designer",
  "focused on people, technology, and approachable AI.",
] as const;
export const HERO_KEYWORDS = ["product", "AI"] as const;

// Placeholder about/résumé (spec §24.4). Final headline copy TBD by Adriana.
export const about: About = {
  headline: HEADLINE,
  greeting: "Hi, I'm Adriana!",
  portrait: {
    src: "/images/adriana.png",
    alt: "Adriana So at a courtyard fountain",
    width: 768,
    height: 1024,
  },
  bio: [],
  snapshot: [
    "I'm a UX researcher and designer interested in people, technology, and why we interact with things the way we do. Lately, I've been focused on making AI feel more useful and less intimidating.",
  ],
  origin: [
    "Before I knew about UX, I thought I wanted to go into law. I have always cared about social justice, and in high school, I was the leader of my school's social justice club.",
    "One of my favorite classes was public policy. My group had to identify a problem, speak with different stakeholders, and come up with our own solution. I really enjoyed learning about a problem from different perspectives instead of assuming we already knew the answer.",
    "Later, while interning at the Bergen County Commissioner's Office, I realized how much I enjoyed working with people and creating things that could help them, and eventually found UX as the intersection of psychology, research, technology, creativity, and problem-solving.",
  ],
  philosophy: [
    {
      hook: "Where AI comes in",
      body: [
        "I became interested in AI because I love building things and learning something new. Since AI is changing how people learn, work, and decide, I want to design experiences that feel approachable instead of intimidating.",
      ],
    },
  ],
  prior: [],
  community: [
    "In college, I was the Opportunities Liaison for NJIT's SIGCHI chapter, connecting students with workshops, professionals, and entry points into UX.",
  ],
  offline: [
    "Outside of work, I love collecting little trinkets, coloring, and playing Stardew Valley.",
  ],
  location: undefined,
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
  education: [],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/adriana-so-24071219b" },
    { label: "GitHub", href: "https://github.com/AdrianaSo123" },
  ],
  resumeUrl: undefined,
  contactEmail: "hello@example.com",
};
