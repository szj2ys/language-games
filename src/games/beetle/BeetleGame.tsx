"use client";

import { ChoiceGame } from "@/games/choice/ChoiceGame";
import { SESSIONS } from "./rounds";

export function BeetleGame() {
  return <ChoiceGame slug="beetle" sessions={SESSIONS} />;
}
