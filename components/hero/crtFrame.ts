import type { CSSProperties } from "react";
import { BRAND_RGB, rgba } from "@/lib/theme";

// The photo's punched hole is jagged. The live well sits ON TOP of the
// frame and covers that hole with a smooth rounded rect, so leftover
// gray in the PNG cannot show through.

export const CRT_FRAME = {
  src: "/images/crt-frame.png",
  width: 1103,
  height: 1022,
  well: {
    left: 10.35,
    top: 13.45,
    width: 80.05,
    height: 61.1,
  },
  wellRadius: { x: "5.4%", y: "7.8%" },
  glassPad: { left: "7%", right: "9%", top: "8%", bottom: "10%" },
  glow: rgba(BRAND_RGB.accent, 0.55),
} as const;

export function wellStyle(
  well: typeof CRT_FRAME.well = CRT_FRAME.well
): CSSProperties {
  return {
    left: `${well.left}%`,
    top: `${well.top}%`,
    width: `${well.width}%`,
    height: `${well.height}%`,
    borderRadius: `${CRT_FRAME.wellRadius.x} / ${CRT_FRAME.wellRadius.y}`,
  };
}
