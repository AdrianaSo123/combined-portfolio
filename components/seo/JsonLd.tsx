// Renders a JSON-LD structured-data block (spec §27). `<` is escaped so a value
// containing "</script>" can never break out of the tag.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
