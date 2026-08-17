type Row = { label: string; value: string };

// Dotted-leader metadata block (spec §12): LABEL........value
export function MetaList({
  rows,
  className = "",
}: {
  rows: Row[];
  className?: string;
}) {
  return (
    <dl className={`space-y-1.5 text-[0.7rem] uppercase tracking-wider ${className}`}>
      {rows.map((r) => (
        <div key={r.label} className="leader">
          <dt className="whitespace-nowrap text-current/70">{r.label}</dt>
          <span className="leader-fill" aria-hidden="true" />
          <dd className="whitespace-nowrap font-medium">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
