import { SESSIONS as BUILDER, did as builderDid } from "@/games/builder/rounds";
import { SESSIONS as SCENE, did as sceneDid } from "@/games/scene/rounds";
import { SESSIONS as CAFE, did as cafeDid } from "@/games/cafe/rounds";
import { SESSIONS as PUPIL, did as pupilDid } from "@/games/pupil/levels";
import { SESSIONS as FAMILY, did as familyDid } from "@/games/family/rounds";
import { SESSIONS as BEETLE } from "@/games/beetle/rounds";
import { SESSIONS as HINGES } from "@/games/hinges/rounds";
import { did as choiceDid } from "@/games/choice/types";
import type { GameSlug } from "./order";
import type { SourceId } from "./sources";

export type NotebookSession = { title: string; index: number; shows: string; source: SourceId; rounds: { id: string; did: string }[] };

function sessionsOf<R extends { id: string }>(
  sessions: { title: string; shows: string; source: SourceId; rounds: R[] }[],
  did: (r: R) => string,
): NotebookSession[] {
  return sessions.map((s, index) => ({
    title: s.title,
    index,
    shows: s.shows,
    source: s.source,
    rounds: s.rounds.map((r) => ({ id: r.id, did: did(r) })),
  }));
}

/** For each game: its sessions, and what each round showed. */
export const NOTEBOOK: Record<GameSlug, NotebookSession[]> = {
  builder: sessionsOf(BUILDER, builderDid),
  scene: sessionsOf(SCENE, sceneDid),
  cafe: sessionsOf(CAFE, cafeDid),
  pupil: sessionsOf(PUPIL, pupilDid),
  family: sessionsOf(FAMILY, familyDid),
  beetle: sessionsOf(BEETLE, choiceDid),
  hinges: sessionsOf(HINGES, choiceDid),
};
