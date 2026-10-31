"use client";

import { useEffect, useState } from "react";

const LEARNED = "language-games:shortcuts-learned";
export const SHORTCUTS_OFF = "language-games:shortcuts-off";
const SHOWN = "language-games:shortcut-tip-shown";

function typing(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
}

/** Keyboard shortcuts for a round: "1".."4" pick, "Enter" confirms. Using one marks shortcuts as learned. */
export function useShortcuts(keys: Record<string, (() => void) | undefined>) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || typing(e.target)) return;
      // Single-key shortcuts act only inside the game (WCAG 2.1.4), and can be switched off in the notebook.
      const active = document.activeElement;
      if (active && active !== document.body && !active.closest("main")) return;
      try {
        if (localStorage.getItem(SHORTCUTS_OFF)) return;
      } catch {}
      // Enter on a focused button already activates it.
      if (e.key === "Enter" && (e.target as HTMLElement)?.tagName === "BUTTON") return;
      const fn = keys[e.key];
      if (!fn) return;
      e.preventDefault();
      fn();
      try {
        localStorage.setItem(LEARNED, "1");
      } catch {}
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keys]);
}

/**
 * Teach the keys at the moment of need: after a desktop player has clicked
 * three choices with the mouse, once, beside the choices; gone for good once
 * dismissed or once a key is used.
 */
export function ShortcutTip() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let clicks = 0;
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      if (!(e.target as HTMLElement)?.closest("[data-shortcut]")) return;
      try {
        if (localStorage.getItem(LEARNED) || localStorage.getItem(SHOWN)) return;
      } catch {
        return;
      }
      clicks += 1;
      if (clicks >= 3) {
        setShow(true);
        try {
          localStorage.setItem(SHOWN, "1");
        } catch {}
      }
    };
    window.addEventListener("pointerup", onPointer);
    return () => window.removeEventListener("pointerup", onPointer);
  }, []);
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), 8000);
    return () => clearTimeout(t);
  }, [show]);
  if (!show) return null;
  return (
    <div role="status" className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl bg-ink px-4 py-2 text-[15px] text-paper shadow-lg">
      <span>
        Faster: press <kbd className="rounded bg-paper/20 px-1.5 font-bold">1</kbd>–<kbd className="rounded bg-paper/20 px-1.5 font-bold">4</kbd> to choose and{" "}
        <kbd className="rounded bg-paper/20 px-1.5 font-bold">Enter</kbd> to confirm.
      </span>
      <button type="button" onClick={() => setShow(false)} className="h-11 rounded-lg px-3 font-bold hover:bg-paper/15">
        Got it
      </button>
    </div>
  );
}
