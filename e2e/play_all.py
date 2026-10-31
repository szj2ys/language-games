"""Play every game end to end in a real browser, the way a learner would.

    python e2e/play_all.py [base_url] [--desktop] [--shots DIR]

Each game's first session is played round by round through its visible
controls (taps, not state injection). A reload in the middle of a round
checks that the half-done work survives. Exits non-zero on the first failure.
"""

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
    page.screenshot(path=str(SHOTS / f"{step:03d}-{name}.png"))


def tap(page: Page, role: str, name: str, exact: bool = True) -> None:
    page.get_by_role(role, name=name, exact=exact).first.click()


def next_round(page: Page) -> None:
    tap(page, "button", "Next")


# --- Slab! -----------------------------------------------------------------

def play_builder(page: Page) -> None:
    page.goto(f"{BASE}/play/builder")
    expect(page.get_by_role("heading", level=1, name="Slab!")).to_be_visible()
    # Session 1: the four words. The call is shown in the speech bubble.
    for _ in range(6):
        call = page.locator("p[aria-live=polite]").first.inner_text().strip().lower()
        stone = next(s for s in ["block", "pillar", "slab", "beam"] if s in call)
        # Stones are labelled only in the first rounds; fall back to position.
        order = ["block", "pillar", "slab", "beam"]
        btn = page.get_by_role("button", name=stone, exact=True)
        if btn.count() == 0:
            btn = page.get_by_role("button", name=f"Stone {order.index(stone) + 1}", exact=True)
        btn.click()
        page.get_by_role("button", name="Bring", exact=False).click()
        shot(page, f"builder-fetch-{stone}")
        next_round(page)
    shot(page, "builder-session-1-end")
    expect(page.get_by_text("Four words: done")).to_be_visible()
    page.get_by_role("button", name="Next: Two slabs — there!").click()

    # Session 2: numbers and "there". Read the call and the pointing direction.
    words = {"one": 1, "two": 2, "three": 3, "four": 4}
    for i in range(6):
        call = page.locator("p.sr-only[aria-live=polite]").first.inner_text().lower()
        stone = next(s for s in ["block", "pillar", "slab", "beam"] if s in call)
        count = next((n for w, n in words.items() if f"{w} " in call), 1)
        place = "Left" if "left platform" in call else "Right" if "right platform" in call else "To him"
        page.get_by_role("button", name=stone, exact=True).click()
        for _ in range(count - 1):
            page.get_by_role("button", name="One more").click()
        page.get_by_role("radio", name=place).click()
        if i == 2:
            page.reload()  # half-done work must survive a reload
            expect(page.get_by_role("radio", name=place)).to_be_checked()
        page.get_by_role("button", name="Bring", exact=False).click()
        shot(page, f"builder-there-{i}")
        next_round(page)
    page.get_by_role("button", name="Next: Your turn to call").click()

    # Session 3: the player calls. Round 1: "Pillar!"
    def say(*tiles: str) -> None:
        bank = page.get_by_role("group", name="Words you can use")
        for t in tiles:
            bank.get_by_role("button", name=t, exact=True).click()

    say("pillar")
    page.get_by_role("button", name="Call", exact=False).click()
    shot(page, "builder-call-1")
    next_round(page)
    # Round 2: a deliberate slip ("two pillar") still works and earns an English note.
    say("two", "pillar", "there")
    page.get_by_role("button", name="Point at the left platform").click()
    page.get_by_role("button", name="Call", exact=False).click()
    expect(page.get_by_text("English needs the plural")).to_be_visible()
    shot(page, "builder-call-note")
    next_round(page)
    say("one", "beam", "there")
    page.get_by_role("button", name="Point at the left platform").click()
    page.get_by_role("button", name="Call", exact=False).click()
    next_round(page)
    say("three", "slabs", "there")
    page.get_by_role("button", name="Point at the right platform").click()
    page.get_by_role("button", name="Call", exact=False).click()
    next_round(page)
    # Round 5: no word for the curved stone; point and say "this".
    say("this")
    page.get_by_role("button", name="Point at the curved stone").click()
    page.get_by_role("button", name="Call", exact=False).click()
    expect(page.get_by_text("New word:")).to_be_visible()
    shot(page, "builder-ostension")
    next_round(page)
    say("arch", "there")
    page.get_by_role("button", name="Point at the right platform").click()
    page.get_by_role("button", name="Call", exact=False).click()
    next_round(page)
    expect(page.get_by_text("Your turn to call: done")).to_be_visible()
    shot(page, "builder-done")


# --- Picture Theatre ---------------------------------------------------------

def play_scene(page: Page) -> None:
    page.goto(f"{BASE}/play/scene")
    expect(page.get_by_role("heading", level=1, name="Picture Theatre")).to_be_visible()

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
    expect(page.get_by_text("Make it true: done")).to_be_visible()


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
    expect(page.get_by_text("Same words, new job: done")).to_be_visible()


# --- Go On! -------------------------------------------------------------------

PUPIL = [
    ("an honest man", "correct"),
    ("a baby", "both"),
    ("opened", "both"),
    ("easier", "both"),
]


def play_pupil(page: Page) -> None:
    page.goto(f"{BASE}/play/pupil")
    expect(page.get_by_role("heading", level=1, name="Go On!")).to_be_visible()
    # Level 1: the loose explanation is misread first (§198).
    page.get_by_role("button", name="Explain: “Use “an” before a vowel.”").click()
    expect(page.get_by_text("reads your sentence its own way")).to_be_visible()
    shot(page, "pupil-misread")
    for card, call in PUPIL:
        group = page.get_by_role("group", name="Example cards")
        cards = [b for b in group.get_by_role("button").all() if b.is_enabled()]
        # Show cards until the pupil passes; the first pass is enough for the journey.
        i = 0
        while page.get_by_role("button", name="Now a word it hasn't seen").count() == 0:
            cards = [b for b in page.get_by_role("group", name="Example cards").get_by_role("button").all() if b.is_enabled()]
            cards[0].click()
            i += 1
            assert i < 8, "pupil never passed"
        page.get_by_role("button", name="Now a word it hasn't seen").click()
        page.get_by_role("button", name="Correct it" if call == "correct" else "Both are in use").click()
        expect(page.get_by_text("Good call.")).to_be_visible()
        shot(page, f"pupil-{card.replace(' ', '-')}")
        next_round(page)
    expect(page.get_by_text("Teach the pupil: done")).to_be_visible()


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
    page.get_by_role("button", name="Keep this claim").click()
    next_round(page)
    for q in ["Most", "Some"]:
        page.get_by_role("radio", name=q).click()
        page.get_by_role("button", name="Look").click()
        page.get_by_role("button", name="Keep this claim").click()
        next_round(page)
    # Thread: chess -skill- poker -cards- patience -alone- wall -ball- football -group- ring
    for name, link in [("chess", None), ("poker", "both need skill"), ("patience", "both are played with cards"),
                       ("ball against a wall", "both can be played alone"), ("football", "both are played with a ball"),
                       ("ring-a-ring-a-roses", "both are played in a group")]:
        page.get_by_role("button", name=name, exact=True).click()
        if link:
            page.get_by_role("button", name=link).click()
    expect(page.get_by_text("The thread holds")).to_be_visible()
    shot(page, "family-thread")
    next_round(page)
    # Newcomer: crossword and patience both can be played alone.
    page.get_by_label("Which one").select_option(label="patience")
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
    expect(page.get_by_text("What is a game?: done")).to_be_visible()


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
        for name, fn in [("builder", play_builder), ("scene", play_scene), ("cafe", play_cafe), ("pupil", play_pupil), ("family", play_family)]:
            fn(page)
            print(f"PASS {name}")
        browser.close()
        if errors:
            print("page errors:", errors)
            return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
