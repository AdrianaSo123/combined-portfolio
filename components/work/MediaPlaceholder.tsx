import Image from "next/image";
import type { MediaRef } from "@/content/types";

export function liveMedia(items?: MediaRef[]): MediaRef[] {
  return (items ?? []).filter((item) => Boolean(item.src));
}

export function Media({
  media,
  ratio = "16 / 10",
  className = "",
  sizes = "(max-width: 768px) 100vw, 66vw",
  priority = false,
  fit = "cover",
}: {
  media?: MediaRef;
  label?: string;
  ratio?: string;
  accent?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  if (!media?.src) return null;

  return (
    <div
      className={`relative overflow-hidden rounded-sm ${fit === "contain" ? "bg-cream-deep" : ""} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        style={{
          transform: media.zoom ? `scale(${media.zoom})` : undefined,
          transformOrigin: media.objectPosition ?? "center center",
        }}
        className={fit === "contain" ? "object-contain p-3 sm:p-5" : "object-cover"}
      />
    </div>
  );
}
