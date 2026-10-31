"use client";

import { useEffect, useState } from "react";

const PREFIX = "language-games:draft:";

/**
 * Round state that survives a reload: half-built calls, placed objects, cards
 * shown. Keyed by round id; cleared when the player moves on.
 */
export function useDraft<T>(round: string, field: string, initial: T | (() => T)) {
  const key = `${PREFIX}${round}:${field}`;
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw) as T;
    } catch {
      // Unreadable draft: start the round fresh.
    }
    return typeof initial === "function" ? (initial as () => T)() : initial;
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked: the round still works in memory.
    }
  }, [key, value]);
  return [value, setValue] as const;
}

export function clearDrafts(round?: string) {
  try {
    const store = window.localStorage;
    const prefix = round ? `${PREFIX}${round}:` : PREFIX;
    for (let i = store.length - 1; i >= 0; i--) {
      const k = store.key(i);
      if (k?.startsWith(prefix)) store.removeItem(k);
    }
  } catch {
    // Nothing to clear.
  }
}
