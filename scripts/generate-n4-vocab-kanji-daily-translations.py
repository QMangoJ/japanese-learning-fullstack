#!/usr/bin/env python3
"""Build public/data/n4-vocab-kanji-daily-translations.json from n4_vk_cn.py."""

from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from n4_vk_cn import KANJI, VOCAB

ROOT = Path(__file__).resolve().parent.parent
VOCAB_BOOK = ROOT / "public/data/n4vocab.026f711eb7.json"
KANJI_BOOK = ROOT / "public/data/n4kanji.655356d8e2.json"
OUT = ROOT / "public/data/n4-vocab-kanji-daily-translations.json"


def daily_items(book: dict) -> dict[str, list[int]]:
	out: dict[str, list[int]] = {}
	for week in book.get("weeks") or []:
		for day in week.get("days") or []:
			if day.get("day") == 7:
				continue
			key = f"w{week['n']}d{day['day']}"
			nums = []
			for section in (day.get("exercises") or {}).get("sections") or []:
				for item in section.get("items") or []:
					nums.append(item["n"])
			out[key] = nums
	return out


def pack(label: str, source: dict[str, list[int]], translations: dict[str, list[list[str]]]) -> dict:
	packed = {}
	for key, nums in source.items():
		lines = translations.get(key)
		if not lines:
			raise SystemExit(f"{label} {key}: missing translations")
		if len(lines) != len(nums):
			raise SystemExit(f"{label} {key}: expected {len(nums)} translations, got {len(lines)}")
		packed[key] = {
			"items": [
				{"n": n, "translation": pair[0], "translation_en": pair[1]}
				for n, pair in zip(nums, lines)
			]
		}
	return packed


def main() -> None:
	vocab = json.loads(VOCAB_BOOK.read_text(encoding="utf-8"))
	kanji = json.loads(KANJI_BOOK.read_text(encoding="utf-8"))
	payload = {
		"version": 1,
		"vocab": pack("vocab", daily_items(vocab), VOCAB),
		"kanji": pack("kanji", daily_items(kanji), KANJI),
	}
	OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
	print(
		f"Wrote {OUT.relative_to(ROOT)} "
		f"({sum(len(v['items']) for v in payload['vocab'].values())} vocab + "
		f"{sum(len(v['items']) for v in payload['kanji'].values())} kanji)"
	)


if __name__ == "__main__":
	main()
