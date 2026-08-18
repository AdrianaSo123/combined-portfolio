import { BOOT_LINES, type BootLine } from "../../content/boot";

// Teletype cadence — slow enough to read, irregular enough to feel serial.
export const BOOT_IDLE_MS = 420;
export const CHAR_MS = 46;
export const DOT_MS = 95;
export const AFTER_LABEL_MS = 260;
export const AFTER_DOTS_MS = 320;
export const LINE_PAUSE_MS = 340;
export const END_PAUSE_MS = 640;
export const BOOT_DOT_COLS = 28;

export type BootFrame = {
  lines: string[];
  typing: boolean;
  waiting: boolean;
  complete: boolean;
};

export function statusDots(label: string): number {
  return Math.max(6, BOOT_DOT_COLS - label.length);
}

export function formatFullLine(line: BootLine): string {
  if (line.kind === "plain") return line.text;
  return `${line.label} ${".".repeat(statusDots(line.label))} ${line.done}`;
}

export function completeBootFrame(): BootFrame {
  return {
    lines: BOOT_LINES.map(formatFullLine),
    typing: false,
    waiting: false,
    complete: true,
  };
}

// Deterministic hitch: spaces and punctuation linger; every few glyphs stall.
export function charDelay(ch: string, index: number): number {
  let ms = CHAR_MS;
  if (ch === " " || ch === "·") ms += 36;
  if (ch === "." || ch === ",") ms += 70;
  if (index % 7 === 3) ms += 48;
  if (index % 13 === 0) ms += 22;
  return ms;
}

export function typeDuration(text: string): number {
  let total = 0;
  for (let i = 0; i < text.length; i++) total += charDelay(text[i], i);
  return total;
}

export function typedCount(text: string, elapsedMs: number): number {
  let t = 0;
  for (let i = 0; i < text.length; i++) {
    t += charDelay(text[i], i);
    if (elapsedMs < t) return i;
  }
  return text.length;
}

export function dotDelay(index: number): number {
  let ms = DOT_MS;
  if (index === 0) ms += 50;
  if (index % 4 === 2) ms += 80;
  return ms;
}

export function dotsDuration(count: number): number {
  let total = 0;
  for (let i = 0; i < count; i++) total += dotDelay(i);
  return total;
}

export function dotsCount(count: number, elapsedMs: number): number {
  let t = 0;
  for (let i = 0; i < count; i++) {
    t += dotDelay(i);
    if (elapsedMs < t) return i;
  }
  return count;
}

export function lineDurationMs(line: BootLine): number {
  if (line.kind === "plain") {
    return typeDuration(line.text) + LINE_PAUSE_MS;
  }
  const dots = statusDots(line.label);
  return (
    typeDuration(line.label) +
    AFTER_LABEL_MS +
    dotsDuration(dots) +
    AFTER_DOTS_MS +
    typeDuration(` ${line.done}`) +
    LINE_PAUSE_MS
  );
}

export function bootDurationMs(): number {
  return (
    BOOT_IDLE_MS +
    BOOT_LINES.reduce((sum, line) => sum + lineDurationMs(line), 0) +
    END_PAUSE_MS
  );
}

export function bootFrame(elapsedMs: number): BootFrame {
  if (elapsedMs >= bootDurationMs()) return completeBootFrame();

  if (elapsedMs < BOOT_IDLE_MS) {
    return { lines: [""], typing: false, waiting: true, complete: false };
  }

  const local = elapsedMs - BOOT_IDLE_MS;
  const lines: string[] = [];
  let t = 0;

  for (const line of BOOT_LINES) {
    const start = t;
    t = start + lineDurationMs(line);

    if (local < start) {
      return { lines, typing: false, waiting: true, complete: false };
    }

    if (line.kind === "plain") {
      const typed = typedCount(line.text, local - start);
      lines.push(line.text.slice(0, typed));
      if (typed < line.text.length) {
        return { lines, typing: true, waiting: false, complete: false };
      }
      continue;
    }

    const dots = statusDots(line.label);
    const labelDur = typeDuration(line.label);
    const labelEnd = start + labelDur;
    const thinkEnd = labelEnd + AFTER_LABEL_MS;
    const ticksEnd = thinkEnd + dotsDuration(dots);
    const holdEnd = ticksEnd + AFTER_DOTS_MS;
    const doneWord = ` ${line.done}`;
    const doneEnd = holdEnd + typeDuration(doneWord);

    if (local < labelEnd) {
      const n = typedCount(line.label, local - start);
      lines.push(line.label.slice(0, n));
      return { lines, typing: true, waiting: false, complete: false };
    }
    if (local < thinkEnd) {
      lines.push(line.label);
      return { lines, typing: false, waiting: true, complete: false };
    }
    if (local < ticksEnd) {
      const n = dotsCount(dots, local - thinkEnd);
      lines.push(`${line.label} ${".".repeat(n)}`);
      return { lines, typing: true, waiting: false, complete: false };
    }
    if (local < holdEnd) {
      lines.push(`${line.label} ${".".repeat(dots)}`);
      return { lines, typing: false, waiting: true, complete: false };
    }
    if (local < doneEnd) {
      const n = typedCount(doneWord, local - holdEnd);
      lines.push(`${line.label} ${".".repeat(dots)}${doneWord.slice(0, n)}`);
      return { lines, typing: true, waiting: false, complete: false };
    }
    lines.push(formatFullLine(line));
  }

  return { lines, typing: false, waiting: true, complete: false };
}
