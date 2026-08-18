// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { createRef } from "react";
import { MessageList } from "./MessageList";
import type { ChatMessage } from "./useChat";

afterEach(cleanup);

describe("MessageList", () => {
  it("shows the empty-state prompt before any messages", () => {
    render(
      <MessageList messages={[]} pending={false} started={false} listRef={createRef()} />
    );
    expect(screen.getByText(/where do you want to start/i)).toBeDefined();
  });

  it("renders a portfolio answer with its destination chips", () => {
    const messages: ChatMessage[] = [
      { id: "m0", role: "user", text: "what have you shipped?" },
      {
        id: "m1",
        role: "portfolio",
        text: "I worked with Wakefern...",
        destinations: [
          { label: "WAKEFERN / SHOPRITE LPGA", href: "/work/wakefern-lpga", kind: "work" },
        ],
      },
    ];
    render(
      <MessageList messages={messages} pending={false} started listRef={createRef()} />
    );
    expect(screen.getByText(/I worked with Wakefern/)).toBeDefined();
    const link = screen.getByRole("link", { name: /wakefern \/ shoprite lpga/i });
    expect(link.getAttribute("href")).toBe("/work/wakefern-lpga");
  });
});
