import { ChatInterface } from "./ChatInterface";
import { TerminalBoot } from "./TerminalBoot";

// Dimensional old-computer monitor (spec §5) housing the terminal boot log and
// the conversational portfolio. Decorative effects are aria-hidden and
// reduced-motion safe.
export function CrtScreen() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* ambient phosphor glow behind the monitor */}
      <div
        aria-hidden="true"
        className="ambient-glow pointer-events-none absolute -inset-10 -z-10"
      />

      {/* monitor chassis */}
      <div className="flicker relative rounded-[2rem] bg-gradient-to-b from-[#26242f] via-[#1c1b26] to-[#141320] p-4 shadow-[0_50px_140px_-40px_rgba(111,95,214,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-6">
        {/* bezel */}
        <div className="rounded-[1.5rem] bg-gradient-to-b from-[#0e0e16] to-[#141320] p-3 shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] sm:p-4">
          {/* screen */}
          <div className="crt-curve crt-glow-strong crt-scanlines crt-noise relative flex min-h-[24rem] flex-col overflow-hidden bg-[radial-gradient(130%_130%_at_50%_-10%,#211d3a_0%,#0c0b14_70%)] p-5 sm:min-h-[28rem] sm:p-6">
            {/* status line */}
            <div
              className="mb-3 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--color-screen)]/60"
              aria-hidden="true"
            >
              <span>SYSTEM v2.1</span>
              <span className="flex items-center gap-1.5">
                ONLINE
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-screen)] shadow-[0_0_6px_var(--color-screen)]" />
              </span>
            </div>

            <TerminalBoot />

            <div className="mt-3 flex-1">
              <ChatInterface />
            </div>
          </div>
        </div>

        {/* chassis hardware details */}
        <div className="mt-3 flex items-center justify-between px-2" aria-hidden="true">
          <div className="flex gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-white/10" />
            <span className="h-1.5 w-3 rounded-full bg-white/10" />
            <span className="h-1.5 w-3 rounded-full bg-white/10" />
          </div>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/25">
            model AS-2026
          </span>
          <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
        </div>
      </div>

      {/* neck + base (old-computer stand) */}
      <div aria-hidden="true" className="relative mx-auto -mt-1 h-4 w-24 bg-gradient-to-b from-[#1c1b26] to-[#141320]" />
      <div
        aria-hidden="true"
        className="mx-auto h-3 w-56 rounded-b-[1.2rem] rounded-t-md bg-gradient-to-b from-[#201f2b] to-[#100f18] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]"
        style={{ clipPath: "polygon(8% 0, 92% 0, 100% 100%, 0 100%)" }}
      />
    </div>
  );
}
