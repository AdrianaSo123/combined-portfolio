import type { CaseStudyPairing } from "@/content/types";

export function PairingTable({ pairing }: { pairing: CaseStudyPairing }) {
  return (
    <div
      className="mt-8 overflow-hidden border border-line-ink"
      role="table"
      aria-label={`${pairing.left} compared with ${pairing.right}`}
    >
      <div className="grid grid-cols-2 border-b border-line-ink bg-ink/[0.04]" role="row">
        <div
          className="border-r border-line-ink px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent-dim"
          role="columnheader"
        >
          {pairing.left}
        </div>
        <div
          className="px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent-dim"
          role="columnheader"
        >
          {pairing.right}
        </div>
      </div>
      {pairing.rows.map((row) => (
        <div
          key={`${row.left}-${row.right}`}
          className="grid grid-cols-2 border-b border-line-ink last:border-b-0"
          role="row"
        >
          <div
            className="border-r border-line-ink px-4 py-3 text-sm leading-relaxed text-ink/85"
            role="cell"
          >
            {row.left}
          </div>
          <div className="px-4 py-3 text-sm leading-relaxed text-ink/85" role="cell">
            {row.right}
          </div>
        </div>
      ))}
    </div>
  );
}
