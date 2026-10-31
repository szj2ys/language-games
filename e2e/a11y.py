"""Run axe-core on every page at phone and desktop width; exits non-zero on serious or critical issues.

    python e2e/a11y.py [base_url]
"""

import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3417"
AXE = Path(__file__).resolve().parent.parent / "node_modules" / "axe-core" / "axe.min.js"
PAGES = ["/", "/play/builder", "/play/scene", "/play/cafe", "/play/pupil", "/play/family", "/sources", "/notebook"]

bad = 0
with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, vp in [("phone", {"width": 390, "height": 844}), ("desktop", {"width": 1440, "height": 900})]:
        page = browser.new_page(viewport=vp)
        for path in PAGES:
            page.goto(BASE + path)
            page.wait_for_timeout(1500)
            page.add_script_tag(path=str(AXE))
            result = page.evaluate("async () => (await axe.run(document, { resultTypes: ['violations'] })).violations")
            for v in result:
                if v["impact"] in ("serious", "critical"):
                    bad += 1
                print(f"{name} {path} [{v['impact']}] {v['id']}: {v['help']} ({len(v['nodes'])}) e.g. {v['nodes'][0]['target']}")
    browser.close()
print(f"serious/critical: {bad}")
sys.exit(1 if bad else 0)
