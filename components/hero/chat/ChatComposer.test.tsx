// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ChatComposer } from "./ChatComposer";
import { CHAT_COPY } from "./copy";

afterEach(cleanup);

const idle = {
  pending: false,
  emptyHint: false,
  started: false,
  onChange: vi.fn(),
  onSubmit: vi.fn(),
  onReset: vi.fn(),
};

describe("ChatComposer", () => {
  it("sends 1–4 from the focused empty field and prevents the key from typing", () => {
    const onPickDigit = vi.fn();
    render(<ChatComposer {...idle} value="" onPickDigit={onPickDigit} />);

    const input = screen.getByLabelText(CHAT_COPY.inputLabel);
    expect(input.getAttribute("id")).toBe(CHAT_COPY.inputId);

    const allowed = fireEvent.keyDown(input, { key: "1" });
    expect(allowed).toBe(false);
    expect(onPickDigit).toHaveBeenCalledWith("1");
  });

  it("lets 1 stay a character when the field already has text", () => {
    const onPickDigit = vi.fn();
    render(<ChatComposer {...idle} value="hello" onPickDigit={onPickDigit} />);

    const allowed = fireEvent.keyDown(screen.getByLabelText(CHAT_COPY.inputLabel), {
      key: "1",
    });
    expect(onPickDigit).not.toHaveBeenCalled();
    expect(allowed).toBe(true);
  });

  it("does not intercept 1–4 while a request is pending", () => {
    const onPickDigit = vi.fn();
    render(
      <ChatComposer {...idle} value="" pending onPickDigit={onPickDigit} />
    );

    fireEvent.keyDown(screen.getByLabelText(CHAT_COPY.inputLabel), { key: "2" });
    expect(onPickDigit).not.toHaveBeenCalled();
  });

  it("shows New question next to Send after a conversation has started", () => {
    render(
      <ChatComposer {...idle} value="" started onPickDigit={vi.fn()} />
    );
    expect(screen.getByRole("button", { name: CHAT_COPY.reset })).toBeDefined();
  });
});
