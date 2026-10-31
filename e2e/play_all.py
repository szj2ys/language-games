"""Play every game end to end in a real browser, the way a learner would.

    python e2e/play_all.py [base_url] [--desktop] [--shots DIR]

Each game's first session is played round by round through its visible
controls (taps, not state injection). A reload in the middle of a round
checks that the half-done work survives. Exits non-zero on the first failure.
"""

import re
import sys
from pathlib import Path

from playwright.sync_api import Page, expect, sync_playwright

BASE = next((a for a in sys.argv[1:] if a.startswith("http")), "http://localhost:3417")
DESKTOP = "--desktop" in sys.argv
SHOTS = Path(sys.argv[sys.argv.index("--shots") + 1]) if "--shots" in sys.argv else Path("qa/e2e")
SHOTS.mkdir(parents=True, exist_ok=True)
step = 0


def shot(page: Page, name: str) -> None:
    global step
    step += 1
    # Pictures fetched after a click (end cards, next rounds) must be in the evidence, not still loading.
    # A polling loop, not wait_for_function: that one evaluates strings, which the site's CSP (no 'unsafe-eval') blocks.
    for _ in range(50):
        if page.evaluate("() => [...document.images].every((i) => i.complete)"):
            break
        page.wait_for_timeout(200)
    page.screenshot(path=str(SHOTS / f"{step:03d}-{name}.png"))


def tap(page: Page, role: str, name: str, exact: bool = True) -> None:
    page.get_by_role(role, name=name, exact=exact).first.click()


def next_round(page: Page) -> None:
    tap(page, "button", "Next")


def advance(page: Page, before: str = "") -> None:
    """Fetch rounds move on by themselves after a right answer; click Next if it is still there."""
    # A right delivery moves on by itself after about 1.4 s.
    page.wait_for_timeout(1700)


# --- Slab! -----------------------------------------------------------------

def play_builder(page: Page) -> None:
    page.goto(f"{BASE}/play/builder")
    expect(page.get_by_role("heading", level=1, name="Slab!")).to_be_visible()
    # Session 1: the four words. The call is shown in the speech bubble.
    for _ in range(6):
        call = page.locator("p[aria-live=polite]").first.inner_text().strip().lower()
        stone = next(s for s in ["block", "pillar", "slab", "beam"] if s in call)
        # Stones are labelled only in the first rounds; fall back to position.
        shapes = {"block": "A solid cube of stone", "pillar": "A tall round stone", "slab": "A broad flat stone", "beam": "A long narrow stone"}
        btn = page.get_by_role("button", name=stone, exact=True)
        if btn.count() == 0:
            btn = page.get_by_role("button", name=shapes[stone], exact=True)
        btn.click()  # one tap brings it in the first session
        shot(page, f"builder-fetch-{stone}")
        advance(page, call)
    shot(page, "builder-session-1-end")
    expect(page.get_by_role("heading", name=re.compile(r"Done.*Four words"))).to_be_visible()
    page.get_by_role("button", name="Next: Two slabs — there!").click()

    # Session 2: numbers and "there". Read the call and the pointing direction.
    words = {"one": 1, "two": 2, "three": 3, "four": 4}
    for i in range(6):
        call = page.locator("p.sr-only[aria-live=polite]").first.inner_text().lower()
        stone = next(s for s in ["block", "pillar", "slab", "beam"] if s in call)
        count = next((n for w, n in words.items() if f"{w} " in call), 1)
        place = "Left" if "left platform" in call else "Right" if "right platform" in call else "Here"
        page.get_by_role("button", name=stone, exact=True).click()
        for _ in range(count - 1):
            page.get_by_role("button", name="One more").click()
        page.get_by_role("radio", name=place).click()
        if i == 2:
            page.reload()  # half-done work must survive a reload
            expect(page.get_by_role("radio", name=place)).to_be_checked()
        page.get_by_role("button", name="Bring", exact=False).click()
        shot(page, f"builder-there-{i}")
        advance(page, call)
    page.get_by_role("button", name="Next: Your turn to call").click()

    # Session 3: the player calls. Round 1: "Pillar!"
    def say(*tiles: str) -> None:
        bank = page.get_by_role("group", name="Words you can use")
        for t in tiles:
            bank.get_by_role("button", name=t, exact=True).click()

    say("pillar")
    page.get_by_role("button", name=re.compile(r"^Call")).click()
    shot(page, "builder-call-1")
    next_round(page)
    # Round 2: a deliberate slip ("two pillar") still works and earns an English note.
    say("two", "pillar", "there")
    page.get_by_role("button", name="Point at the left platform").click()
    page.get_by_role("button", name=re.compile(r"^Call")).click()
    expect(page.get_by_text("English needs the plural")).to_be_visible()
    shot(page, "builder-call-note")
    next_round(page)
    say("one", "beam", "there")
    page.get_by_role("button", name="Point at the left platform").click()
    page.get_by_role("button", name=re.compile(r"^Call")).click()
    next_round(page)
    say("three", "slabs", "there")
    page.get_by_role("button", name="Point at the right platform").click()
    page.get_by_role("button", name=re.compile(r"^Call")).click()
    next_round(page)
    # Round 5: no word for the curved stone; point and say "this".
    say("this")
    page.get_by_role("button", name="Point at the curved stone").click()
    page.get_by_role("button", name=re.compile(r"^Call")).click()
    expect(page.get_by_text("New word:")).to_be_visible()
    shot(page, "builder-ostension")
    next_round(page)
    say("arch", "there")
    page.get_by_role("button", name="Point at the right platform").click()
    page.get_by_role("button", name=re.compile(r"^Call")).click()
    next_round(page)
    expect(page.get_by_role("heading", name=re.compile(r"Done.*Your turn to call"))).to_be_visible()
    shot(page, "builder-done")


# --- Picture Theatre ---------------------------------------------------------

def play_scene(page: Page) -> None:
    page.goto(f"{BASE}/play/scene")
    expect(page.get_by_role("heading", level=1, name="Picture Theatre")).to_be_visible()
    # The stage must fit the window: on desktop it keeps its 16:9 shape; on a phone it fills down to the controls.
    stage = page.locator("figure").first.bounding_box()
    vp = page.viewport_size
    assert stage and stage["y"] + stage["height"] <= vp["height"], f"stage runs off the screen: {stage}"

    def put(thing: str, where: str) -> None:
        page.get_by_role("button", name=thing, exact=True).first.click()
        page.get_by_role("button", name=where).click()

    put("key", "Put the key in the box")
    page.get_by_role("button", name="Is it true?").click()
    shot(page, "scene-1")
    next_round(page)
    put("cup", "Put the cup on the book")
    page.get_by_role("button", name="Is it true?").click()
    next_round(page)
    put("lamp", "Front row, place 1 from the left")
    page.get_by_role("button", name="Is it true?").click()
    next_round(page)
    put("key", "Put the key in the box")
    put("ball", "Front row, place 4 from the left")
    page.get_by_role("button", name="Is it true?").click()
    next_round(page)
    # A mistake first: the book two places away is not "next to" the lamp.
    put("book", "Front row, place 4 from the left")
    put("ball", "Put the ball on the book")
    page.get_by_role("button", name="Is it true?").click()
    shot(page, "scene-mistake")
    page.get_by_role("button", name="Change it").click()
    page.get_by_role("button", name="The book").click()
    page.get_by_role("button", name="Take the book off").click()
    put("book", "Front row, place 3 from the left")
    put("ball", "Put the ball on the book")
    page.get_by_role("button", name="Is it true?").click()
    next_round(page)
    put("box", "Front row, place 2 from the left")
    put("key", "Put the key in the box")
    put("cup", "Front row, place 1 from the left")
    put("lamp", "Front row, place 3 from the left")
    page.get_by_role("button", name="Is it true?").click()
    shot(page, "scene-6")
    next_round(page)
    expect(page.get_by_role("heading", name=re.compile(r"Done.*Make it true"))).to_be_visible()


# --- The Café -----------------------------------------------------------------

CAFE_ANSWERS = [
    "Close the window.",
    "Offer her another pot of tea.",
    "Pass him the sugar.",
    "“I hope so. I've practised a lot.”",
    "“It's ten to five.”",
    "Say sorry and start packing up.",
]


def play_cafe(page: Page) -> None:
    page.goto(f"{BASE}/play/cafe")
    expect(page.get_by_role("heading", level=1, name="The Café")).to_be_visible()
    # A literal answer first: the visitor reacts and the round stays open.
    page.get_by_role("button", name="“Yes, it's November.”").click()
    expect(page.get_by_text("Not quite what Rosa meant")).to_be_visible()
    shot(page, "cafe-literal")
    for a in CAFE_ANSWERS:
        page.get_by_role("button", name=a).click()
        expect(page.get_by_text("What the words were doing here")).to_be_visible()
        next_round(page)
    shot(page, "cafe-session-end")
    expect(page.get_by_role("heading", name=re.compile(r"Done.*Same words, new job"))).to_be_visible()


# --- Go On! -------------------------------------------------------------------

PUPIL = [
    ("an honest man", "both"),
    ("a baby", "correct"),
    ("opened", "both"),
    ("easier", "both"),
]


def show_cards_until_pass(page: Page) -> None:
    """Show example cards until the pupil passes; the first pass is enough for the journey."""
    passed = page.get_by_role("button", name="Now a word it hasn't seen")
    for _ in range(8):
        if passed.count():
            return
        cards = page.get_by_role("group", name="Example cards").get_by_role("button")
        next(b for b in cards.all() if b.is_enabled()).click()
    assert passed.count(), "pupil never passed"


def play_pupil(page: Page) -> None:
    page.goto(f"{BASE}/play/pupil")
    expect(page.get_by_role("heading", level=1, name="Go On!")).to_be_visible()
    # Level 1: the loose explanation is misread first (§198).
    page.get_by_role("button", name="Explain: “Use “an” before a vowel.”").click()
    expect(page.get_by_text("reads your sentence its own way")).to_be_visible()
    shot(page, "pupil-misread")
    for card, call in PUPIL:
        show_cards_until_pass(page)
        page.get_by_role("button", name="Now a word it hasn't seen").click()
        page.get_by_role("button", name="Correct it" if call == "correct" else "Both are in use").click()
        expect(page.get_by_text("Good call.")).to_be_visible()
        shot(page, f"pupil-{card.replace(' ', '-')}")
        next_round(page)
    expect(page.get_by_role("heading", name=re.compile(r"Done.*Teach the pupil"))).to_be_visible()


# --- Family Threads -------------------------------------------------------------

def play_family(page: Page) -> None:
    page.goto(f"{BASE}/play/family")
    expect(page.get_by_role("heading", level=1, name="Family Threads")).to_be_visible()
    # Round 1: "All" is refuted by a counterexample, then "Most" holds.
    page.get_by_role("radio", name="All").click()
    page.get_by_role("button", name="Look").click()
    expect(page.get_by_text("Objection!")).to_be_visible()
    shot(page, "family-objection")
    page.get_by_role("radio", name="Most").click()
    page.get_by_role("button", name="Look").click()
    next_round(page)
    for q in ["Most", "Some"]:
        page.get_by_role("radio", name=q).click()
        page.get_by_role("button", name="Look").click()
        next_round(page)
    # Thread: chess -skill- poker -cards- patience -alone- wall -ball- football -group- ring
    for name, link in [("chess", None), ("poker", "need skill"), ("patience (solitaire)", "are played with cards"),
                       ("throwing a ball at a wall", "can be played alone"), ("football", "are played with a ball"),
                       ("ring-a-ring-a-roses (a circle game)", "are played in a group")]:
        page.get_by_role("button", name=name, exact=True).click()
        if link:
            page.get_by_role("button", name=link).click()
    expect(page.get_by_text("The thread holds")).to_be_visible()
    shot(page, "family-thread")
    next_round(page)
    # Newcomer: crossword and patience both can be played alone.
    page.get_by_label("Which one").select_option(label="patience (solitaire)")
    page.get_by_label("What they share").select_option(label="can be played alone")
    page.get_by_role("button", name="Say it").click()
    expect(page.get_by_text("joins the family")).to_be_visible()
    next_round(page)
    # Lottery at the edge: unlike most of these games, it doesn't need skill.
    page.get_by_role("radio", name="At the edge: “unlike”").click()
    page.get_by_label("What it lacks").select_option(label="doesn't need skill")
    page.get_by_role("button", name="Say it").click()
    expect(page.get_by_text("sits at the edge")).to_be_visible()
    shot(page, "family-edge")
    next_round(page)
    expect(page.get_by_role("heading", name=re.compile(r"Done.*What is a game\?"))).to_be_visible()


# --- Later sessions, reached through the session picker ----------------------------

def pick_session(page: Page, title: str) -> None:
    page.get_by_role("navigation", name="Sessions").get_by_role("button", name=title).click()


def play_later_sessions(page: Page) -> None:
    # Slab! "Order or report?": the fitting response in each situation.
    page.goto(f"{BASE}/play/builder")
    pick_session(page, "Order or report?")
    for answer in [
        "Bring him three slabs.",
        "Write “3 slabs” on the stock list.",
        "Answer: “No — it's a beam.”",
        "Jump out of the way.",
        "Ask: “Which one — the big one or the small one?”",
        "Write “2 beams” on the stock list.",
    ]:
        page.get_by_role("button", name=answer).click()
        expect(page.get_by_text("What the words were doing here")).to_be_visible()
        next_round(page)
    expect(page.get_by_role("heading", name=re.compile(r"Done.*Order or report"))).to_be_visible()
    expect(page.get_by_role("link", name="Next game: Picture Theatre")).to_be_visible()
    shot(page, "later-builder-end")

    # The Café, sessions 2 and 3: the fitting response in every round.
    for title, answers in [
        ("Which one?", ["Bring the lemon cake.", "“Sorry, I'm new — what's your usual?”", "Say “Yes, sorry!” and move your coat.",
                        "“The other what, sorry?”", "“Are you sure? Just a small piece?”", "Smile and take the plate away."]),
        ("Excuse me?", ["“Sure — I'll do them now.”", "“Oh, I'd love to — thank you!”", "“Good to hear! What can I get you?”",
                        "“Are you sure? Sit down a moment — I'll get you some ice.”", "Pull your chair in to let him pass.",
                        "“Sorry — I said the card machine is broken. Cash only today.”"]),
    ]:
        page.goto(f"{BASE}/play/cafe")
        pick_session(page, title)
        for answer in answers:
            page.get_by_role("button", name=answer).click()
            expect(page.get_by_text("What the words were doing here")).to_be_visible()
            next_round(page)
        expect(page.get_by_role("heading", name=re.compile(rf"Done.*{re.escape(title)}"))).to_be_visible()

    # The Café, session 4: one wrong answer first, then the fitting ones.
    page.goto(f"{BASE}/play/cafe")
    pick_session(page, "Sorry, thanks, no problem")
    page.get_by_role("button", name="“You're welcome!”").click()
    expect(page.get_by_text("Not quite what Lena meant")).to_be_visible()
    for answer in [
        "“No problem — I'd nearly finished it anyway.”",
        "Say “Oh, sorry!” and move your bags.",
        "Keep holding the door and say “No problem!”",
        "Stop pouring.",
        "Smile and put the box away.",
        "Answer it: “Sorry — I'll be quick.”",
    ]:
        page.get_by_role("button", name=answer).click()
        expect(page.get_by_text("What the words were doing here")).to_be_visible()
        next_round(page)
    expect(page.get_by_role("heading", name=re.compile(r"Done.*Sorry, thanks"))).to_be_visible()
    shot(page, "later-cafe-end")

    # Family Threads, session 3: languages.
    page.goto(f"{BASE}/play/family")
    pick_session(page, "What is a language?")
    for q in ["Some", "Most"]:
        page.get_by_role("radio", name=q).click()
        page.get_by_role("button", name="Look").click()
        next_round(page)
    for name, link in [("English", None), ("sign language", "can give orders"), ("Morse code", "are used with the hands"),
                       ("road signs", "can give orders"), ("chemical formulas", "are used for one special job"),
                       ("music notation", "can be written down")]:
        page.get_by_role("button", name=name, exact=True).click()
        if link:
            page.get_by_role("button", name=link).click()
    expect(page.get_by_text("The thread holds")).to_be_visible()
    next_round(page)
    page.get_by_label("Which one").select_option(label="English")
    page.get_by_label("What they share").select_option(label="can be spoken aloud")
    page.get_by_role("button", name="Say it").click()
    expect(page.get_by_text("joins the family")).to_be_visible()
    next_round(page)
    expect(page.get_by_role("heading", name=re.compile(r"Done.*What is a language"))).to_be_visible()
    shot(page, "later-family-end")

    # Family Threads, session 4: kinds of number (§67).
    pick_session(page, "What is a number?")
    for q in ["Most", "Some"]:
        page.get_by_role("radio", name=q).click()
        page.get_by_role("button", name="Look").click()
        next_round(page)
    for name, link in [("whole numbers", None), ("fractions", "can measure an amount"), ("negative numbers", "can measure an amount"),
                       ("π (pi)", "can measure an amount"), ("zero", "can be added to make a total"), ("bus numbers", "can be written out in digits")]:
        page.get_by_role("button", name=name, exact=True).click()
        if link:
            page.get_by_role("button", name=link).click()
    expect(page.get_by_text("The thread holds")).to_be_visible()
    next_round(page)
    page.get_by_label("Which one").select_option(label="bus numbers")
    page.get_by_label("What they share").select_option(label="can name one thing among many")
    page.get_by_role("button", name="Say it").click()
    expect(page.get_by_text("joins the family")).to_be_visible()
    next_round(page)
    expect(page.get_by_role("heading", name=re.compile(r"Done.*What is a number"))).to_be_visible()
    shot(page, "later-family4-end")

    # Picture Theatre, session 4: sentences with "not" leave many pictures open.
    page.goto(f"{BASE}/play/scene")
    pick_session(page, "Not here")
    for moves in [
        [("key", "Put the key on the book")],
        [("ball", "Front row, place 4 from the left")],
        [("lamp", "Front row, place 1 from the left")],
        [("cup", "Put the cup in the box")],
        [("box", "Front row, place 4 from the left"), ("key", "Put the key in the box"), ("ball", "Put the ball on the book")],
        [("ball", "Front row, place 1 from the left")],
    ]:
        for thing, where in moves:
            page.get_by_role("button", name=thing, exact=True).first.click()
            page.get_by_role("button", name=where).click()
        page.get_by_role("button", name="Is it true?").click()
        next_round(page)
    expect(page.get_by_role("heading", name=re.compile(r"Done.*Not here"))).to_be_visible()
    shot(page, "later-scene-end")

    # Go On!, session 2: show cards until the pupil passes, then the teacher's call.
    page.goto(f"{BASE}/play/pupil")
    pick_session(page, "Rules with no rule")
    for _ in range(2):
        show_cards_until_pass(page)
        page.get_by_role("button", name="Now a word it hasn't seen").click()
        page.get_by_role("button", name="Both are in use").click()
        expect(page.get_by_text("Good call.")).to_be_visible()
        next_round(page)
    expect(page.get_by_role("heading", name=re.compile(r"Done.*Rules with no rule"))).to_be_visible()
    shot(page, "later-pupil-end")

    # Go On!, session 3: old rules in new clothes; both twists are irregular and must be corrected.
    pick_session(page, "Old rules, new words")
    for _ in range(2):
        show_cards_until_pass(page)
        page.get_by_role("button", name="Now a word it hasn't seen").click()
        page.get_by_role("button", name="Correct it").click()
        expect(page.get_by_text("Good call.")).to_be_visible()
        next_round(page)
    expect(page.get_by_role("heading", name=re.compile(r"Done.*Old rules, new words"))).to_be_visible()
    shot(page, "later-pupil3-end")


# --- Keyboard only (desktop) -------------------------------------------------------

def play_keyboard(page: Page) -> None:
    if not DESKTOP:
        return
    # A radio group is one Tab stop; arrow keys move the choice (WAI-ARIA radio group).
    page.goto(f"{BASE}/play/family")
    page.evaluate("localStorage.clear()")  # start from round 1, not the finished sessions above
    page.reload()
    page.get_by_role("radio", name="All").focus()
    page.keyboard.press("ArrowRight")
    expect(page.get_by_role("radio", name="Most")).to_be_focused()
    expect(page.get_by_role("radio", name="Most")).to_have_attribute("aria-checked", "true")
    expect(page.get_by_role("radio", name="All")).to_have_attribute("tabindex", "-1")
    # The café round can be answered with Tab and Enter alone.
    page.goto(f"{BASE}/play/cafe")
    for _ in range(60):
        page.keyboard.press("Tab")
        if page.evaluate("document.activeElement.innerText").strip().endswith("Close the window."):
            break
    page.keyboard.press("Enter")
    expect(page.get_by_text("What the words were doing here")).to_be_visible()


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(
            viewport={"width": 1280, "height": 860} if DESKTOP else {"width": 390, "height": 844},
            device_scale_factor=1 if DESKTOP else 2,
            is_mobile=not DESKTOP,
            has_touch=not DESKTOP,
        )
        page = ctx.new_page()
        errors: list[str] = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.set_default_timeout(8000)
        for name, fn in [
            ("builder", play_builder),
            ("scene", play_scene),
            ("cafe", play_cafe),
            ("pupil", play_pupil),
            ("family", play_family),
            ("later sessions", play_later_sessions),
            ("keyboard", play_keyboard),
        ]:
            fn(page)
            print(f"PASS {name}")
        browser.close()
        if errors:
            print("page errors:", errors)
            return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
