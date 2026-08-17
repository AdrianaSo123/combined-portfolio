"use client";

import { useCallback, useRef, useState } from "react";
import type { Destination } from "@/content/types";
import { askPortfolio } from "@/lib/ai/client";
import { OFFLINE_ANSWER } from "@/lib/ai/constants";

export type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "portfolio"; text: string; destinations: Destination[] };

let messageCounter = 0;
const nextId = () => `m${messageCounter++}`;

// Owns chat state + transport (audit finding #3), keeping the view components
// presentational and testable.
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    });
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || pending) return;

      setInput("");
      setMessages((prev) => [...prev, { id: nextId(), role: "user", text: trimmed }]);
      setPending(true);

      try {
        const answer = await askPortfolio(trimmed);
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: "portfolio",
            text: answer.answer,
            destinations: answer.suggestedDestinations,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: "portfolio",
            text: OFFLINE_ANSWER.answer,
            destinations: OFFLINE_ANSWER.suggestedDestinations,
          },
        ]);
      } finally {
        setPending(false);
        scrollToEnd();
      }
    },
    [pending, scrollToEnd]
  );

  return {
    messages,
    input,
    setInput,
    pending,
    send,
    listRef,
    started: messages.length > 0,
  };
}
