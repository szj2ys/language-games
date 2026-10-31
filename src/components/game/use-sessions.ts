"use client";

import { track } from "@/components/analytics";
import { recordRound } from "@/lib/progress";
import { useSave, useSpeech } from "@/lib/use-save";

type SessionLike = { rounds: { id: string }[] };

/** Where the player is in a game's sessions, saved locally so a reload resumes the same round. */
export function useSessions<S extends SessionLike>(game: string, sessions: S[]) {
  const { save, ready, update, storable } = useSave();
  const pos = save.positions[game] ?? { session: 0, round: 0 };
  const sessionIndex = Math.min(pos.session, sessions.length - 1);
  const session = sessions[sessionIndex];
  const finished = pos.round >= session.rounds.length;
  const roundIndex = Math.min(pos.round, session.rounds.length - 1);
  const round = session.rounds[roundIndex] as S["rounds"][number];
  const speech = useSpeech(save.settings.speech);

  const goTo = (s: number, r: number) =>
    update((sv) => ({ ...sv, lastGame: game, positions: { ...sv.positions, [game]: { session: s, round: r } } }));

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
    nextSession: () => goTo(sessionIndex + 1, 0),
    replay: () => goTo(sessionIndex, 0),
    complete: (marks: number, max: number, firstTry: boolean, phrases: string[]) => {
      update((s) => recordRound(s, round.id, { marks, max, firstTry }, phrases));
      track("round_completed", { game, round: round.id, firstTry, marks });
    },
  };
}
