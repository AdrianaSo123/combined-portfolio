"use client";

import { useEffect, useState } from "react";
import { bootFrame, completeBootFrame, type BootFrame } from "./bootFrame";

type TerminalBootProps = {
  ready: boolean;
  onComplete: () => void;
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

// Decorative boot log. Hidden from the a11y tree — the chat is the real UI.

export function TerminalBoot({ ready, onComplete }: TerminalBootProps) {
  const reduced = usePrefersReducedMotion();
  const [frame, setFrame] = useState<BootFrame>(() =>
    ready ? completeBootFrame() : { lines: [""], typing: false, waiting: true, complete: false }
  );

  useEffect(() => {
    if (ready || reduced) {
      setFrame(completeBootFrame());
      onComplete();
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const next = bootFrame(now - start);
      setFrame(next);
      if (next.complete) {
        onComplete();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, reduced, onComplete]);

  const view = ready ? completeBootFrame() : frame;
  const showCursor = !ready && (view.typing || view.waiting);

  return (
    <div
      aria-hidden="true"
      className={`font-mono text-[0.68rem] leading-[1.65] tracking-wide text-[color:var(--color-screen)] sm:text-xs ${
        ready ? "shrink-0 opacity-70" : "flex min-h-0 flex-1 flex-col"
      }`}
    >
      {view.lines.map((line, i) => {
        const isLast = i === view.lines.length - 1;
        return (
          <p key={i} className="whitespace-pre">
            {line}
            {isLast && showCursor ? (
              <span className={view.waiting ? "blink" : ""}>▊</span>
            ) : null}
          </p>
        );
      })}
    </div>
  );
}
