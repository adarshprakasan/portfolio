#!/usr/bin/env python3
"""
Turn a portrait into the 66 x 53, 1-bit, base64-packed frames that
components/ui/loading-animation.tsx expects.

    python scripts/make-frames.py --image me.jpg --out data/intro-frames.ts

The photo should be:
  * a head-and-shoulders crop, facing the camera
  * shot against a plain background that is either clearly lighter or
    clearly darker than you (the script masks the background automatically;
    override with --bg light|dark)
  * evenly lit, no hard shadow on one side of the face

A single still cannot really turn, so a turn is simulated: each frame
squeezes the subject horizontally (cos of the angle), mirrors it past 90
degrees and shifts the light across it. Good enough for a 1-bit silhouette
at this size; if you ever shoot a real turntable sequence, pass the frames
directly instead.

--placeholder draws a stand-in bust, so the component can be wired up and
previewed before the real photo exists.
"""

import argparse
import base64
import math
import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageOps

GW, GH = 66, 53


# ---------------------------------------------------------------- masking
def background_colour(img):
    """Average the four corners: the background is usually what is there."""
    w, h = img.size
    pts = [(2, 2), (w - 3, 2), (2, h - 3), (w - 3, h - 3)]
    px = [img.getpixel(p) for p in pts]
    return tuple(sum(c[i] for c in px) / len(px) for i in range(3))


def subject_mask(img, bg_mode):
    """Return an L-mode mask: 255 where the subject is."""
    rgb = img.convert("RGB")
    w, h = rgb.size
    bg = background_colour(rgb)
    bg_lum = sum(bg) / 3
    px = rgb.load()
    mask = Image.new("L", (w, h), 0)
    m = mask.load()

    # threshold on distance from the background colour, plus a luminance
    # vote so a shaded cheek is not mistaken for background
    tol = 46
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            d = math.sqrt((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2)
            lum = (r * 299 + g * 587 + b * 114) / 1000
            darker = lum < bg_lum - 18 if bg_mode != "dark" else lum > bg_lum + 18
            if d > tol or darker:
                m[x, y] = 255

    # fill pinholes, then feather so the 1-bit dither does not chew the edge
    mask = mask.filter(ImageFilter.MedianFilter(5))
    mask = mask.filter(ImageFilter.GaussianBlur(1.2))
    return mask


def crop_to_subject(img, mask):
    box = mask.getbbox()
    if not box:
        return img, mask
    pad = int(0.06 * max(box[2] - box[0], box[3] - box[1]))
    x0 = max(0, box[0] - pad)
    y0 = max(0, box[1] - pad)
    x1 = min(img.width, box[2] + pad)
    y1 = min(img.height, box[3] + pad)
    return img.crop((x0, y0, x1, y1)), mask.crop((x0, y0, x1, y1))


# ---------------------------------------------------------------- frames
def bayer4(x, y):
    m = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5],
    ]
    return (m[y % 4][x % 4] + 0.5) / 16


def render_cell(subject, mask, angle):
    """One 66 x 53 frame: the subject squeezed to `angle`, lit from one side."""
    squeeze = math.cos(angle)
    flip = squeeze < 0
    sx = max(0.14, abs(squeeze))

    # fit the crop into the grid with a little headroom
    tw = max(2, int(round(subject.width * sx)))
    th = subject.height
    scale = min((GH - 2) / th, (GW - 2) / tw)
    tw = max(2, int(round(tw * scale)))
    th = max(2, int(round(th * scale)))

    art = subject.resize((tw, th), Image.LANCZOS)
    cover = mask.resize((tw, th), Image.LANCZOS)
    if flip:
        art = ImageOps.mirror(art)
        cover = ImageOps.mirror(cover)

    canvas = Image.new("RGBA", (GW, GH), (0, 0, 0, 0))
    ox = (GW - tw) // 2
    oy = GH - th  # sit the bust on the bottom edge
    canvas.paste(art, (ox, oy), cover)

    # light travels with the turn, which is what sells the rotation
    light = 0.55 + 0.45 * abs(math.cos(angle * 0.5))
    shade = Image.new("L", (GW, GH), 0)
    sd = ImageDraw.Draw(shade)
    for x in range(GW):
        # a soft side light, moving with the angle
        k = (x / (GW - 1)) - (0.5 + 0.35 * math.sin(angle))
        v = int(255 * max(0.0, 1 - abs(k) * 1.5) * light)
        sd.line([(x, 0), (x, GH)], fill=v)

    px = canvas.load()
    sp = shade.load()
    out = Image.new("L", (GW, GH), 0)
    op = out.load()
    for y in range(GH):
        for x in range(GW):
            r, g, b, a = px[x, y]
            if a < 90:
                continue
            lum = (r * 299 + g * 587 + b * 114) / 1000
            # 1-bit ordered dither: dark cells fill, light cells stay open,
            # so the face is read from shadow rather than from outlines
            value = max(0.0, min(255.0, lum * (0.45 + 0.75 * (sp[x, y] / 255))))
            op[x, y] = 255 if value < bayer4(x, y) * 255 else 0
    return out


def pack(frame):
    """One continuous bitstream, row-major, MSB first, padded to a byte."""
    out = bytearray()
    acc = 0
    bits = 0
    for y in range(GH):
        for x in range(GW):
            acc = (acc << 1) | (1 if frame.getpixel((x, y)) > 127 else 0)
            bits += 1
            if bits % 8 == 0:
                out.append(acc)
                acc = 0
    if bits % 8:
        out.append(acc << (8 - (bits % 8)))
    return base64.b64encode(bytes(out)).decode()


# ---------------------------------------------------------------- placeholder
def placeholder():
    """A bust drawn from scratch: safe to ship while the real photo is pending."""
    w = h = 900
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    # shoulders
    d.ellipse((140, 560, 760, 1100), fill=(52, 56, 64, 255))
    # neck
    d.rectangle((380, 470, 520, 620), fill=(150, 106, 76, 255))
    # head
    d.ellipse((300, 150, 600, 520), fill=(178, 128, 92, 255))
    # hair
    d.ellipse((292, 130, 608, 330), fill=(28, 26, 24, 255))
    # face again, so the hair sits behind it
    d.ellipse((308, 250, 592, 500), fill=(178, 128, 92, 255))
    # ears + collar
    d.ellipse((282, 300, 322, 360), fill=(160, 112, 80, 255))
    d.ellipse((578, 300, 618, 360), fill=(160, 112, 80, 255))
    d.polygon([(360, 570), (540, 570), (500, 660), (400, 660)], fill=(236, 231, 219, 255))
    img = img.filter(ImageFilter.GaussianBlur(1.2))
    return img, img.getchannel("A")


# ---------------------------------------------------------------- main
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--image")
    ap.add_argument("--out", default="data/intro-frames.ts")
    ap.add_argument("--frames", type=int, default=24)
    ap.add_argument("--bg", choices=["auto", "light", "dark"], default="light")
    ap.add_argument("--placeholder", action="store_true")
    ap.add_argument("--ascii", action="store_true")
    args = ap.parse_args()

    if args.placeholder:
        img, mask = placeholder()
    elif args.image:
        img = Image.open(args.image).convert("RGB")
        mask = subject_mask(img, args.bg)
        img, mask = crop_to_subject(img, mask)
    else:
        sys.exit("pass --image path/to/portrait.jpg or --placeholder")

    frames = [render_cell(img, mask, (i / args.frames) * 2 * math.pi) for i in range(args.frames)]
    packed = [pack(f) for f in frames]

    if args.ascii:
        for row in range(0, GH, 2):
            print("".join("#" if frames[0].getpixel((x, row)) > 127 else "." for x in range(GW)))

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    body = ",\n  ".join('"' + p + '"' for p in packed)
    with open(args.out, "w", encoding="utf-8") as fh:
        fh.write(
            "// Generated by scripts/make-frames.py. 66 x 53, 1 bit per cell, row-major, MSB first.\n"
            "// Regenerate from your own portrait; do not ship a likeness you do not own.\n"
            "export const INTRO_FRAMES: string[] = [\n  "
            + body
            + ",\n];\n"
        )
    print(f"{len(packed)} frames -> {args.out}")


if __name__ == "__main__":
    main()
