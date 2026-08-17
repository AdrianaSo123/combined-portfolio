// Single source of truth for URLs. Nothing else in the app should hardcode a
// route string.

export const routes = {
  home: "/",
  work: (slug: string) => `/work/${slug}`,
  workSection: "/#work",
  experiments: "/experiments",
  experiment: (slug: string) => `/experiments/${slug}`,
  about: "/about",
  chatApi: "/api/chat",
  mailto: (email: string) => `mailto:${email}`,
} as const;
