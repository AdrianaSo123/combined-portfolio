// Thin technical rule with a mono label + coordinate, e.g. "01 / SELECTED WORK"
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
    <div
      className={`flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] ${className}`}
    >
      {index && <span className="text-accent">{index}</span>}
      <span className="opacity-70">/</span>
      <span>{label}</span>
      <span className="ml-2 h-px flex-1 bg-current opacity-20" aria-hidden="true" />
    </div>
  );
}

export function Bracket({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono">
      <span aria-hidden="true" className="opacity-50">
        [
      </span>
      {children}
      <span aria-hidden="true" className="opacity-50">
        ]
      </span>
    </span>
  );
}
