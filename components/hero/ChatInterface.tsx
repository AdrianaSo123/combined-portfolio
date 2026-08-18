"use client";

import { useChat } from "./chat/useChat";
import { MessageList } from "./chat/MessageList";
import { SuggestionGrid } from "./chat/SuggestionGrid";
import { ChatComposer } from "./chat/ChatComposer";

// Thin shell composing the chat subcomponents. State and transport live in
// useChat; each view piece is presentational.
export function ChatInterface() {
  const {
    messages,
    input,
    setInput,
    pending,
    emptyHint,
    send,
    reset,
    listRef,
    started,
  } = useChat();

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden font-mono text-[color:var(--color-screen)]">
      <MessageList
        messages={messages}
        pending={pending}
        started={started}
        listRef={listRef}
      />
      {!started && <SuggestionGrid onSelect={(prompt) => void send(prompt)} />}
      <ChatComposer
        value={input}
        pending={pending}
        emptyHint={emptyHint}
        started={started}
        onChange={setInput}
        onSubmit={() => void send(input)}
        onPickDigit={(key) => void send(key)}
        onReset={reset}
      />
    </div>
  );
}
