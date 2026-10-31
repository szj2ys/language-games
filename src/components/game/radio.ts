import type { KeyboardEvent } from "react";

// Buttons with role="radio" promise the radio-group keyboard pattern (WAI-ARIA APG):
// one Tab stop for the group, arrow keys move the choice.

const STEP: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

/** Put on the role="radiogroup" element: arrows move focus and select. */
export function onRadioKeys(e: KeyboardEvent<HTMLElement>): void {
  const step = STEP[e.key];
  if (!step) return;
  const radios = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)')];
  const i = radios.indexOf(document.activeElement as HTMLButtonElement);
  if (i < 0) return;
  e.preventDefault();
  const next = radios[(i + step + radios.length) % radios.length];
  next.focus();
  next.click();
}

/** Roving tab stop: the checked radio, or the first one while none is checked. */
export function radioTabIndex(checked: boolean, index: number, anyChecked: boolean): 0 | -1 {
  return checked || (!anyChecked && index === 0) ? 0 : -1;
}
