"use client";

import { track } from "@/components/analytics";
import { recordRound } from "@/lib/progress";
import { useSave, useSpeech } from "@/lib/use-save";
import { clearDrafts } from "@/lib/use-draft";

type SessionLike = { rounds: { id: string }[] };

/**
 * Where the player is in a game's sessions, saved locally so a reload resumes the same round.
 * `did` names what a round showed (the game's own content module defines it).
 */
export function useSessions<S extends SessionLike>(game: string, sessions: S[], did: (r: S["rounds"][number]) => string) {
  const { save, ready, update, storable } = useSave();
  const pos = save.positions[game] ?? { session: 0, round: 0 };
  // Clamp a saved position to the content as it is now: sessions can be added or removed between visits.
  const sessionIndex = Math.max(0, Math.min(pos.session, sessions.length - 1));
  const session = sessions[sessionIndex];
  const finished = pos.round >= session.rounds.length;
  const roundIndex = Math.max(0, Math.min(pos.round, session.rounds.length - 1));
  const round = session.rounds[roundIndex] as S["rounds"][number];
  const speech = useSpeech(save.settings.speech);

  const goTo = (s: number, r: number) => {
    for (const x of session.rounds) clearDrafts(x.id);
    return update((sv) => ({ ...sv, lastGame: game, positions: { ...sv.positions, [game]: { session: s, round: r } } }));
  };

  return {
    save,
    ready,
    storable,
    session,
    sessionIndex,
    round,
    roundIndex,
    finished,
    speech,
    toggleSpeech: () => update((s) => ({ ...s, settings: { ...s.settings, speech: !s.settings.speech } })),
    next: () => goTo(sessionIndex, roundIndex + 1),
    /** What the player said in each round of this session, and the job those words did. */
    sessionItems: () =>
      session.rounds
        .map((r) => ({ text: save.rounds[r.id]?.said?.[0], did: did(r) }))
        .filter((x): x is { text: string; did: string } => !!x.text),
    finishedIn: (i: number) => sessions[i].rounds.every((r) => !!save.rounds[r.id]),
    nextSession: () => goTo(sessionIndex + 1, 0),
    replay: () => goTo(sessionIndex, 0),
    goToSession: (s: number) => goTo(s, 0),
    sessions,
    complete: (marks: number, max: number, firstTry: boolean, phrases: string[], missed?: string) => {
      update((s) => recordRound(s, round.id, { marks, max, firstTry, ...(missed ? { missed } : {}) }, phrases));
      track("round_completed", { game, round: round.id, firstTry, marks });
    },
  };
}
