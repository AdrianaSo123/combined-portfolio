// Short authored boot for the CRT (spec §15). Terminal cadence like a
// reference log — copy is Adriana's work, not a fake OS.

export type BootLine =
  | { kind: "plain"; text: string }
  | { kind: "status"; label: string; done: string };

export const BOOT_LINES: readonly BootLine[] = [
  { kind: "plain", text: "Adriana So" },
  { kind: "status", label: "Opening selected work", done: "done" },
  { kind: "status", label: "Product · AI", done: "done" },
  { kind: "plain", text: "Grounded in the work." },
] as const;

export const BOOT_HEADER = "Guide · grounded in the work";
