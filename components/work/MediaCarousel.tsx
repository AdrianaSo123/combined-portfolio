"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import type { MediaRef } from "@/content/types";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MediaCarousel({
  items,
  label,
  sizes = "(max-width: 1024px) 100vw, 58vw",
}: {
  items: MediaRef[];
  label: string;
  sizes?: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const landscape = items[0].width >= items[0].height;
  const caption = items[index]?.caption ?? items[index]?.alt ?? "";

  const syncIndex = useCallback(() => {
    const el = scroller.current;
    if (!el || el.clientWidth === 0) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    setIndex(Math.min(items.length - 1, Math.max(0, next)));
  }, [items.length]);

  const goTo = useCallback(
    (next: number) => {
      const el = scroller.current;
      if (!el) return;
      const clamped = (next + items.length) % items.length;
      el.scrollTo({
        left: clamped * el.clientWidth,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
      setIndex(clamped);
    },
    [items.length],
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="min-w-0">
      <div
        ref={scroller}
        className="flex w-full min-w-0 snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-sm bg-cream-deep [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={syncIndex}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(index + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(index - 1);
          }
        }}
      >
        {items.map((item, i) => (
          <figure
            key={item.src}
            className="relative w-full min-w-full max-w-full shrink-0 grow-0 basis-full overflow-hidden snap-start"
            style={{
              height: landscape ? "min(22rem, 42vw)" : "min(34rem, 72vw)",
            }}
            aria-hidden={i !== index}
          >
            <div className="absolute inset-[6%]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={sizes}
                priority={i === 0}
                className="object-contain object-center"
              />
            </div>
          </figure>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          className="font-mono text-xs uppercase tracking-[0.18em] text-ink hover:underline"
          aria-label="Previous screen"
        >
          ←
        </button>
        <p className="min-w-0 flex-1 text-center font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-ink">
          <span className="sr-only">
            Slide {index + 1} of {items.length}:{" "}
          </span>
          {caption}
        </p>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          className="font-mono text-xs uppercase tracking-[0.18em] text-ink hover:underline"
          aria-label="Next screen"
        >
          →
        </button>
      </div>

      <div className="mt-2 flex justify-center gap-1.5">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            aria-current={i === index ? "true" : undefined}
            aria-label={`Show ${item.caption ?? `screen ${i + 1}`}`}
            onClick={() => goTo(i)}
            className={`h-1.5 w-1.5 rounded-full ${
              i === index ? "bg-ink" : "bg-ink/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
