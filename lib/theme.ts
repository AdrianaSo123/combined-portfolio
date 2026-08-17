// JS/TS mirror of the color tokens declared in app/globals.css. Runtime
// contexts that cannot read CSS custom properties (next/og image routes,
// inline-style fallbacks, project data defaults) import from here so a color
// change lives in one place. Keep the hex values in sync with @theme.

export const BRAND = {
  accent: "#4f66ff", // electric cornflower blue (cyberworld)
  accentDim: "#3b4fd6", // darker accent for text on light/cream surfaces
  phosphor: "#aebcff", // periwinkle CRT phosphor
  bg: "#0d0d12", // near-black hero ground
  ink: "#16141c", // near-black text on cream
  fg: "#f4f2ea", // off-white text on dark
  muted: "#8b8b97", // gray/silver secondary text
} as const;

function hexToRgb(hex: string): string {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export const BRAND_RGB = {
  accent: hexToRgb(BRAND.accent),
  accentDim: hexToRgb(BRAND.accentDim),
  phosphor: hexToRgb(BRAND.phosphor),
} as const;

export function rgba(rgb: string, alpha: number): string {
  return `rgba(${rgb}, ${alpha})`;
}
