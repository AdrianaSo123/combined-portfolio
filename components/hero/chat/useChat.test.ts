// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useChat } from "./useChat";
import { OFFLINE_ANSWER } from "../../../lib/ai/constants";

const askPortfolio = vi.hoisted(() => vi.fn());
vi.mock("../../../lib/ai/client", () => ({ askPortfolio }));

const answer = {
  answer: "Here is what I know.",
  suggestedDestinations: [{ label: "ABOUT", href: "/about", kind: "about" as const }],
  citations: ["about-1"],
  fallback: false,
};

beforeEach(() => {
  askPortfolio.mockReset();
  // jsdom lacks scrollTo on elements; the hook calls it after each send.
  Element.prototype.scrollTo = vi.fn();
});

afterEach(() => vi.restoreAllMocks());

describe("useChat", () => {
  it("ignores empty or whitespace-only input", async () => {
    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.send("   ");
    });

    expect(askPortfolio).not.toHaveBeenCalled();
    expect(result.current.messages).toHaveLength(0);
    expect(result.current.started).toBe(false);
    expect(result.current.emptyHint).toBe(true);
  });

  it("clears emptyHint when the user types", async () => {
    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.send("");
    });
    expect(result.current.emptyHint).toBe(true);

    act(() => {
      result.current.setInput("h");
    });
    expect(result.current.emptyHint).toBe(false);
  });

  it("appends the user message then the portfolio answer", async () => {
    askPortfolio.mockResolvedValue(answer);
    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.send("  what do you do?  ");
    });

    expect(askPortfolio).toHaveBeenCalledWith("what do you do?"); // trimmed
    expect(result.current.messages).toEqual([
      { id: expect.any(String), role: "user", text: "what do you do?" },
      {
        id: expect.any(String),
        role: "portfolio",
        text: answer.answer,
        destinations: answer.suggestedDestinations,
      },
    ]);
    expect(result.current.started).toBe(true);
    expect(result.current.pending).toBe(false);
  });

  it("falls back to the offline answer when the request rejects", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    askPortfolio.mockRejectedValue(new Error("network down"));
    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.send("hi");
    });

    const last = result.current.messages.at(-1);
    expect(last).toMatchObject({
      role: "portfolio",
      text: OFFLINE_ANSWER.answer,
      destinations: OFFLINE_ANSWER.suggestedDestinations,
    });
    expect(result.current.pending).toBe(false);
  });

  it("blocks re-entry while a request is pending", async () => {
    let resolve!: (value: typeof answer) => void;
    askPortfolio.mockReturnValue(new Promise((r) => (resolve = r)));
    const { result } = renderHook(() => useChat());

    // First send leaves the hook pending (promise not yet resolved).
    act(() => {
      void result.current.send("first");
    });
    await waitFor(() => expect(result.current.pending).toBe(true));

    // Second send while pending must be a no-op.
    await act(async () => {
      await result.current.send("second");
    });
    expect(askPortfolio).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolve(answer);
    });
    await waitFor(() => expect(result.current.pending).toBe(false));
  });

  it("maps a typed 1 to the first menu prompt", async () => {
    askPortfolio.mockResolvedValue(answer);
    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.send("1");
    });

    expect(askPortfolio).toHaveBeenCalledWith("What have you shipped?");
    expect(result.current.messages[0]).toMatchObject({
      role: "user",
      text: "What have you shipped?",
    });
  });
});
