// Quiet section index, e.g. "01 / Selected work"
export function SectionLabel({
  index,
  label,
  className = "",
}: {
  index?: string;
  label: string;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-ink ${className}`}
    >
      {index ? `${index} / ${label}` : label}
    </p>
  );
}
