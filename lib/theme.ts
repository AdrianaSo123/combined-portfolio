// JS/TS mirror of the color tokens declared in app/globals.css. Runtime
// contexts that cannot read CSS custom properties (next/og image routes,
// inline-style fallbacks, project data defaults) import from here so a color
// change lives in one place. Keep in sync with the @theme block in globals.css.
export const BRAND = {
  accent: "#4f66ff", // electric cornflower blue (cyberworld)
  accentDim: "#3b4fd6", // darker accent for text on light/cream surfaces
  phosphor: "#aebcff", // periwinkle CRT phosphor
  bg: "#0d0d12", // near-black hero ground
  ink: "#16141c", // near-black text on cream
} as const;
