"use client";

import { useEffect, useState } from "react";

// Very short system init (spec §15). Skipped entirely for reduced-motion.
export function BootSequence() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reduced motion skips the sequence (near-zero delay); both paths defer the
    // state update through the timer to avoid a synchronous set inside the effect.
    const delay = reduce ? 0 : 1100;
    const timer = setTimeout(() => setDone(true), delay);
    return () => clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-bg font-mono text-sm uppercase tracking-[0.2em] text-[color:var(--color-screen)]"
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="space-y-2">
        <p>INITIALIZING…</p>
        <p className="opacity-70">
          PORTFOLIO ONLINE <span className="blink">▊</span>
        </p>
      </div>
    </div>
  );
}
