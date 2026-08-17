import Image from "next/image";
import { ChatInterface } from "./ChatInterface";
import { TerminalBoot } from "./TerminalBoot";
import { CRT_FRAME, wellStyle } from "./crtFrame";

// Bezel sits on top of the live glass. The PNG is a cutout (transparent
// studio + punched screen) so the hero grid shows around the chassis.

export function CrtScreen() {
  return (
    <div className="relative mx-auto w-full">
      <div
        aria-hidden="true"
        className="ambient-glow pointer-events-none absolute left-1/2 top-[38%] h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 -z-10"
      />

      <div className="relative w-full">
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

        <Image
          src={CRT_FRAME.src}
          alt=""
          width={CRT_FRAME.width}
          height={CRT_FRAME.height}
          unoptimized
          priority
          className="pointer-events-none relative z-[2] h-auto w-full bg-transparent"
          style={{ filter: `drop-shadow(0 0 36px ${CRT_FRAME.glow})` }}
        />
      </div>
    </div>
  );
}
