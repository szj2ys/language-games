"""Turn raw gpt-image-2 renders into web assets.

    python scripts/art.py key  <in.png> <out.webp> [--size 512]   magenta background -> alpha, trimmed
    python scripts/art.py fit  <in.png> <out.webp> --width 1600    resize + compress an opaque image

Sprites are drawn on flat #FF00FF because the image tool returns no alpha;
the key below removes it with a soft edge and pulls magenta spill out of the
anti-aliased rim.
"""

import argparse

from PIL import Image


def key(src: str, dst: str, size: int) -> None:
    im = Image.open(src).convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            # How magenta is this pixel: high red and blue, low green.
            m = min(r, b) - g
            if m > 90:
                px[x, y] = (r, g, b, 0)
            elif m > 30:
                a = int(255 * (90 - m) / 60)
                # Remove the magenta cast from the fringe.
                px[x, y] = (min(r, g + 40), g, min(b, g + 40), a)
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.thumbnail((size, size), Image.LANCZOS)
    im.save(dst, "WEBP", quality=88, method=6)


def resize(src: str, dst: str, width: int) -> None:
    im = Image.open(src).convert("RGB")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(dst, "WEBP", quality=80, method=6)


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("mode", choices=["key", "fit"])
    p.add_argument("src")
    p.add_argument("dst")
    p.add_argument("--size", type=int, default=512)
    p.add_argument("--width", type=int, default=1600)
    a = p.parse_args()
    if a.mode == "key":
        key(a.src, a.dst, a.size)
    else:
        resize(a.src, a.dst, a.width)
    print(a.dst)
