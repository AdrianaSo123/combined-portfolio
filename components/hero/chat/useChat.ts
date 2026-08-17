"use client";

import { useCallback, useRef, useState } from "react";
import type { Destination } from "@/content/types";
import { askPortfolio } from "@/lib/ai/client";
import { OFFLINE_ANSWER } from "@/lib/ai/constants";
import { promptFromInput } from "./copy";

export type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "portfolio"; text: string; destinations: Destination[] };

// Owns chat state + transport, keeping the view components presentational.
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Message-id counter scoped to this hook instance so mounted chats never
  // share a sequence (a module-level counter leaked across instances/tests).
  const idCounter = useRef(0);
  const nextId = useCallback(() => `m${idCounter.current++}`, []);

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    });
  }, []);

  const send = useCallback(
    async (text: string) => {
      const resolved = promptFromInput(text);
      if (!resolved || pending) return;

      setInput("");
      setMessages((prev) => [...prev, { id: nextId(), role: "user", text: resolved }]);
      setPending(true);

      try {
        const answer = await askPortfolio(resolved);
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: "portfolio",
            text: answer.answer,
            destinations: answer.suggestedDestinations,
          },
        ]);
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error("askPortfolio failed; using offline answer", error);
        }
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
    [pending, scrollToEnd, nextId]
  );

  const reset = useCallback(() => {
    setMessages([]);
    setInput("");
    setPending(false);
  }, []);

  return {
    messages,
    input,
    setInput,
    pending,
    send,
    reset,
    listRef,
    started: messages.length > 0,
  };
}
