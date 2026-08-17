import { ChatInterface } from "./ChatInterface";
import { TerminalBoot } from "./TerminalBoot";

// Chunky vintage beige CRT computer (spec §5), rendered with a solid extruded
// body so it reads as a deep 3D box — inspired by late-90s desktop monitors.
// Decorative effects are aria-hidden and reduced-motion safe.

const BODY_LIGHT = "#efe9db";
const BODY_MID = "#ddd2ba";
const BODY_DEEP = "#c6b89d";
const EXTRUDE = "#b3a68b"; // color of the receding side/top faces
const DEPTH = 16; // shared extrusion depth so every part reads as one solid box

const BODY_FILL = `linear-gradient(150deg, ${BODY_LIGHT} 0%, ${BODY_MID} 48%, ${BODY_DEEP} 100%)`;

// A solid 3D extrusion toward the lower-right, built by stacking 1px offset
// shadows. Shared by every part of the unit so their depth stays consistent.
function extrude(depth: number = DEPTH): string {
  const layers: string[] = [];
  for (let i = 1; i <= depth; i++) layers.push(`${i}px ${i}px 0 ${EXTRUDE}`);
  return layers.join(", ");
}

const BODY_SHADOW = [
  extrude(),
  "0 60px 120px -30px rgba(111,95,214,0.45)", // phosphor glow
  "0 44px 60px -30px rgba(0,0,0,0.7)", // ground shadow
  "inset 0 3px 0 rgba(255,255,255,0.6)", // top highlight
  "inset -10px -14px 26px rgba(0,0,0,0.22)", // interior falloff
].join(", ");

export function CrtScreen() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* ambient phosphor glow behind the monitor */}
      <div
        aria-hidden="true"
        className="ambient-glow pointer-events-none absolute -inset-10 -z-10"
      />

      {/* monitor body — chunky beige plastic with a thick bottom chin */}
      <div
        className="flicker relative rounded-[1.5rem] px-6 pb-5 pt-6 sm:px-7 sm:pt-7"
        style={{ background: BODY_FILL, boxShadow: BODY_SHADOW }}
      >
        {/* thick beveled bezel with a deep bottom chin (holds branding + controls) */}
        <div
          className="rounded-[1.1rem] p-4 pb-3 sm:p-5 sm:pb-4"
          style={{
            background: `linear-gradient(150deg, ${BODY_MID} 0%, ${BODY_DEEP} 100%)`,
            boxShadow:
              "inset 0 4px 10px rgba(0,0,0,0.35), inset 0 -3px 6px rgba(255,255,255,0.4), inset 3px 0 6px rgba(255,255,255,0.25), inset -4px 0 8px rgba(0,0,0,0.25)",
          }}
        >
          {/* dark inner frame around the glass */}
          <div className="rounded-[0.7rem] bg-[#120f18] p-3 shadow-[inset_0_3px_10px_rgba(0,0,0,0.85)]">
            {/* glowing curved screen (4:3-ish landscape like a real CRT) */}
            <div className="crt-curve crt-glow-strong crt-scanlines crt-noise relative flex min-h-[19rem] flex-col overflow-hidden bg-[radial-gradient(130%_130%_at_50%_-10%,#221d3c_0%,#0b0a12_72%)] p-5 sm:min-h-[22rem]">
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

          {/* chin: branding + controls sit on the thick bottom bezel */}
          <div className="mt-3.5 flex items-center justify-between px-1" aria-hidden="true">
            <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#5f5645]">
              Adriana&nbsp;So
            </span>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <span className="h-1.5 w-5 rounded-full bg-black/20 shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]" />
                <span className="h-1.5 w-5 rounded-full bg-black/20 shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]" />
                <span className="h-1.5 w-5 rounded-full bg-black/20 shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]" />
              </div>
              <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]" />
            </div>
          </div>
        </div>
      </div>

      {/* chunky neck */}
      <div
        aria-hidden="true"
        className="relative z-[-1] mx-auto h-7 w-40 rounded-b-lg"
        style={{ background: BODY_FILL, boxShadow: extrude() }}
      />
      {/* wide splayed base */}
      <div
        aria-hidden="true"
        className="mx-auto h-5 w-72 rounded-b-2xl"
        style={{
          background: BODY_FILL,
          clipPath: "polygon(8% 0, 92% 0, 100% 100%, 0 100%)",
          boxShadow: extrude() + ", 0 26px 40px -22px rgba(0,0,0,0.85)",
        }}
      />

      {/* stylized keyboard */}
      <Keyboard />
    </div>
  );
}

function Keyboard() {
  const rows = [13, 13, 12, 11];
  const KEY =
    "h-4 rounded-[3px] bg-[#e7dfcd] shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.5)]";
  return (
    <div
      aria-hidden="true"
      className="mx-auto mt-8 hidden max-w-md rounded-xl p-3 sm:block"
      style={{
        background: BODY_FILL,
        boxShadow: [
          extrude(),
          "0 30px 44px -26px rgba(0,0,0,0.8)",
          "inset 0 2px 0 rgba(255,255,255,0.5)",
          "inset 0 -6px 14px rgba(0,0,0,0.16)",
        ].join(", "),
      }}
    >
      <div className="space-y-1.5">
        {rows.map((count, r) => (
          <div key={r} className="flex justify-center gap-1.5">
            {Array.from({ length: count }).map((_, k) => (
              <span key={k} className={`flex-1 ${KEY}`} />
            ))}
          </div>
        ))}
        <div className="flex justify-center gap-1.5">
          <span className={`w-10 ${KEY}`} />
          <span className={`flex-[3] ${KEY}`} />
          <span className={`w-10 ${KEY}`} />
        </div>
      </div>
    </div>
  );
}
