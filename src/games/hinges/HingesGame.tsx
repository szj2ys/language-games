"use client";

import { ChoiceGame } from "@/games/choice/ChoiceGame";
import { SESSIONS } from "./rounds";

export function HingesGame() {
  return <ChoiceGame slug="hinges" sessions={SESSIONS} />;
}
