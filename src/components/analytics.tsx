"use client";

import { useEffect } from "react";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

type Client = { capture: (event: string, props?: Record<string, unknown>) => void };
let client: Client | null = null;

/** PostHog only, and only when a key is configured. No autocapture, no replay. */
export function Analytics() {
  useEffect(() => {
    if (!KEY) return;
    let cancelled = false;
    import("posthog-js").then(({ default: posthog }) => {
      if (cancelled) return;
      posthog.init(KEY, {
        api_host: HOST,
        autocapture: false,
        disable_session_recording: true,
        persistence: "localStorage",
        capture_pageview: true,
      });
      client = posthog;
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}

/** Explicit learning events only; never send what the player typed. */
export function track(
  event: "round_completed" | "hint_used" | "repair_used" | "game_finished",
  props: Record<string, string | number | boolean>,
) {
  client?.capture(event, props);
}
