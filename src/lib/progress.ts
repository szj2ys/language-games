// Local, versioned progress. No account, no server. Every read survives
// missing, corrupt, or newer-version storage without throwing.

export const SAVE_KEY = "language-games:v1";
export const SAVE_VERSION = 1;

export type RoundRecord = {
  /** Marks earned (0..max), kept at the best attempt. */
  marks: number;
  max: number;
  /** True when the round was solved without a hint or repair. */
  firstTry: boolean;
  /** What the player said or chose in this round, for the notebook. */
  said?: string[];
  /** What the player tried first, when it was wrong: the correction worth revisiting. */
  missed?: string;
};

export type Save = {
  version: number;
  /** Bumped by "Reset progress": a save from an older epoch never brings deleted progress back. */
  epoch: number;
  rounds: Record<string, RoundRecord>;
  /** Words and constructions the player has used, for the notebook. */
  phrases: string[];
  lastGame?: string;
  /** Where each game was left, so a reload resumes the same round. */
  positions: Record<string, Position>;
  settings: { reducedMotion: boolean; speech: boolean };
};

export type Position = { session: number; round: number };

export function emptySave(): Save {
  return {
    version: SAVE_VERSION,
    epoch: 0,
    rounds: {},
    phrases: [],
    positions: {},
    settings: { reducedMotion: false, speech: true },
  };
}

export type LoadResult = { ok: true; save: Save } | { ok: false; save: Save; reason: "unavailable" | "corrupt" | "newer" };

export function parseSave(raw: string | null): LoadResult {
  if (raw === null) return { ok: true, save: emptySave() };
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ok: false, save: emptySave(), reason: "corrupt" };
  }
  if (!data || typeof data !== "object") return { ok: false, save: emptySave(), reason: "corrupt" };
  const d = data as Partial<Save>;
  if (typeof d.version !== "number") return { ok: false, save: emptySave(), reason: "corrupt" };
  if (d.version > SAVE_VERSION) return { ok: false, save: emptySave(), reason: "newer" };
  const base = emptySave();
  const rounds: Record<string, RoundRecord> = {};
  if (d.rounds && typeof d.rounds === "object") {
    for (const [id, r] of Object.entries(d.rounds)) {
      if (r && typeof r.marks === "number" && typeof r.max === "number") {
        rounds[id] = {
          marks: r.marks,
          max: r.max,
          firstTry: Boolean(r.firstTry),
          said: Array.isArray(r.said) ? r.said.filter((x) => typeof x === "string") : undefined,
          missed: typeof r.missed === "string" ? r.missed : undefined,
        };
      }
    }
  }
  return {
    ok: true,
    save: {
      version: SAVE_VERSION,
      epoch: typeof d.epoch === "number" && d.epoch >= 0 ? d.epoch : 0,
      rounds,
      phrases: Array.isArray(d.phrases) ? d.phrases.filter((p) => typeof p === "string").slice(-200) : [],
      lastGame: typeof d.lastGame === "string" ? d.lastGame : undefined,
      positions: parsePositions(d.positions),
      settings: { ...base.settings, ...(d.settings ?? {}) },
    },
  };
}

function parsePositions(raw: unknown): Record<string, Position> {
  const out: Record<string, Position> = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [game, p] of Object.entries(raw as Record<string, Partial<Position>>)) {
    if (p && Number.isInteger(p.session) && Number.isInteger(p.round) && (p.session as number) >= 0 && (p.round as number) >= 0) {
      out[game] = { session: p.session as number, round: p.round as number };
    }
  }
  return out;
}

/** Merge a finished round into a save, keeping the best result. Idempotent. */
export function recordRound(save: Save, id: string, rec: RoundRecord, phrases: string[] = []): Save {
  const prev = save.rounds[id];
  const said = phrases.length ? phrases : (rec.said ?? prev?.said);
  const missed = prev?.missed ?? rec.missed;
  const best: RoundRecord = {
    marks: Math.max(prev?.marks ?? 0, rec.marks),
    max: rec.max,
    firstTry: Boolean(prev?.firstTry) || rec.firstTry,
    ...(said ? { said } : {}),
    ...(missed ? { missed } : {}),
  };
  const seen = new Set(save.phrases);
  const added = phrases.filter((p) => !seen.has(p));
  return {
    ...save,
    rounds: { ...save.rounds, [id]: best },
    phrases: [...save.phrases, ...added].slice(-200),
  };
}

/** Merge two saves (e.g. another tab wrote meanwhile) without losing completion. */
export function mergeSaves(a: Save, b: Save): Save {
  // After a reset, the newer epoch wins outright: merging would bring the deleted rounds back.
  if (a.epoch !== b.epoch) return a.epoch > b.epoch ? a : b;
  let out: Save = {
    ...a,
    settings: b.settings,
    lastGame: b.lastGame ?? a.lastGame,
    positions: { ...a.positions, ...b.positions },
  };
  for (const [id, r] of Object.entries(b.rounds)) out = recordRound(out, id, r);
  const seen = new Set(out.phrases);
  out.phrases = [...out.phrases, ...b.phrases.filter((p) => !seen.has(p))].slice(-200);
  return out;
}

export function loadSave(): LoadResult {
  try {
    return parseSave(window.localStorage.getItem(SAVE_KEY));
  } catch {
    return { ok: false, save: emptySave(), reason: "unavailable" };
  }
}

/** Returns false when the browser refuses to store (private mode, quota, blocked). */
export function writeSave(save: Save): boolean {
  try {
    const current = parseSave(window.localStorage.getItem(SAVE_KEY));
    // Never overwrite a save written by a newer version of the app.
    if (!current.ok && current.reason === "newer") return false;
    const merged = current.ok ? mergeSaves(current.save, save) : save;
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(merged));
    return true;
  } catch {
    return false;
  }
}

/** A fresh save one epoch on from `save`: what "Reset progress" writes, so other tabs drop the old one too. */
export function resetSave(save: Save): Save {
  return { ...emptySave(), epoch: save.epoch + 1 };
}

/**
 * Where to resume a game. A saved place is trusted only if every round before it is recorded as done:
 * when a game's content changes, an old place could otherwise skip new rounds or open an end card
 * for rounds never played. Otherwise resume at the first round not yet done.
 */
export function resolvePosition(
  sessions: { rounds: { id: string }[] }[],
  done: Record<string, unknown>,
  pos: Position | undefined,
): Position & { finished: boolean } {
  const p = pos ?? { session: 0, round: 0 };
  const s = sessions[p.session];
  if (s && s.rounds.slice(0, p.round).every((r) => done[r.id])) {
    return { session: p.session, round: Math.min(p.round, s.rounds.length - 1), finished: p.round >= s.rounds.length };
  }
  for (let i = 0; i < sessions.length; i++) {
    const r = sessions[i].rounds.findIndex((x) => !done[x.id]);
    if (r >= 0) return { session: i, round: r, finished: false };
  }
  const last = sessions.length - 1;
  return { session: last, round: sessions[last].rounds.length - 1, finished: true };
}

/**
 * On arrival only: a saved end card is no place to come back to while a round elsewhere in the game is
 * unplayed (for example one replaced since the last visit). Returns where to go instead, or null.
 * During play the end card of a session just finished is always shown.
 */
export function resumeTarget(
  sessions: { rounds: { id: string }[] }[],
  done: Record<string, unknown>,
  pos: Position | undefined,
): Position | null {
  const here = resolvePosition(sessions, done, pos);
  if (!here.finished) return null;
  for (let i = 0; i < sessions.length; i++) {
    const r = sessions[i].rounds.findIndex((x) => !done[x.id]);
    if (r >= 0) return { session: i, round: r };
  }
  return null;
}
