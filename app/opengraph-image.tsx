import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

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
          background: "#0d0d12",
          color: "#f4f2ea",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#b3a1ff" }}>
          [ 00 / ADRIANA SO ]
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 68, lineHeight: 1.05, maxWidth: 900 }}>
            Designer &amp; builder across product, AI, and human-computer interaction.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: "#8b8b97" }}>
          PORTFOLIO.OS — ONLINE
        </div>
      </div>
    ),
    { ...size }
  );
}
