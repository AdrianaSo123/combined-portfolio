// Quiet header inside the glass. Not a fake OS boot — that language belongs
// to someone else's portfolio. Decorative, hidden from the a11y tree.

export function TerminalBoot() {
  return (
    <p
      aria-hidden="true"
      className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--color-screen)]/70"
    >
      Adriana So
      <span className="mx-2 opacity-40">·</span>
      product
      <span className="mx-2 opacity-40">·</span>
      AI
      <span className="mx-2 opacity-40">·</span>
      HCI
    </p>
  );
}
