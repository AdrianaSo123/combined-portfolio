import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { routes } from "@/lib/routes";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [routes.home, routes.experiments, routes.about].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${siteConfig.url}${routes.work(p.slug)}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...projectRoutes];
}
