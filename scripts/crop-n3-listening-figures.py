#!/usr/bin/env python3
"""Crop book-page illustrations for N3 listening chapters 1–5."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PAGES = ROOT / "public/listening/n3/pages"
OUT = ROOT / "public/listening/n3/figures"

# page jpgs are 888×1300. boxes are (left, top, right, bottom)
CROPS = {
	# chapter 1 teaching birds
	"ch1-s1-example.jpg": ("015.jpg", (480, 190, 870, 385)),
	"ch1-s2-example.jpg": ("017.jpg", (280, 185, 870, 420)),
	"ch1-s3-example.jpg": ("019.jpg", (300, 175, 760, 375)),
	"ch1-s4-example.jpg": ("021.jpg", (300, 175, 870, 400)),
	# chapter 3 teaching birds / map
	"ch3-s1-example.jpg": ("041.jpg", (360, 175, 870, 400)),
	"ch3-s2-example.jpg": ("043.jpg", (380, 175, 870, 385)),
	"ch3-s2-map.jpg": ("043.jpg", (448, 318, 852, 625)),
	"ch3-s4-example.jpg": ("047.jpg", (165, 195, 870, 395)),
	"ch3-s5-example.jpg": ("049.jpg", (240, 185, 870, 420)),
	# chapter 3 practice figures
	"ch3-s1-q1.jpg": ("042.jpg", (48, 248, 720, 690)),
	"ch3-s2-q1.jpg": ("044.jpg", (36, 248, 720, 730)),
	"ch3-s3-q1.jpg": ("046.jpg", (28, 228, 740, 730)),
	"ch3-s4-q1.jpg": ("048.jpg", (42, 238, 745, 685)),
	"ch3-s6-q1.jpg": ("051.jpg", (30, 300, 860, 580)),
	# chapters 4–5 (existing)
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
