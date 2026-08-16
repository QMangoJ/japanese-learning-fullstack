#!/usr/bin/env python3
"""Merge weeks 5–6 English kaisetsu overlays into the N3 vocab/kanji books."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "public/data"

JOBS = [
	(DATA / "vocab.856eb48e32.json", DATA / "n3-vocab-w56-kaisetsu-en.json"),
	(DATA / "kanji.e43232869e.json", DATA / "n3-kanji-w56-kaisetsu-en.json"),
]


def main() -> None:
	for book_path, overlay_path in JOBS:
		if not overlay_path.exists():
			raise SystemExit(f"missing overlay {overlay_path.name}")
		book = json.loads(book_path.read_text(encoding="utf-8"))
		overlay = json.loads(overlay_path.read_text(encoding="utf-8"))
		for week in book["weeks"]:
			pack = overlay.get(f"w{week['n']}")
			if not pack:
				continue
			day = next(d for d in week["days"] if d.get("day") == 7)
			by_n = {item["n"]: item for item in pack}
			for item in day.get("kaisetsu") or []:
				extra = by_n.get(item["n"])
				if not extra:
					raise SystemExit(f"{book_path.name} w{week['n']} #{item['n']} missing from overlay")
				why = item.get("why") or []
				why_en = extra.get("why_en") or []
				if len(why_en) != len(why):
					raise SystemExit(f"{book_path.name} w{week['n']} #{item['n']} why_en length {len(why_en)} != {len(why)}")
				if not extra.get("trans_en"):
					raise SystemExit(f"{book_path.name} w{week['n']} #{item['n']} missing trans_en")
				item["trans_en"] = extra["trans_en"]
				item["point_en"] = extra.get("point_en") or ""
				item["why_en"] = why_en
		book_path.write_text(json.dumps(book, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
		print(f"merged {overlay_path.name} -> {book_path.name}")


if __name__ == "__main__":
	main()
