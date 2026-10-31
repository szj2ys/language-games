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
  /** The English the player used or met in this round, for the notebook. */
  said?: string[];
};

export type Save = {
  version: number;
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
    rounds: {},
    phrases: [],
    positions: {},
    settings: { reducedMotion: false, speech: true },
  };
}

export type LoadResult =
  | { ok: true; save: Save }
  | { ok: false; save: Save; reason: "unavailable" | "corrupt" | "newer" };

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
        rounds[id] = { marks: r.marks, max: r.max, firstTry: Boolean(r.firstTry), said: Array.isArray(r.said) ? r.said.filter((x) => typeof x === "string") : undefined };
      }
    }
  }
  return {
    ok: true,
    save: {
      version: SAVE_VERSION,
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
    if (p && Number.isInteger(p.session) && Number.isInteger(p.round)) {
      out[game] = { session: p.session as number, round: p.round as number };
    }
  }
  return out;
}

/** Merge a finished round into a save, keeping the best result. Idempotent. */
export function recordRound(save: Save, id: string, rec: RoundRecord, phrases: string[] = []): Save {
  const prev = save.rounds[id];
  const said = phrases.length ? phrases : rec.said ?? prev?.said;
  const best: RoundRecord = prev
    ? { marks: Math.max(prev.marks, rec.marks), max: rec.max, firstTry: prev.firstTry || rec.firstTry, ...(said ? { said } : {}) }
    : { ...rec, ...(said ? { said } : {}) };
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

export function clearSave(): void {
  try {
    window.localStorage.removeItem(SAVE_KEY);
  } catch {
    // Nothing stored, nothing to clear.
  }
}
