// Content model (spec §24). All portfolio content is typed and structured so
// the UI, sitemap, and AI knowledge base derive from one source of truth.

export type MediaRef = {
  src: string;
  alt: string;
  width: number;
  height: number;
  type?: "image" | "video";
  poster?: string;
  caption?: string;
};

export type CaseStudyAnnotation = {
  heading: string;
  body: string[];
  media?: MediaRef[];
  mediaLabel?: string;
};

export type CaseStudyPairing = {
  left: string;
  right: string;
  rows: { left: string; right: string }[];
};

export type CaseStudySection = {
  kind:
    | "context"
    | "problem"
    | "role"
    | "system"
    | "design"
    | "iteration"
    | "final"
    | "outcome"
    | "custom";
  heading?: string;
  body: string[];
  media?: MediaRef[];
  annotations?: CaseStudyAnnotation[];
  pairing?: CaseStudyPairing;
  bodyAfter?: string[];
  callout?: string;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  /** Case-study H1. Use when `name` is the client or label, not the work. */
  headline?: string;
  /** Billboard kicker + spec client. e.g. "Wakefern · ShopRite LPGA Classic". */
  client?: string;
  subtitle: string;
  oneLiner: string;
  disciplines: string[];
  year: number;
  timeline?: string;
  status: "shipped" | "approved" | "prototype" | "research";
  role: string;
  demonstrates: string;
  brand: { accent: string; background?: string; foreground?: string };
  cover: MediaRef;
  gallery: MediaRef[];
  sections: CaseStudySection[];
  metrics?: { label: string; value: string }[];
  contributions?: string[];
  featured: boolean;
};

export const STATUS_LABEL: Record<Project["status"], string> = {
  shipped: "Shipped",
  approved: "Approved for production",
  prototype: "Prototype",
  research: "Research",
};

export type Experiment = {
  slug: string;
  index: string;
  name: string;
  blurb: string;
  stack: string[];
  keyDecision?: string;
  links: { demo?: string; github?: string; notes?: string };
  media?: MediaRef;
  diagram?: MediaRef;
};

export type About = {
  headline: string;
  greeting: string;
  portrait?: MediaRef;
  bio: string[];
  snapshot: string[];
  origin: string[];
  philosophy: { hook: string; body: string[] }[];
  prior: string[];
  community: string[];
  offline: string[];
  location?: string;
  focus: string[];
  skills: { group: string; items: string[] }[];
  experience: { role: string; org: string; period: string; location?: string; summary?: string }[];
  education?: { credential: string; org: string; period: string }[];
  socials: { label: string; href: string }[];
  resumeUrl?: string;
  contactEmail: string;
};

export type Destination = {
  label: string;
  href: string;
  kind: "work" | "experiment" | "about" | "resume";
};
