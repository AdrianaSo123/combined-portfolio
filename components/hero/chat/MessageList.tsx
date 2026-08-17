import type { RefObject } from "react";
import type { ChatMessage } from "./useChat";
import { CHAT_COPY } from "./copy";
import { DestinationChips } from "./DestinationChips";

type MessageListProps = {
  messages: ChatMessage[];
  pending: boolean;
  started: boolean;
  listRef: RefObject<HTMLDivElement | null>;
};

export function MessageList({ messages, pending, started, listRef }: MessageListProps) {
  return (
    <div
      ref={listRef}
      className="flex-1 overflow-y-auto pr-1 text-sm leading-relaxed"
      aria-live="polite"
    >
      {!started ? (
        <div>
          <p className="text-base text-[color:var(--color-fg)]">{CHAT_COPY.emptyTitle}</p>
          <p className="mt-1 text-xs opacity-70">{CHAT_COPY.emptySubtitle}</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {messages.map((m) => (
            <li key={m.id}>
              {m.role === "user" ? (
                <p className="text-[color:var(--color-fg)]">
                  <span className="opacity-50">&gt; </span>
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
    </div>
  );
}
