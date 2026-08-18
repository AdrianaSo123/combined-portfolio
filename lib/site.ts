import { HEADLINE } from "@/content/about";

// Canonical site config (spec §27). Override in production via
// NEXT_PUBLIC_SITE_URL (e.g. https://adrianaso.com).

export const siteConfig = {
  name: "Adriana So",
  title: "Adriana So — Product · AI",
  description: HEADLINE,
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://adrianaso.com").replace(/\/$/, ""),
} as const;
