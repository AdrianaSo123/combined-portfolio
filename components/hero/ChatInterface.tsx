"use client";

import { useChat } from "./chat/useChat";
import { MessageList } from "./chat/MessageList";
import { SuggestionGrid } from "./chat/SuggestionGrid";
import { ChatComposer } from "./chat/ChatComposer";

// Thin shell composing the chat subcomponents. State and transport live in
// useChat; each view piece is presentational.
export function ChatInterface() {
  const { messages, input, setInput, pending, send, listRef, started } = useChat();

  return (
    <div className="flex h-full flex-col font-mono text-[color:var(--color-screen)]">
      <MessageList
        messages={messages}
        pending={pending}
        started={started}
        listRef={listRef}
      />
      {!started && <SuggestionGrid onSelect={send} />}
      <ChatComposer
        value={input}
        pending={pending}
        onChange={setInput}
        onSubmit={() => send(input)}
      />
    </div>
  );
}
