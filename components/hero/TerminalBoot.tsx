// Boot-log header inside the CRT (spec §15). Inspired by classic terminal
// init sequences, rendered in our palette. Decorative — hidden from a11y tree.

const BOOT_LINES: { label: string; status: string }[] = [
  { label: "cognitive handshake", status: "OK" },
  { label: "loading identity substrate", status: "done" },
  { label: "indexing project memory", status: "done" },
  { label: "conversational layer", status: "ready" },
];

export function TerminalBoot() {
  return (
    <div
      aria-hidden="true"
      className="border-b border-[color:var(--color-screen)]/20 pb-3 font-mono text-[0.72rem] leading-relaxed text-[color:var(--color-screen)]/75"
    >
      <p className="term-line mb-2 tracking-[0.18em] text-[color:var(--color-screen)]">
        PORTFOLIO.OS <span className="opacity-50">{"// v2026.4-LTS"}</span>
      </p>
      {BOOT_LINES.map((line, i) => (
        <div
          key={line.label}
          className="term-line leader"
          style={{ animationDelay: `${180 + i * 160}ms` }}
        >
          <span className="whitespace-nowrap">
            <span className="text-[color:var(--color-screen)]/50">&gt;</span> {line.label}
          </span>
          <span className="leader-fill" />
          <span className="whitespace-nowrap uppercase text-[color:var(--color-accent)]">
            {line.status}
          </span>
        </div>
      ))}
    </div>
  );
}
