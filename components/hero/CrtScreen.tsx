import { ChatInterface } from "./ChatInterface";

// Dimensional CRT/monitor object (spec §5) housing the conversational
// portfolio. Decorative effects are aria-hidden and reduced-motion safe.
export function CrtScreen() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* monitor shell */}
      <div className="flicker relative rounded-[1.75rem] bg-gradient-to-b from-[#2a2836] to-[#181722] p-4 shadow-[0_40px_120px_-40px_rgba(111,95,214,0.5)] sm:p-6">
        {/* bezel */}
        <div className="rounded-[1.25rem] bg-[#101018] p-3 sm:p-4">
          {/* screen */}
          <div className="crt-glow crt-scanlines crt-noise relative min-h-[22rem] overflow-hidden rounded-[0.9rem] bg-[radial-gradient(120%_120%_at_50%_0%,#1b1930_0%,#0c0b14_100%)] p-5 sm:min-h-[26rem] sm:p-6">
            {/* screen chrome line */}
            <div
              className="mb-3 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--color-screen)]/70"
              aria-hidden="true"
            >
              <span>PORTFOLIO.OS</span>
              <span className="flex items-center gap-1">
                ONLINE <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-screen)]" />
              </span>
            </div>
            <div className="h-[19rem] sm:h-[22rem]">
              <ChatInterface />
            </div>
          </div>
        </div>
        {/* hardware details */}
        <div className="mt-3 flex items-center justify-between px-2" aria-hidden="true">
          <div className="flex gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-white/10" />
            <span className="h-1.5 w-3 rounded-full bg-white/10" />
          </div>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/25">
            model AS-2026
          </span>
          <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent)]/70" />
        </div>
      </div>
    </div>
  );
}
