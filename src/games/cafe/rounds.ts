import type { SourceId } from "@/content/sources";

export type Speaker = "rosa" | "tom" | "lena";

export type Option = {
  /** A reply in quotes, or an action. */
  kind: "say" | "do";
  text: string;
  /** Does this response fit what the words were used to do here? */
  fits: boolean;
  /** What happens next: the speaker's reaction. */
  reaction: string;
};

export type CafeRound = {
  id: string;
  speaker: Speaker;
  says: string;
  /** What you can see. The same words get a different job when these change. */
  clues: string[];
  options: Option[];
  /** Asking is always allowed and never costs a mark. */
  ask?: { question: string; answer: string };
  /** The job the words did here, from the list in PI §23. */
  use: string;
  note: string;
};

export type Session = {
  id: string;
  title: string;
  blurb: string;
  english: string;
  source: SourceId;
  rounds: CafeRound[];
};

const say = (text: string, fits: boolean, reaction: string): Option => ({ kind: "say", text, fits, reaction });
const act = (text: string, fits: boolean, reaction: string): Option => ({ kind: "do", text, fits, reaction });

export const SESSIONS: Session[] = [
  {
    id: "cafe-1",
    title: "Same words, new job",
    blurb: "Two visitors say exactly the same thing. Look around before you answer.",
    english: "Indirect requests and complaints: what a sentence is used to do",
    source: "pi-43",
    rounds: [
      {
        id: "c1-1", speaker: "rosa", says: "It's a bit cold in here.",
        clues: ["The window beside her is wide open.", "Her tea is still steaming."],
        options: [
          act("Close the window.", true, "Oh, thank you, dear. Much better."),
          act("Bring her a fresh hot tea.", false, "Thank you — but this one is still hot. It's the draught, really."),
          say("“Yes, it's November.”", false, "…Yes. It is. (She pulls her cardigan tighter.)"),
        ],
        ask: { question: "Shall I close the window?", answer: "Would you? That would be lovely." },
        use: "a request — made by describing the problem",
        note: "Nothing in the words asks for anything. The open window turned a remark about the temperature into a request.",
      },
      {
        id: "c1-2", speaker: "rosa", says: "It's a bit cold in here.",
        clues: ["The window is shut.", "Her cup is empty and cold.", "She is looking at the teapot on the counter."],
        options: [
          act("Close the window.", false, "It's already closed, dear."),
          act("Offer her another pot of tea.", true, "Oh, you read my mind. Yes please."),
          say("“Is it? I feel warm.”", false, "Lucky you. (She looks at the teapot again.)"),
        ],
        ask: { question: "Would you like some more tea?", answer: "I thought you'd never ask." },
        use: "a hint — a polite way to ask for more tea",
        note: "The same sentence as before, but a different job. Wittgenstein: for many words, meaning is their use (PI §43).",
      },
      {
        id: "c1-3", speaker: "tom", says: "Can you pass the sugar?",
        clues: ["The sugar bowl is next to your hand.", "His coffee is black."],
        options: [
          say("“Yes, I can.”", false, "…Great. Will you?"),
          act("Pass him the sugar.", true, "Thanks!"),
          say("“Sugar is bad for you.”", false, "Noted. The sugar, please?"),
        ],
        use: "a request, shaped like a question about ability",
        note: "'Can you…?' is grammatically a question about ability, but here it does the work of a polite order.",
      },
      {
        id: "c1-4", speaker: "tom", says: "Can you pass the exam?",
        clues: ["He is holding your driving-test letter.", "He looks worried for you."],
        options: [
          act("Hand him something.", false, "Er — I didn't want anything."),
          say("“I hope so. I've practised a lot.”", true, "You'll be fine. Good luck tomorrow."),
          say("“Pass it to whom?”", false, "No — I mean, will you get through it?"),
        ],
        use: "a real question — about your chances",
        note: "Same frame, 'Can you pass…?', different game: this time it really is a question, and an answer is what fits.",
      },
      {
        id: "c1-5", speaker: "lena", says: "Do you know what time it is?",
        clues: ["She keeps glancing at the door.", "The clock behind you says 4:50."],
        options: [
          say("“Yes.”", false, "…And?"),
          say("“It's ten to five.”", true, "Thanks — I'd better run for my bus."),
          say("“Time is a construct.”", false, "My bus isn't. What time is it?"),
        ],
        use: "a request for information",
        note: "A yes/no question in form; a request for the time in use. Answering only 'Yes' follows the grammar and misses the game.",
      },
      {
        id: "c1-6", speaker: "lena", says: "Do you know what time it is?",
        clues: ["It is long past closing time.", "You are still playing music and chatting.", "She is holding the shop keys."],
        options: [
          say("“It's ten past eleven.”", false, "I know what time it is. That was a hint."),
          act("Say sorry and start packing up.", true, "Thank you. See you tomorrow."),
          say("“No, do you?”", false, "(She jingles the keys.)"),
        ],
        use: "a complaint — a hint that it is time to go",
        note: "The same words as before. Here the speaker knows the time; the words remind you of it. Giving orders, asking, complaining: different language-games (PI §23).",
      },
    ],
  },
  {
    id: "cafe-2",
    title: "Which one?",
    blurb: "Sometimes the words are not enough. Ask, point, and agree on what is meant.",
    english: "Clarifying questions: 'Do you mean…?', 'Which one?', 'the one with…'",
    source: "pi-23",
    rounds: [
      {
        id: "c2-1", speaker: "tom", says: "Could I have one of those?",
        clues: ["He is pointing at the counter.", "On it: a lemon cake and a chocolate cake.", "He is allergic to chocolate (he told you yesterday)."],
        options: [
          act("Bring the chocolate cake.", false, "Oh — I can't eat chocolate, remember?"),
          act("Bring the lemon cake.", true, "Perfect, thank you."),
          say("“Yes, you could.”", false, "…Could I have it, then?"),
        ],
        ask: { question: "The lemon one or the chocolate one?", answer: "The lemon one, please." },
        use: "a request with a pointing word ('those')",
        note: "'Those' needs the pointing gesture and what you know about him. Words, gestures and shared history work together.",
      },
      {
        id: "c2-2", speaker: "rosa", says: "I'll have the usual.",
        clues: ["You started work here today.", "Nothing tells you what 'the usual' is."],
        options: [
          act("Guess: bring a coffee.", false, "Coffee? I never drink coffee, dear."),
          say("“Sorry, I'm new — what's your usual?”", true, "Ah, welcome! A pot of mint tea and one ginger biscuit."),
          say("“The usual is unusual today.”", false, "…I'll wait for the other girl."),
        ],
        use: "an order that relies on a shared history",
        note: "'The usual' only works inside a practice you share. When you are new to the game, asking is the right move.",
      },
      {
        id: "c2-3", speaker: "lena", says: "Is this seat free?",
        clues: ["Your coat is on the chair next to you.", "The café is full."],
        options: [
          say("“Yes.” (and do nothing)", false, "(She looks at your coat on it.) …Could you move your coat?"),
          act("Say “Yes, sorry!” and move your coat.", true, "Thanks so much."),
          say("“All seats are free; the coffee isn't.”", false, "Ha. Can I sit, though?"),
        ],
        use: "a request to sit down",
        note: "She is not collecting information about chairs. The question asks permission, and permission here means moving your coat.",
      },
      {
        id: "c2-4", speaker: "tom", says: "Could you bring me the other one?",
        clues: ["He has a small cup and a large cup in front of him.", "There are two menus on the table."],
        options: [
          act("Bring another menu.", false, "No, not a menu."),
          act("Swap his small cup for a large one.", false, "Not the cup — sorry, I wasn't clear."),
          say("“The other what, sorry?”", true, "Ha — the other spoon. This one's bent."),
        ],
        use: "a request whose object isn't clear",
        note: "Nothing on view settles what 'the other one' means. When the clues run out, the question is the right move — not a guess.",
      },
      {
        id: "c2-5", speaker: "rosa", says: "That's very kind, but I couldn't possibly.",
        clues: ["You offered her a second slice of cake.", "She is smiling and looking at the cake."],
        options: [
          act("Take the cake away at once.", false, "Oh. (She looks a little sad.)"),
          say("“Go on — it's on the house.”", true, "Well… if you insist! Just a small one."),
          say("“Why not? Are you ill?”", false, "No, no, it's just… never mind."),
        ],
        ask: { question: "Are you sure? There's plenty.", answer: "Well… perhaps a very small piece." },
        use: "a polite refusal that invites a second offer",
        note: "In some situations, a first 'no' is part of the ritual of being polite. Her smile and her eyes on the cake are part of what she says.",
        // Not universal: in other places and with other people the first no means no.
      },
      {
        id: "c2-6", speaker: "rosa", says: "That's very kind, but I couldn't possibly.",
        clues: ["You offered her a second slice of cake.", "She has her hand on her stomach.", "Her plate is pushed away."],
        options: [
          say("“Go on — it's on the house.”", false, "Really, dear, no. I'm full."),
          act("Smile and take the plate away.", true, "Thank you. It was delicious."),
          say("“Why not?”", false, "I'm full, dear. Simple as that."),
        ],
        use: "a real refusal",
        note: "The same polite words, but this time they mean no. Look at the situation, not only at the sentence.",
      },
    ],
  },
];
