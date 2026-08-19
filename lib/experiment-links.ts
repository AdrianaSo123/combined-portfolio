export function experimentLinkLabel(key: string): string {
  if (key === "demo") return "View Live System";
  if (key === "github") return "View Source";
  if (key === "notes") return "Notes";
  return key;
}
