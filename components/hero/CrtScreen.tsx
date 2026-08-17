import Image from "next/image";
import { ChatInterface } from "./ChatInterface";
import { TerminalBoot } from "./TerminalBoot";
import { CRT_FRAME } from "./crtFrame";

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
        <div className="crt-screen-well crt-scanlines crt-noise absolute overflow-hidden" style={CRT_FRAME.well}>
          <div className="relative z-[1] flex h-full min-h-0 flex-col px-[6%] py-[7%]">
            <TerminalBoot />
            <div className="mt-2 min-h-0 flex-1">
              <ChatInterface />
            </div>
          </div>
          <div aria-hidden="true" className="crt-glass-glare" />
        </div>

        <div className="pointer-events-none absolute inset-0">
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
