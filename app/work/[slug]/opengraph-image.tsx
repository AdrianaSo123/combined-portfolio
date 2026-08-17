import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const accent = project?.brand.accent ?? "#4f66ff";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0d0d12",
          color: "#f4f2ea",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: accent }}>
          {project ? `${project.index} / SELECTED WORK` : "SELECTED WORK"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 84, lineHeight: 1, maxWidth: 1000 }}>
            {project?.name ?? "Work"}
          </div>
          <div style={{ fontSize: 34, color: "#aebcff" }}>
            {project?.subtitle ?? ""}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#8b8b97" }}>
          {project ? project.disciplines.join("  ·  ").toUpperCase() : siteConfig.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
