import Image from "next/image";
import type { MediaRef } from "@/content/types";
import { BRAND } from "@/lib/theme";

// Renders a real image when a src exists; otherwise a labeled placeholder panel
// so the layout is complete before media is added.
export function Media({
  media,
  label,
  ratio = "16 / 10",
  accent,
  className = "",
}: {
  media?: MediaRef;
  label: string;
  ratio?: string;
  accent?: string;
  className?: string;
}) {
  const hasImage = media && media.src;

  return (
    <div
      className={`relative overflow-hidden rounded-sm ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {hasImage ? (
        <Image
          src={media!.src}
          alt={media!.alt}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover"
        />
      ) : (
        <div
          className="crt-noise flex h-full w-full items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${accent ?? BRAND.accent}22, ${BRAND.ink}14)`,
            border: "1px solid var(--color-line-ink)",
          }}
          aria-hidden="true"
        >
          <div className="text-center font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-ink">
            <div>IMAGE</div>
            <div className="mt-1 opacity-60">{label}</div>
          </div>
        </div>
      )}
    </div>
  );
}
