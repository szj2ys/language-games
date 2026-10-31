// Café session 4, "Sorry, thanks, no problem". An earlier draft of this file was merged in 5c810ab (rounds.ts, SESSION_SOURCES)
// and drawn (art/cafe/, public/art/cafe/). This version adds the fixes from an independent blind review; port them to cafe-4
// in src/games/cafe/rounds.ts:
// - c4-2: misreading "Get up and offer him your seat." becomes "Take his plate so he has a free hand." (new reaction); `use`
//   drops ", not an apology"; the note no longer says "nobody has done anything wrong" (your bags are in the way).
// - c4-4: the "Hand her the jug." reaction now says she wasn't reaching for it.
// - c4-5: "Keep looking through the box." ignored both the words and the picture; it becomes “Oh no — sorry I couldn't find them.”
// - c4-6: the fitting reaction is "Take your time. Your cake can wait."
// No clue changed, so the pictures still match. The say/act helpers in rounds.ts are not exported, so this file keeps local copies.
import type { Option, Session } from "@/games/cafe/rounds";

const say = (text: string, fits: boolean, reaction: string): Option => ({ kind: "say", text, fits, reaction });
const act = (text: string, fits: boolean, reaction: string): Option => ({ kind: "do", text, fits, reaction });

export const CAFE_4 = {
  id: "cafe-4",
  title: "Sorry, thanks, no problem",
  blurb: "'Sorry!' isn't always an apology, and 'Thank you!' can mean 'That's enough'. Look before you answer.",
  english: "'Sorry', 'Thank you', 'Never mind', 'Go ahead' and 'No problem' — apologies, thanks, requests and permission",
  source: "pi-23",
  rounds: [
    {
      id: "c4-1",
      speaker: "lena",
      says: "Sorry!",
      clues: [
        "Lena is standing right next to your table, with a big bag on her shoulder.",
        "Your cup is lying on its side in a puddle of coffee.",
        "She has one hand over her mouth.",
      ],
      options: [
        act("Pull your chair in so she can get past.", false, "Oh — no, I'm not trying to get past. My bag knocked your coffee over!"),
        say("“No problem — I'd nearly finished it anyway.”", true, "That's kind of you. Let me get you some napkins, at least."),
        say("“You're welcome!”", false, "(She looks puzzled.) …No, I'm saying sorry. I knocked your coffee over!"),
      ],
      use: "an apology",
      note: "Her bag knocked your cup over, so 'Sorry!' is an apology. 'No problem', 'That's OK' and 'Don't worry' all accept an apology; 'You're welcome' answers 'Thank you', not 'Sorry'.",
    },
    {
      id: "c4-2",
      speaker: "tom",
      says: "Sorry!",
      clues: [
        "Tom has a coffee in one hand and a plate of toast in the other.",
        "Your shopping bags are on the floor, blocking the narrow way between the tables.",
        "Past your bags, the table by the window is free.",
      ],
      options: [
        say("“No problem — don't worry!”", false, "(He waits, holding his plate.) …Could you move your bags, please?"),
        act("Take his plate so he has a free hand.", false, "Oh — thanks, but I'm fine. I just need to get past your bags."),
        act("Say “Oh, sorry!” and move your bags.", true, "Thanks! (He squeezes past to the window table.)"),
      ],
      ask: { question: "Do you want to get past?", answer: "Yes, please — I'm going to the window table." },
      use: "a request to get past",
      note: "The same word as before, but Tom hasn't knocked anything over. With his hands full and your bags in the way, 'Sorry!' asks you to make room, as 'Excuse me' can. Wittgenstein: “Five slabs” can be a report or an order — what makes the difference is the part it plays in the language-game (PI §21).",
    },
    {
      id: "c4-3",
      speaker: "rosa",
      says: "Thank you!",
      clues: [
        "You are holding the café door open.",
        "Rosa is coming in from the rain, with a heavy bag in each hand.",
        "She is only halfway through the door.",
      ],
      options: [
        act("Keep holding the door and say “No problem!”", true, "You're very kind. There — I'm in."),
        act("Let go of the door.", false, "(The door swings against her bags.) Oh! I wasn't quite through."),
        say("“Bye! Have a nice day!”", false, "Bye? I've only just come in, dear!"),
      ],
      use: "thanking someone for a favour that isn't finished yet",
      note: "Rosa thanks you while she is still in the doorway: thanks often comes before the favour is over, so keep holding the door. 'No problem' and 'You're welcome' are both good answers. Thanking is on Wittgenstein's own list of language-games, next to asking, cursing, greeting and praying (PI §23).",
    },
    {
      id: "c4-4",
      speaker: "lena",
      says: "Thank you!",
      clues: [
        "You are pouring milk into Lena's coffee from a small jug.",
        "Her cup is nearly full.",
        "She is holding up her hand, palm towards you.",
      ],
      options: [
        say("“My pleasure!” (and keep pouring)", false, "(The coffee runs over into the saucer.) Oh — I meant that's enough!"),
        act("Stop pouring.", true, "Perfect, thanks. Just how I like it."),
        act("Hand her the jug.", false, "Oh — I wasn't reaching for the jug. I meant that's enough milk!"),
      ],
      ask: { question: "Is that enough?", answer: "Yes — that's perfect, thanks." },
      use: "a polite way to say 'stop — that's enough'",
      note: "The same words as at the door, but a different job. While someone is pouring or serving, 'Thank you!' often means 'That's enough' — and her raised hand says so too. If you are pouring for someone, 'Say when!' asks them to tell you when to stop.",
    },
    {
      id: "c4-5",
      speaker: "tom",
      says: "Never mind!",
      clues: [
        "You are looking through a box of lost things: gloves, scarves, an umbrella.",
        "Tom is holding up his keys and smiling.",
        "His bag is open on the table, with everything spread out.",
      ],
      options: [
        say("“Don't worry — I'm sure they'll turn up.”", false, "They already have — look! They were in my pocket."),
        say("“Oh no — sorry I couldn't find them.”", false, "Don't be sorry — I've found them! (He waves the keys at you.)"),
        act("Smile and put the box away.", true, "Sorry for the trouble — and thanks anyway!"),
      ],
      ask: { question: "Have you found them?", answer: "Yes — they were in my pocket all along. Sorry!" },
      use: "calling off a request — he found his keys himself",
      note: "'Never mind' often takes back a request: he has found his keys, so you can stop looking. After a small accident, the same words comfort someone: 'Never mind — it's only a cup.'",
    },
    {
      id: "c4-6",
      speaker: "rosa",
      says: "Go ahead.",
      clues: [
        "Your phone is ringing on the table.",
        "A fresh slice of cake is waiting in front of you.",
        "Rosa is pointing at your phone.",
      ],
      options: [
        act("Answer it: “Sorry — I'll be quick.”", true, "Take your time. Your cake can wait."),
        act("Start eating your cake.", false, "(The phone keeps ringing.) Your phone, dear! It might be important."),
        say("“So, as I was saying…”", false, "(The phone keeps ringing.) Answer it — I don't mind!"),
      ],
      ask: { question: "Do you mind if I answer it?", answer: "Not at all. Go on." },
      use: "permission to answer your phone",
      note: "'Go ahead' gives permission, and what it allows depends on what is in view: she is pointing at your phone, not at your cake. With food on the table, the same words can mean 'Start eating'; when two people start talking at once, they mean 'You speak first'.",
    },
  ],
} satisfies Session;
