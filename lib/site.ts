// Canonical site config (spec §27). Override in production via
// NEXT_PUBLIC_SITE_URL (e.g. https://adrianaso.com).

export const siteConfig = {
  name: "Adriana So",
  title: "Adriana So — Product · AI · HCI",
  description:
    "Product experience designer working across product, AI, and human-computer interaction. Designer and builder.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://adrianaso.com").replace(/\/$/, ""),
} as const;

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
