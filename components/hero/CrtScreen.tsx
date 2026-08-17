import { ChatInterface } from "./ChatInterface";
import { TerminalBoot } from "./TerminalBoot";

// Chunky vintage beige CRT computer (spec §5), rendered with a solid extruded
// body so it reads as a deep 3D box — inspired by late-90s desktop monitors.
// Decorative effects are aria-hidden and reduced-motion safe.

const BODY_LIGHT = "#efe9db";
const BODY_MID = "#ddd2ba";
const BODY_DEEP = "#c6b89d";
const EXTRUDE = "#b3a68b"; // color of the receding side/top faces

// Build a solid 3D extrusion toward the lower-right by stacking many 1px
// offset shadows, then add ambient depth shadow + phosphor glow.
function monitorShadow(depth: number): string {
  const layers: string[] = [];
  for (let i = 1; i <= depth; i++) {
    layers.push(`${i}px ${i}px 0 ${EXTRUDE}`);
  }
  layers.push("0 60px 120px -30px rgba(111,95,214,0.45)"); // glow
  layers.push("0 40px 60px -30px rgba(0,0,0,0.7)"); // ground shadow
  layers.push("inset 0 3px 0 rgba(255,255,255,0.55)"); // top highlight
  layers.push("inset -10px -14px 24px rgba(0,0,0,0.22)"); // interior falloff
  return layers.join(", ");
}

export function CrtScreen() {
  return (
    <div className="relative mx-auto w-full max-w-2xl pb-8 pr-8">
      {/* ambient phosphor glow behind the monitor */}
      <div
        aria-hidden="true"
        className="ambient-glow pointer-events-none absolute -inset-10 -z-10"
      />

      {/* monitor body (chunky beige plastic, extruded) */}
      <div
        className="flicker relative rounded-2xl p-7 sm:p-9"
        style={{
          background: `linear-gradient(150deg, ${BODY_LIGHT} 0%, ${BODY_MID} 48%, ${BODY_DEEP} 100%)`,
          boxShadow: monitorShadow(30),
        }}
      >
        {/* thick beveled bezel */}
        <div
          className="rounded-xl p-4 sm:p-5"
          style={{
            background: `linear-gradient(150deg, ${BODY_MID} 0%, ${BODY_DEEP} 100%)`,
            boxShadow:
              "inset 0 4px 10px rgba(0,0,0,0.35), inset 0 -3px 6px rgba(255,255,255,0.4), inset 3px 0 6px rgba(255,255,255,0.25), inset -4px 0 8px rgba(0,0,0,0.25)",
          }}
        >
          {/* dark inner frame around the glass */}
          <div className="rounded-lg bg-[#120f18] p-3 shadow-[inset_0_3px_10px_rgba(0,0,0,0.85)] sm:p-3.5">
            {/* glowing curved screen */}
            <div className="crt-curve crt-glow-strong crt-scanlines crt-noise relative flex min-h-[22rem] flex-col overflow-hidden bg-[radial-gradient(130%_130%_at_50%_-10%,#221d3c_0%,#0b0a12_72%)] p-5 sm:min-h-[26rem] sm:p-6">
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
        <div className="mt-5 flex items-center justify-between px-1" aria-hidden="true">
          <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.32em] text-[#6f6552]">
            Adriana&nbsp;So
          </span>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <span className="h-1.5 w-6 rounded-full bg-black/15" />
              <span className="h-1.5 w-6 rounded-full bg-black/15" />
              <span className="h-1.5 w-6 rounded-full bg-black/15" />
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]" />
            <span className="h-4 w-7 rounded-[3px] bg-black/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.35),inset_0_-1px_0_rgba(255,255,255,0.4)]" />
          </div>
        </div>
      </div>

      {/* chunky neck */}
      <div
        aria-hidden="true"
        className="relative mx-auto -mt-1 h-6 w-32 rounded-b-md"
        style={{
          background: `linear-gradient(150deg, ${BODY_MID}, ${BODY_DEEP})`,
          boxShadow: "8px 8px 0 " + EXTRUDE,
        }}
      />
      {/* wide base */}
      <div
        aria-hidden="true"
        className="mx-auto h-5 w-72 rounded-b-2xl"
        style={{
          background: `linear-gradient(150deg, ${BODY_LIGHT}, ${BODY_DEEP})`,
          clipPath: "polygon(7% 0, 93% 0, 100% 100%, 0 100%)",
          boxShadow: "0 26px 40px -22px rgba(0,0,0,0.85), 8px 8px 0 " + EXTRUDE,
        }}
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
      className="mx-auto mt-7 hidden max-w-md rounded-xl p-3 sm:block"
      style={{
        background: `linear-gradient(150deg, ${BODY_LIGHT}, ${BODY_DEEP})`,
        boxShadow:
          "6px 6px 0 " + EXTRUDE +
          ", 0 30px 44px -26px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -6px 14px rgba(0,0,0,0.16)",
      }}
    >
      <div className="space-y-1.5">
        {rows.map((count, r) => (
          <div key={r} className="flex justify-center gap-1.5">
            {Array.from({ length: count }).map((_, k) => (
              <span
                key={k}
                className="h-4 flex-1 rounded-[3px] bg-[#e7dfcd] shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.5)]"
              />
            ))}
          </div>
        ))}
        <div className="flex justify-center gap-1.5">
          <span className="h-4 w-10 rounded-[3px] bg-[#e7dfcd] shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)]" />
          <span className="h-4 flex-[3] rounded-[3px] bg-[#e7dfcd] shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)]" />
          <span className="h-4 w-10 rounded-[3px] bg-[#e7dfcd] shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)]" />
        </div>
      </div>
    </div>
  );
}
