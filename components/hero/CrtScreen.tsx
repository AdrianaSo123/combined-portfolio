import Image from "next/image";
import { ChatInterface } from "./ChatInterface";
import { TerminalBoot } from "./TerminalBoot";

// Photographed CRT chassis with the live conversational portfolio composited
// into the glass. Decorative frame is aria-hidden; the chat is the content.
// Screen-well insets are percentages of the 3:2 photo.

export function CrtScreen() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div
        aria-hidden="true"
        className="ambient-glow pointer-events-none absolute -inset-8 -z-10"
      />

      <div className="relative aspect-[3/2] w-full">
        <Image
          src="/images/crt-monitor.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 42rem"
          className="pointer-events-none object-contain"
          priority
        />

        {/* live glass — covers the photo's dark screen rectangle */}
        <div
          className="crt-screen-well crt-scanlines crt-noise absolute overflow-hidden"
          style={{
            top: "16.8%",
            left: "18.6%",
            width: "62.6%",
            height: "53.4%",
          }}
        >
          <div className="relative z-[1] flex h-full min-h-0 flex-col p-3 sm:p-4">
            <TerminalBoot />
            <div className="mt-2 min-h-0 flex-1">
              <ChatInterface />
            </div>
          </div>
          <div aria-hidden="true" className="crt-glass-glare" />
        </div>
      </div>
    </div>
  );
}
