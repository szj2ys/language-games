import { SESSIONS as BUILDER } from "@/games/builder/rounds";
import { SESSIONS as SCENE } from "@/games/scene/rounds";
import { SESSIONS as CAFE } from "@/games/cafe/rounds";
import { SESSIONS as PUPIL } from "@/games/pupil/levels";
import { SESSIONS as FAMILY } from "@/games/family/rounds";
import type { GameInfo } from "./games";

export type NotebookSession = { title: string; index: number; rounds: { id: string; did: string }[] };

/** For each game: its sessions, and what the English did in each round. */
export const NOTEBOOK: Record<GameInfo["slug"], NotebookSession[]> = {
  builder: BUILDER.map((s, index) => ({
    title: s.title,
    index,
    rounds: s.rounds.map((r) => ({ id: r.id, did: r.role === "fetch" ? "an order you carried out" : "an order you gave" })),
  })),
  scene: SCENE.map((s, index) => ({
    title: s.title,
    index,
    rounds: s.rounds.map((r) => ({
      id: r.id,
      did: r.mode === "build" ? "a description you made true" : r.mode === "check" ? "a report you corrected" : "a description you gave",
    })),
  })),
  cafe: CAFE.map((s, index) => ({ title: s.title, index, rounds: s.rounds.map((r) => ({ id: r.id, did: r.use })) })),
  pupil: PUPIL.map((s, index) => ({ title: s.title, index, rounds: s.rounds.map((r) => ({ id: r.id, did: r.english })) })),
  family: FAMILY.map((s, index) => ({
    title: s.title,
    index,
    rounds: s.rounds.map((r) => ({
      id: r.id,
      did: r.mode === "claim" ? "a claim about these cards" : r.mode === "thread" ? "comparisons with “both”" : "a newcomer placed with “both” or “unlike”",
    })),
  })),
};
