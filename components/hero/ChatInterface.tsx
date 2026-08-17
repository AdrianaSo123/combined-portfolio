"use client";

import { useEffect, useState } from "react";
import { useChat } from "./chat/useChat";
import { MessageList } from "./chat/MessageList";
import { SuggestionGrid } from "./chat/SuggestionGrid";
import { ChatComposer } from "./chat/ChatComposer";
import { promptFromInput } from "./chat/copy";

// Thin shell composing the chat subcomponents. State and transport live in
// useChat; each view piece is presentational.
export function ChatInterface() {
  const { messages, input, setInput, pending, send, reset, listRef, started } = useChat();
  const [emptyHint, setEmptyHint] = useState(false);

  const submit = () => {
    if (!promptFromInput(input)) {
      setEmptyHint(true);
      return;
    }
    setEmptyHint(false);
    void send(input);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (pending) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!/^[1-4]$/.test(e.key)) return;

      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      const inField = tag === "INPUT" || tag === "TEXTAREA";
      if (inField && target?.id !== "chat-input") return;
      // Typing inside a question: "1" is just a character.
      if (inField && input.trim() !== "") return;

      e.preventDefault();
      setEmptyHint(false);
      void send(e.key);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pending, input, send]);

  return (
    <div className="flex h-full min-h-0 flex-col font-mono text-[color:var(--color-screen)]">
      <MessageList
        messages={messages}
        pending={pending}
        started={started}
        listRef={listRef}
        onReset={started ? reset : undefined}
      />
      {!started && <SuggestionGrid onSelect={(prompt) => void send(prompt)} />}
      <ChatComposer
        value={input}
        pending={pending}
        emptyHint={emptyHint}
        onChange={(value) => {
          setEmptyHint(false);
          setInput(value);
        }}
        onSubmit={submit}
      />
    </div>
  );
}
