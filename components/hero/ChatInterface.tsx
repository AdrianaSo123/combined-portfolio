"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Destination } from "@/content/types";
import { askPortfolio } from "@/lib/ai/client";
import { MAX_MESSAGE_LENGTH } from "@/lib/ai/constants";
import { routes } from "@/lib/routes";

type Message =
  | { role: "user"; text: string }
  | { role: "portfolio"; text: string; destinations: Destination[] };

const SUGGESTIONS = [
  "What have you shipped?",
  "Show me your product design work.",
  "What are you researching about AI?",
  "Show me something technical.",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setPending(true);
    try {
      const data = await askPortfolio(trimmed);
      setMessages((m) => [
        ...m,
        {
          role: "portfolio",
          text: data.answer,
          destinations: data.suggestedDestinations,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "portfolio",
          text: "The assistant is offline right now — explore my work below.",
          destinations: [
            { label: "SELECTED WORK", href: routes.workSection, kind: "work" },
            { label: "ABOUT", href: routes.about, kind: "about" },
          ],
        },
      ]);
    } finally {
      setPending(false);
      requestAnimationFrame(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
      });
    }
  }

  const started = messages.length > 0;

  return (
    <div className="flex h-full flex-col font-mono text-[color:var(--color-screen)]">
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto pr-1 text-sm leading-relaxed"
        aria-live="polite"
      >
        {!started ? (
          <div>
            <p className="text-base text-[color:var(--color-fg)]">
              What would you like to explore?
            </p>
            <p className="mt-1 text-xs opacity-70">
              Portfolio guide · grounded in Adriana&apos;s work
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {messages.map((m, i) => (
              <li key={i}>
                {m.role === "user" ? (
                  <p className="text-[color:var(--color-fg)]">
                    <span className="opacity-50">&gt; </span>
                    {m.text}
                  </p>
                ) : (
                  <div>
                    <p className="text-[color:var(--color-screen)]">{m.text}</p>
                    {m.destinations.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {m.destinations.map((d) => (
                          <li key={d.href + d.label}>
                            <Link
                              href={d.href}
                              className="inline-block rounded-sm border border-[color:var(--color-screen)]/40 px-2 py-1 text-[0.7rem] uppercase tracking-[0.12em] text-[color:var(--color-fg)] transition-colors hover:bg-[color:var(--color-screen)]/15"
                            >
                              {d.label} →
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
            {pending && (
              <li className="opacity-70">
                <span className="blink">▊</span>
              </li>
            )}
          </ul>
        )}
      </div>

      {!started && (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {SUGGESTIONS.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => send(s)}
                className="w-full rounded-sm border border-[color:var(--color-screen)]/30 px-3 py-2 text-left text-xs text-[color:var(--color-fg)] transition-colors hover:bg-[color:var(--color-screen)]/12"
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-4 flex items-center gap-2 border-t border-[color:var(--color-screen)]/25 pt-3"
      >
        <label htmlFor="chat-input" className="sr-only">
          Ask something about Adriana&apos;s portfolio
        </label>
        <span aria-hidden="true" className="opacity-60">
          &gt;
        </span>
        <input
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          maxLength={MAX_MESSAGE_LENGTH}
          autoComplete="off"
          className="flex-1 bg-transparent text-sm text-[color:var(--color-fg)] placeholder:text-[color:var(--color-screen)]/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="text-xs uppercase tracking-[0.12em] text-[color:var(--color-fg)] opacity-80 hover:opacity-100 disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
