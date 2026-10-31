"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 639px)";

/** True below the `sm` breakpoint, where scenes are framed square around the action. */
export function useIsPhone(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const m = window.matchMedia(QUERY);
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
