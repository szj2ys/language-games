import type { SourceId } from "@/content/sources";
import { articleItem, comparativeItem, countItem, ingItem, pastItem, patternItem, pluralItem, thirdPersonItem, type Level } from "./engine";

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
      item: { word: "historic", forms: {}, correct: "a historic" },
      prompt: "New word: the pupil writes “a historic day”. Your old grammar book says “an historic day”.",
      answer: "both",
      why: "Both are in use. Most speakers sound the h and say “a historic”, as the pupil's rule predicts; some, especially in older British English, say “an historic”. The practice of speakers decides, not the rule on paper (§202).",
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
      {
        text: "Add -es after s, x, ch or sh; change consonant + y to -ies; otherwise add -s.",
        readAs: "consonant-y",
        needs: { ruledOut: "any-y", otherwise: "any-y" },
      },
    ],
    twist: {
      item: { word: "child", forms: {}, correct: "children" },
      prompt: "New word: the pupil writes “two childs”. Every rule you taught says just add -s.",
      answer: "correct",
      why: "Correct it: the plural is “children”. Irregular plurals (child–children, man–men, mouse–mice) follow no spelling rule; they are simply what English speakers say, learned one by one (§217: “This is simply what I do”).",
    },
  },
  {
    id: "p-3",
    title: "Yesterday I…",
    task: "Teach the pupil to spell the past tense.",
    english: "Past -ed spelling: drop silent e; double a final consonant after one vowel letter in a stressed last syllable",
    ways: [
      { id: "ed", label: "Always add -ed" },
      { id: "drop-e", label: "After a final e, just add -d" },
      { id: "double-any", label: "…and double the last consonant after a single vowel letter" },
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
      { text: "Double the last letter after a single vowel.", readAs: "double-any" },
      {
        text: "Drop a silent e; double a final consonant (never w, x or y) after a single vowel letter, but only when the last syllable is stressed.",
        readAs: "double-stressed",
        needs: { ruledOut: "double-any", otherwise: "double-any" },
      },
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
      {
        text: "One syllable: -er. Two syllables ending in -y: -ier. Otherwise: more.",
        readAs: "y-too",
        needs: { ruledOut: "syllables", otherwise: "syllables" },
      },
    ],
    twist: {
      item: { word: "clever", forms: {}, correct: "cleverer" },
      prompt: "The pupil writes “more clever”. The rule you taught says two syllables take “more”.",
      answer: "both",
      why: "Both are in use: “cleverer” and “more clever” are both common. Here the rule runs out and what speakers actually do decides (PI §84: the application of a word “is not everywhere bounded by rules”).",
    },
  },
];

export const LEVELS_2: Level[] = [
  {
    id: "p-5",
    title: "Enjoy swimming, want to swim",
    task: "Teach the pupil what comes after a verb: “to swim” or “swimming”.",
    english: "verb + -ing (enjoy, finish, mind, avoid) and verb + to (want, hope, decide, plan)",
    ways: [
      { id: "always-to", label: "Always “to” + verb" },
      { id: "always-ing", label: "Always -ing" },
      { id: "looks-ahead", label: "“to” after verbs of wanting and planning (want, hope, plan); -ing after the others" },
    ],
    exam: [
      patternItem({ word: "enjoy", looksAhead: false }),
      patternItem({ word: "hope", looksAhead: true }),
      patternItem({ word: "finish", looksAhead: false }),
      patternItem({ word: "decide", looksAhead: true }),
      patternItem({ word: "avoid", looksAhead: false }),
    ],
    deck: [
      patternItem({ word: "want", looksAhead: true }),
      patternItem({ word: "plan", looksAhead: true }),
      patternItem({ word: "mind", looksAhead: false }),
      patternItem({ word: "practise", looksAhead: false }),
      patternItem({ word: "promise", looksAhead: true }),
      patternItem({ word: "keep", looksAhead: false }),
    ],
    explain: [
      { text: "After a verb, use “to”.", readAs: "always-to" },
      {
        text: "After want, hope, plan and decide, use “to”; after enjoy, finish, mind and avoid, use -ing.",
        readAs: "looks-ahead",
        needs: { ruledOut: "always-to", otherwise: "always-to" },
      },
    ],
    twist: {
      item: { word: "stop", forms: {}, correct: "stop smoking" },
      prompt: "New verb: the pupil writes “He stopped to smoke.” Is that English — or should it be “He stopped smoking”?",
      answer: "both",
      why: "Both are good English — with different meanings. “He stopped smoking” means he gave it up; “He stopped to smoke” means he paused in order to smoke. The form follows what you want to say.",
    },
  },
  {
    id: "p-6",
    title: "Two pieces of advice",
    task: "Teach the pupil which nouns can simply take -s.",
    english: "countable and uncountable nouns: two chairs, but two pieces of furniture",
    ways: [
      { id: "always-s", label: "Every noun can take -s" },
      { id: "abstract", label: "Ideas (advice, news) can't be counted; things can" },
      { id: "listed", label: "Some nouns can't be counted — they have to be learned one by one" },
    ],
    exam: [
      countItem({ word: "advice", abstract: true, uncountable: true }),
      countItem({ word: "furniture", abstract: false, uncountable: true }),
      countItem({ word: "chair", abstract: false, uncountable: false }),
      countItem({ word: "luggage", abstract: false, uncountable: true }),
      countItem({ word: "idea", abstract: true, uncountable: false }),
    ],
    deck: [
      countItem({ word: "information", abstract: true, uncountable: true }),
      countItem({ word: "bag", abstract: false, uncountable: false }),
      countItem({ word: "equipment", abstract: false, uncountable: true }),
      countItem({ word: "suggestion", abstract: true, uncountable: false }),
      countItem({ word: "news", abstract: true, uncountable: true }),
      countItem({ word: "table", abstract: false, uncountable: false }),
    ],
    explain: [
      { text: "You can't count abstract nouns.", readAs: "abstract" },
      {
        text: "Learn these as uncountable: advice, information, news, furniture, luggage, equipment.",
        readAs: "listed",
        needs: { ruledOut: "abstract", otherwise: "abstract" },
      },
    ],
    twist: {
      item: { word: "data", forms: {}, correct: "the data is" },
      prompt: "New word: the pupil writes “The data is clear.” A science textbook says “The data are clear.”",
      answer: "both",
      why: "Both are in use. In everyday English “data” is usually uncountable (“the data is”); many scientists still treat it as plural (“the data are”). Different communities, different practices (§§198–202).",
    },
  },
];

export type Session = { id: string; title: string; blurb: string; english: string; source: SourceId; rounds: Level[] };

// Session 3: two spelling rules the learner has met before in another form (plurals, -ed).
export const LEVELS_3: Level[] = [
  {
    id: "p-7",
    title: "She watches, he tries",
    task: "Teach the pupil the present simple after he, she or it.",
    english: "Present simple -s: -es after s, x, ch, sh; consonant + y becomes -ies",
    ways: [
      { id: "s", label: "Always add -s" },
      { id: "es", label: "-es after s, x, ch, sh" },
      { id: "any-y", label: "…and every -y becomes -ies" },
      { id: "consonant-y", label: "…but only consonant + y becomes -ies" },
    ],
    exam: [thirdPersonItem("watch"), thirdPersonItem("fly"), thirdPersonItem("play"), thirdPersonItem("wash"), thirdPersonItem("cry")],
    deck: [
      thirdPersonItem("read"),
      thirdPersonItem("kiss"),
      thirdPersonItem("try"),
      thirdPersonItem("stay"),
      thirdPersonItem("fix"),
      thirdPersonItem("buy"),
    ],
    explain: [
      { text: "When a verb ends in -y, change it to -ies.", readAs: "any-y" },
      {
        text: "Add -es after s, x, ch or sh; change consonant + y to -ies; otherwise add -s.",
        readAs: "consonant-y",
        needs: { ruledOut: "any-y", otherwise: "any-y" },
      },
    ],
    twist: {
      item: { word: "have", forms: {}, correct: "she has" },
      prompt: "New verb: the pupil writes “She haves a dog.” Every rule you taught says just add -s.",
      answer: "correct",
      why: "Correct it: “she has”. A few very common verbs are irregular (have → has, be → is); learners pick them up one by one, from use rather than from the rule.",
    },
  },
  {
    id: "p-8",
    title: "Making, stopping, visiting",
    task: "Teach the pupil to spell the -ing form.",
    english: "-ing spelling: drop silent e; double a final consonant (not w, x or y) after one vowel letter in a stressed last syllable",
    ways: [
      { id: "ing", label: "Always add -ing" },
      { id: "drop-e", label: "Drop a final e, then add -ing" },
      { id: "double-any", label: "…and double the last consonant after a single vowel letter" },
      { id: "double-stressed", label: "…but only when that syllable is stressed" },
    ],
    exam: [
      ingItem({ word: "make", stressedLast: true }),
      ingItem({ word: "stop", stressedLast: true }),
      ingItem({ word: "visit", stressedLast: false }),
      ingItem({ word: "begin", stressedLast: true }),
      ingItem({ word: "play", stressedLast: true }),
    ],
    deck: [
      ingItem({ word: "walk", stressedLast: true }),
      ingItem({ word: "hope", stressedLast: true }),
      ingItem({ word: "run", stressedLast: true }),
      ingItem({ word: "open", stressedLast: false }),
      ingItem({ word: "forget", stressedLast: true }),
      ingItem({ word: "listen", stressedLast: false }),
    ],
    explain: [
      { text: "Double the last letter after a single vowel.", readAs: "double-any" },
      {
        text: "Drop a silent e; double a final consonant (never w, x or y) after a single vowel letter, but only when the last syllable is stressed.",
        readAs: "double-stressed",
        needs: { ruledOut: "double-any", otherwise: "double-any" },
      },
    ],
    twist: {
      item: { word: "see", forms: {}, correct: "seeing" },
      prompt: "New verb: the pupil drops the final e of “see” and writes “seing”.",
      answer: "correct",
      why: "Correct it: “seeing”. Only a silent e is dropped (make → making); the e of “see” is part of the long “ee”, so it stays. A rule in words still has to be applied, case by case.",
    },
  },
];

export const SESSIONS: Session[] = [
  {
    id: "pupil-1",
    title: "Teach the pupil",
    blurb: "You know the rule. The pupil only has your examples — and its own ideas about what they mean.",
    english: "a/an, plural spelling, past-tense spelling and comparatives",
    source: "pi-185",
    rounds: LEVELS,
  },
  {
    id: "pupil-2",
    title: "Rules with no rule",
    blurb: "Some patterns are nearly rules; some must simply be learned. Teach both.",
    english: "verb + -ing or to; countable and uncountable nouns",
    source: "pi-217",
    rounds: LEVELS_2,
  },
  {
    id: "pupil-3",
    title: "Old rules, new words",
    blurb: "Two rules you have met before, in new clothes. Does the pupil carry them over?",
    english: "present simple -s after he/she/it; -ing spelling",
    source: "pi-185",
    rounds: LEVELS_3,
  },
];

/** What the English did in a round, for the end card and the notebook. */
export function did(r: Level): string {
  return r.english;
}
