// Placeholder detection so unfinished content never ships as a fake destination.

export function isPlaceholderText(value: string): boolean {
  return /placeholder/i.test(value) || value.trim() === "—" || value.trim() === "#";
}

export function isPlaceholderHref(href: string): boolean {
  const t = href.trim();
  return t === "" || t === "#" || /example\.com/i.test(t) || isPlaceholderText(t);
}
