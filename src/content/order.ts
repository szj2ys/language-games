// The games in playing order, with no content attached: game pages import this for "Next game"
// without pulling every other game's rounds into their bundle.
export const GAME_ORDER = [
  { slug: "builder", title: "Slab!" },
  { slug: "scene", title: "Picture Theatre" },
  { slug: "cafe", title: "The Café" },
  { slug: "pupil", title: "Go On!" },
  { slug: "family", title: "Family Threads" },
] as const;

export type GameSlug = (typeof GAME_ORDER)[number]["slug"];

export function titleOf(slug: GameSlug): string {
  return GAME_ORDER.find((g) => g.slug === slug)!.title;
}

export function nextGame(slug: GameSlug): { title: string; href: string } {
  const i = GAME_ORDER.findIndex((g) => g.slug === slug);
  const g = GAME_ORDER[(i + 1) % GAME_ORDER.length];
  return { title: g.title, href: `/play/${g.slug}` };
}
