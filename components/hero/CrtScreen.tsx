import Image from "next/image";
import { CrtLive } from "./CrtLive";
import { CRT_FRAME, wellStyle } from "./crtFrame";


// Frame first (sizes the box). Live glass sits on top and covers the
// photograph's rough punch so leftover bezel gray cannot show.

export function CrtScreen() {
  return (
    <div className="relative mx-auto w-full max-w-[min(26rem,78svh)] sm:max-w-[min(34rem,76svh)] lg:max-w-[min(42rem,74svh)]">
      <div
        aria-hidden="true"
        className="ambient-glow pointer-events-none absolute left-1/2 top-[40%] h-[85%] w-[110%] -translate-x-1/2 -translate-y-1/2 -z-10"
      />

      <div className="relative w-full">
        <Image
          src={CRT_FRAME.src}
          alt=""
          width={CRT_FRAME.width}
          height={CRT_FRAME.height}
          sizes="(min-width: 1024px) min(42rem, 74svh), (min-width: 640px) min(34rem, 76svh), min(26rem, 78svh)"
          unoptimized
          priority
          className="pointer-events-none relative z-[1] h-auto w-full bg-transparent"
          style={{
            filter: `drop-shadow(0 0 28px ${CRT_FRAME.glow}) drop-shadow(0 0 64px ${CRT_FRAME.glow})`,
          }}
        />

        <div
          className="crt-screen-well crt-scanlines absolute z-[2] overflow-hidden"
          style={wellStyle()}
        >
          <div
            className="relative z-[1] flex h-full min-h-0 flex-col overflow-y-auto"
            style={{
              paddingLeft: CRT_FRAME.glassPad.left,
              paddingRight: CRT_FRAME.glassPad.right,
              paddingTop: CRT_FRAME.glassPad.top,
              paddingBottom: CRT_FRAME.glassPad.bottom,
            }}
          >
            <CrtLive />
          </div>
          <div aria-hidden="true" className="crt-glass-glare" />
        </div>
      </div>
    </div>
  );
}
