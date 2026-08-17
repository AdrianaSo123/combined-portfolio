import { ImageResponse } from "next/og";
import { HEADLINE } from "@/content/about";
import { siteConfig } from "@/lib/site";
import { BRAND } from "@/lib/theme";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.title;

export default function OgImage() {
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
          background: BRAND.bg,
          color: BRAND.fg,
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: BRAND.accent }}>
          [ 00 / ADRIANA SO ]
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 68, lineHeight: 1.05, maxWidth: 900 }}>
            {HEADLINE}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: BRAND.muted }}>
          {siteConfig.name.toUpperCase()}
        </div>
      </div>
    ),
    { ...size }
  );
}
