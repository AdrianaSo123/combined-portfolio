import Image from "next/image";
import { ChatInterface } from "./ChatInterface";
import { TerminalBoot } from "./TerminalBoot";
import { CRT_FRAME, wellStyle } from "./crtFrame";

// Bezel sits on top of the live glass. The PNG has a punched-out screen, so
// the inner lip of the plastic crops the UI instead of a guessed rectangle.

export function CrtScreen() {
  return (
    <div className="relative mx-auto w-full">
      <div
        aria-hidden="true"
        className="ambient-glow pointer-events-none absolute -inset-8 -z-10"
      />

      <div
        className="relative w-full"
        style={{ aspectRatio: `${CRT_FRAME.width} / ${CRT_FRAME.height}` }}
      >
        <div className="crt-screen-well crt-scanlines absolute overflow-hidden" style={wellStyle()}>
          <div
            className="relative z-[1] flex h-full min-h-0 flex-col"
            style={{
              paddingInline: CRT_FRAME.glassPad.x,
              paddingBlock: CRT_FRAME.glassPad.y,
            }}
          >
            <TerminalBoot />
            <div className="mt-2 min-h-0 flex-1">
              <ChatInterface />
            </div>
          </div>
          <div aria-hidden="true" className="crt-glass-glare" />
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{ filter: `drop-shadow(0 0 48px ${CRT_FRAME.glow})` }}
        >
          <Image
            src={CRT_FRAME.src}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 56rem"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
