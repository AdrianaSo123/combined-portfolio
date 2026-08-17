import { ChatInterface } from "./ChatInterface";
import { TerminalBoot } from "./TerminalBoot";

// Vintage beige CRT computer (spec §5) housing the terminal boot log and the
// conversational portfolio — inspired by a late-90s desktop monitor. Decorative
// effects are aria-hidden and reduced-motion safe.

const BEIGE_BODY =
  "linear-gradient(158deg, #efe9db 0%, #e2d8c2 42%, #cabfa4 100%)";
const BEIGE_EDGE =
  "linear-gradient(158deg, #e6dfce 0%, #d3c8af 100%)";

export function CrtScreen() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* ambient phosphor glow behind the monitor */}
      <div
        aria-hidden="true"
        className="ambient-glow pointer-events-none absolute -inset-10 -z-10"
      />

      {/* monitor body (beige plastic) */}
      <div
        className="flicker relative rounded-[2.4rem] p-5 shadow-[0_50px_130px_-40px_rgba(111,95,214,0.5),0_20px_40px_-20px_rgba(0,0,0,0.7),inset_0_2px_0_rgba(255,255,255,0.5),inset_0_-8px_20px_rgba(0,0,0,0.18)] sm:p-7"
        style={{ background: BEIGE_BODY }}
      >
        {/* recessed screen bezel */}
        <div
          className="rounded-[1.7rem] p-3 shadow-[inset_0_3px_10px_rgba(0,0,0,0.35),inset_0_-2px_4px_rgba(255,255,255,0.35)] sm:p-4"
          style={{ background: BEIGE_EDGE }}
        >
          {/* dark inner frame around the glass */}
          <div className="rounded-[1.35rem] bg-[#141019] p-2.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] sm:p-3">
            {/* glowing screen */}
            <div className="crt-curve crt-glow-strong crt-scanlines crt-noise relative flex min-h-[23rem] flex-col overflow-hidden bg-[radial-gradient(130%_130%_at_50%_-10%,#221d3c_0%,#0b0a12_72%)] p-5 sm:min-h-[27rem] sm:p-6">
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
        </div>

        {/* control strip below the glass */}
        <div className="mt-4 flex items-center justify-between px-2" aria-hidden="true">
          <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#6f6552]">
            Adriana&nbsp;So
          </span>
          <div className="flex items-center gap-3">
            {/* vents */}
            <div className="flex gap-1">
              <span className="h-1 w-5 rounded-full bg-black/15" />
              <span className="h-1 w-5 rounded-full bg-black/15" />
              <span className="h-1 w-5 rounded-full bg-black/15" />
            </div>
            {/* power LED */}
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
            {/* power button */}
            <span className="h-3.5 w-6 rounded-[3px] bg-black/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]" />
          </div>
        </div>
      </div>

      {/* neck */}
      <div
        aria-hidden="true"
        className="relative mx-auto -mt-0.5 h-5 w-28"
        style={{ background: BEIGE_EDGE }}
      />
      {/* base */}
      <div
        aria-hidden="true"
        className="mx-auto h-4 w-64 rounded-b-[1.4rem] shadow-[0_24px_40px_-22px_rgba(0,0,0,0.85)]"
        style={{ background: BEIGE_BODY, clipPath: "polygon(6% 0, 94% 0, 100% 100%, 0 100%)" }}
      />

      {/* stylized keyboard */}
      <Keyboard />
    </div>
  );
}

function Keyboard() {
  const rows = [13, 13, 12, 11];
  return (
    <div
      aria-hidden="true"
      className="mx-auto mt-6 hidden max-w-md rounded-xl p-3 shadow-[0_30px_50px_-30px_rgba(0,0,0,0.8),inset_0_2px_0_rgba(255,255,255,0.45),inset_0_-6px_14px_rgba(0,0,0,0.16)] sm:block"
      style={{ background: BEIGE_BODY }}
    >
      <div className="space-y-1.5">
        {rows.map((count, r) => (
          <div key={r} className="flex justify-center gap-1.5">
            {Array.from({ length: count }).map((_, k) => (
              <span
                key={k}
                className="h-3.5 flex-1 rounded-[3px] bg-[#e7dfcd] shadow-[inset_0_-2px_2px_rgba(0,0,0,0.18),0_1px_0_rgba(255,255,255,0.5)]"
              />
            ))}
          </div>
        ))}
        {/* spacebar row */}
        <div className="flex justify-center gap-1.5">
          <span className="h-3.5 w-10 rounded-[3px] bg-[#e7dfcd] shadow-[inset_0_-2px_2px_rgba(0,0,0,0.18)]" />
          <span className="h-3.5 flex-[3] rounded-[3px] bg-[#e7dfcd] shadow-[inset_0_-2px_2px_rgba(0,0,0,0.18)]" />
          <span className="h-3.5 w-10 rounded-[3px] bg-[#e7dfcd] shadow-[inset_0_-2px_2px_rgba(0,0,0,0.18)]" />
        </div>
      </div>
    </div>
  );
}
