"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { emptySave, loadSave, writeSave, type Save, SAVE_KEY } from "./progress";

type State = { save: Save; storable: boolean; ready: boolean };

let state: State = { save: emptySave(), storable: true, ready: false };
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function init() {
  if (state.ready || typeof window === "undefined") return;
  const r = loadSave();
  state = { save: r.save, storable: r.ok, ready: true };
  window.addEventListener("storage", (e) => {
    if (e.key !== SAVE_KEY) return;
    const next = loadSave();
    state = { ...state, save: next.save };
    emit();
  });
}

const SERVER: State = { save: emptySave(), storable: true, ready: false };

/** The player's local progress, shared by every component on the page. */
export function useSave() {
  const snap = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => SERVER,
  );
  useEffect(() => {
    if (!state.ready) {
      init();
      emit();
    }
  }, []);

  const update = useCallback((fn: (s: Save) => Save) => {
    const next = fn(state.save);
    const ok = writeSave(next);
    state = { save: next, storable: ok, ready: true };
    emit();
  }, []);

  return { ...snap, update };
}

/** Speak a line in English when the browser can; the text is always on screen too. */
export function useSpeech(enabled: boolean) {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    setAvailable(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);
  const speak = useCallback(
    (text: string) => {
      if (!enabled || !available) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/—/g, ","));
      const voice = synth.getVoices().find((v) => v.lang === "en-GB") ?? synth.getVoices().find((v) => v.lang.startsWith("en"));
      if (voice) u.voice = voice;
      u.lang = voice?.lang ?? "en-GB";
      u.rate = 0.9;
      synth.speak(u);
    },
    [enabled, available],
  );
  return { speak, available };
}
