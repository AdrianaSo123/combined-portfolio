import type { RefObject } from "react";
import type { ChatMessage } from "./useChat";
import { CHAT_COPY } from "./copy";
import { DestinationChips } from "./DestinationChips";

type MessageListProps = {
  messages: ChatMessage[];
  pending: boolean;
  started: boolean;
  listRef: RefObject<HTMLDivElement | null>;
  onReset?: () => void;
};

export function MessageList({
  messages,
  pending,
  started,
  listRef,
  onReset,
}: MessageListProps) {
  return (
    <div
      ref={listRef}
      className="flex-1 overflow-y-auto pr-1 text-sm leading-relaxed"
      aria-live="polite"
    >
      {!started ? (
        <div className="text-[color:var(--color-screen)]">
          <p className="text-sm">{CHAT_COPY.emptyTitle}</p>
          <p className="mt-1 text-xs opacity-75">{CHAT_COPY.emptySubtitle}</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => (
            <li key={m.id}>
              {m.role === "user" ? (
                <p className="text-[color:var(--color-screen)]/85">
                  <span className="opacity-60">&gt; </span>
                  {m.text}
                </p>
              ) : (
                <div>
                  <p className="text-[color:var(--color-screen)]">{m.text}</p>
                  <DestinationChips destinations={m.destinations} />
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
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-3 text-[0.65rem] uppercase tracking-[0.14em] text-[color:var(--color-screen)]/70 hover:text-[color:var(--color-screen)]"
        >
          {CHAT_COPY.reset}
        </button>
      )}
    </div>
  );
}
