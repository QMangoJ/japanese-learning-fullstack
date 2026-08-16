#!/usr/bin/env python3
"""Crop book-page illustrations for N3 listening chapters 4–5."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PAGES = ROOT / "public/listening/n3/pages"
OUT = ROOT / "public/listening/n3/figures"

# page jpgs are 888×1300. boxes are (left, top, right, bottom)
CROPS = {
	"ch4-s1-q1.jpg": ("056.jpg", (48, 210, 640, 640)),
	"ch4-s2-q1.jpg": ("058.jpg", (48, 200, 680, 560)),
	"ch4-s3-q1.jpg": ("060.jpg", (70, 200, 680, 600)),
	"ch4-s5-q1.jpg": ("063.jpg", (80, 300, 780, 720)),
	"ch5-s1-q1.jpg": ("067.jpg", (40, 320, 840, 840)),
	"ch5-s4-q1.jpg": ("073.jpg", (70, 230, 820, 500)),
	"ch5-s4-q2.jpg": ("073.jpg", (60, 530, 830, 810)),
	"ch5-s4-q3.jpg": ("073.jpg", (50, 840, 840, 1180)),
}


def main() -> None:
	OUT.mkdir(parents=True, exist_ok=True)
	for name, (page, box) in CROPS.items():
		src = Image.open(PAGES / page).convert("RGB")
		crop = src.crop(box)
		dest = OUT / name
		crop.save(dest, "JPEG", quality=88, optimize=True)
		print(f"{name}: {crop.size} from {page} {box}")


if __name__ == "__main__":
	main()
