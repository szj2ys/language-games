// The path through Wittgenstein's thought, early to late, with no content attached: game pages import this
// for their header and "Next idea" without pulling every other game's rounds into their bundle.
export const GAME_ORDER = [
  { slug: "scene", step: 1, title: "Pictures of facts", work: "Tractatus" },
  { slug: "builder", step: 2, title: "The builders", work: "Investigations §§1–21" },
  { slug: "cafe", step: 3, title: "Meaning is use", work: "Investigations §§23–43" },
  { slug: "family", step: 4, title: "Family resemblance", work: "Investigations §§65–77" },
  { slug: "pupil", step: 5, title: "Following a rule", work: "Investigations §§185–242" },
  { slug: "beetle", step: 6, title: "The beetle in the box", work: "Investigations §§243–315" },
  { slug: "hinges", step: 7, title: "Hinges of certainty", work: "On Certainty" },
] as const;

export type GameSlug = (typeof GAME_ORDER)[number]["slug"];

export function stopOf(slug: GameSlug): (typeof GAME_ORDER)[number] {
  return GAME_ORDER.find((g) => g.slug === slug)!;
}

export function titleOf(slug: GameSlug): string {
  return stopOf(slug).title;
}

/** The next stop on the path; after the last one, back to the start. */
export function nextGame(slug: GameSlug): { title: string; href: string } {
  const i = GAME_ORDER.findIndex((g) => g.slug === slug);
  const g = GAME_ORDER[(i + 1) % GAME_ORDER.length];
  return { title: `${g.step}. ${g.title}`, href: `/play/${g.slug}` };
}
