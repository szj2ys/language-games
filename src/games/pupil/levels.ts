import type { SourceId } from "@/content/sources";
import { articleItem, comparativeItem, pastItem, pluralItem, type Level } from "./engine";

export const LEVELS: Level[] = [
  {
    id: "p-1",
    title: "A or an?",
    task: "Teach the pupil when English says “a” and when it says “an”.",
    english: "a/an go by the first sound, not the first letter",
    ways: [
      { id: "always-a", label: "Always “a”" },
      { id: "letter", label: "“an” before a vowel letter" },
      { id: "sound", label: "“an” before a vowel sound" },
    ],
    exam: [
      articleItem({ word: "hour", vowelSound: true }),
      articleItem({ word: "university", vowelSound: false }),
      articleItem({ word: "apple", vowelSound: true }),
      articleItem({ word: "MBA", vowelSound: true }),
      articleItem({ word: "horse", vowelSound: false }),
    ],
    deck: [
      articleItem({ word: "cat", vowelSound: false }),
      articleItem({ word: "egg", vowelSound: true }),
      articleItem({ word: "unicorn", vowelSound: false }),
      articleItem({ word: "hotel", vowelSound: false }),
      articleItem({ word: "umbrella", vowelSound: true }),
      articleItem({ word: "honest man", vowelSound: true }),
    ],
    explain: [
      { text: "Use “an” before a vowel.", readAs: "letter" },
      { text: "Use “an” before a vowel sound — listen, don't look.", readAs: "sound", needs: { ruledOut: "letter", otherwise: "letter" } },
    ],
    twist: {
      item: { word: "one-way ticket", forms: {}, correct: "a one-way ticket" },
      prompt: "The pupil writes “an one-way ticket”. It starts with the letter o…",
      answer: "correct",
      why: "“One” starts with a /w/ sound, so English says “a one-way ticket”. The sound decides, even when the letter is a vowel.",
    },
  },
  {
    id: "p-2",
    title: "One box, two…",
    task: "Teach the pupil to make plurals.",
    english: "Plural spelling: -s, -es after s/x/ch/sh, -ies after a consonant + y",
    ways: [
      { id: "s", label: "Always add -s" },
      { id: "es", label: "-es after s, x, ch, sh" },
      { id: "any-y", label: "…and every -y becomes -ies" },
      { id: "consonant-y", label: "…but only consonant + y becomes -ies" },
    ],
    exam: [pluralItem("box"), pluralItem("city"), pluralItem("church"), pluralItem("day"), pluralItem("lady")],
    deck: [pluralItem("cat"), pluralItem("bus"), pluralItem("baby"), pluralItem("key"), pluralItem("dish"), pluralItem("toy")],
    explain: [
      { text: "When a word ends in -y, change it to -ies.", readAs: "any-y" },
      { text: "Add -es after s, x, ch or sh; change consonant + y to -ies; otherwise add -s.", readAs: "consonant-y", needs: { ruledOut: "any-y", otherwise: "any-y" } },
    ],
    twist: {
      item: { word: "person", forms: {}, correct: "people" },
      prompt: "The pupil writes “two persons”. Your notes only have “people”.",
      answer: "both",
      why: "Both are in use. “People” is the everyday plural; “persons” lives on in legal and official English (“no more than four persons”). Which is right depends on the game being played.",
    },
  },
  {
    id: "p-3",
    title: "Yesterday I…",
    task: "Teach the pupil to spell the past tense.",
    english: "Past -ed spelling: drop silent e, double a final consonant after a short stressed vowel",
    ways: [
      { id: "ed", label: "Always add -ed" },
      { id: "drop-e", label: "Drop a final e, then -d" },
      { id: "double-any", label: "…and double the last consonant after a short vowel" },
      { id: "double-stressed", label: "…but only when that syllable is stressed" },
    ],
    exam: [
      pastItem({ word: "stop", stressedLast: true }),
      pastItem({ word: "like", stressedLast: true }),
      pastItem({ word: "visit", stressedLast: false }),
      pastItem({ word: "prefer", stressedLast: true }),
      pastItem({ word: "play", stressedLast: true }),
    ],
    deck: [
      pastItem({ word: "walk", stressedLast: true }),
      pastItem({ word: "hope", stressedLast: true }),
      pastItem({ word: "plan", stressedLast: true }),
      pastItem({ word: "open", stressedLast: false }),
      pastItem({ word: "admit", stressedLast: true }),
      pastItem({ word: "listen", stressedLast: false }),
    ],
    explain: [
      { text: "Double the last letter after a short vowel.", readAs: "double-any" },
      { text: "Drop a silent e; double a final consonant only after a short, stressed vowel.", readAs: "double-stressed", needs: { ruledOut: "double-any", otherwise: "double-any" } },
    ],
    twist: {
      item: { word: "travel", forms: {}, correct: "travelled" },
      prompt: "The stress in “travel” is on the first syllable, so the pupil writes “traveled”. Your British textbook says “travelled”.",
      answer: "both",
      why: "Both are in use: American English writes “traveled”, British English keeps “travelled”. Two communities, two practices; neither is the pupil's mistake.",
    },
  },
  {
    id: "p-4",
    title: "Bigger, happier…",
    task: "Teach the pupil to make comparatives.",
    english: "Comparatives: -er for short words, -ier for -y words, “more” for longer ones",
    ways: [
      { id: "always-er", label: "Always add -er" },
      { id: "syllables", label: "-er for one syllable, otherwise “more”" },
      { id: "y-too", label: "…and two-syllable -y words take -ier" },
    ],
    exam: [
      comparativeItem({ word: "big", syllables: 1 }),
      comparativeItem({ word: "happy", syllables: 2 }),
      comparativeItem({ word: "careful", syllables: 2 }),
      comparativeItem({ word: "tall", syllables: 1 }),
      comparativeItem({ word: "modern", syllables: 2 }),
    ],
    deck: [
      comparativeItem({ word: "small", syllables: 1 }),
      comparativeItem({ word: "hot", syllables: 1 }),
      comparativeItem({ word: "famous", syllables: 2 }),
      comparativeItem({ word: "easy", syllables: 2 }),
      comparativeItem({ word: "nice", syllables: 1 }),
      comparativeItem({ word: "expensive", syllables: 3 }),
    ],
    explain: [
      { text: "Long words take “more”.", readAs: "syllables" },
      { text: "One syllable: -er. Two syllables ending in -y: -ier. Otherwise: more.", readAs: "y-too", needs: { ruledOut: "syllables", otherwise: "syllables" } },
    ],
    twist: {
      item: { word: "clever", forms: {}, correct: "cleverer" },
      prompt: "The pupil writes “more clever”. The rule you taught says two syllables take “more”.",
      answer: "both",
      why: "Both are in use: “cleverer” and “more clever” are both common. Here the rule runs out and what speakers actually do decides (PI §217: “This is simply what I do”).",
    },
  },
];

export type Session = { id: string; title: string; blurb: string; english: string; source: SourceId; rounds: Level[] };

export const SESSIONS: Session[] = [
  {
    id: "pupil-1",
    title: "Teach the pupil",
    blurb: "You know the rule. The pupil only has your examples — and its own ideas about what they mean.",
    english: "a/an, plural spelling, past-tense spelling and comparatives",
    source: "pi-185",
    rounds: LEVELS,
  },
];
