// Registration / crop marks with coordinate labels (spec §14). Decorative.
export function CornerMarks() {
  const corners = [
    { pos: "left-4 top-24 sm:left-6", label: "X:00.0", h: "border-l border-t", tx: "left-3 top-0" },
    { pos: "right-4 top-24 sm:right-6", label: "X:99.9", h: "border-r border-t", tx: "right-3 top-0 text-right" },
    { pos: "bottom-6 left-4 sm:left-6", label: "Y:99.9", h: "border-b border-l", tx: "bottom-3 left-0" },
    { pos: "bottom-6 right-4 sm:right-6", label: "Y:00.0", h: "border-b border-r", tx: "bottom-3 right-0 text-right" },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 text-accent/40">
      {corners.map((c) => (
        <div key={c.label} className={`absolute ${c.pos}`}>
          <div className={`h-4 w-4 ${c.h} border-accent/40`} />
          <span className={`absolute ${c.tx} font-mono text-[0.55rem] tracking-[0.15em] text-accent/50`}>
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
}
