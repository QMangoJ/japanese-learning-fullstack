#!/usr/bin/env python3
"""Build weekend 实战 explanations for N4 vocab/kanji."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from n4_vk_exam_cn import KANJI_EXAM, VOCAB_EXAM

ROOT = Path(__file__).resolve().parents[1]
MARKS = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳"
PAT = re.compile("([" + MARKS + r"])\s*(\d)")


def parse_ans(s: str) -> dict[int, int]:
	out: dict[int, int] = {}
	for match in PAT.finditer(s or ""):
		out[MARKS.index(match.group(1)) + 1] = int(match.group(2))
	return out


def collect(book_path: Path) -> list[dict]:
	book = json.loads(book_path.read_text(encoding="utf-8"))
	rows = []
	for week in book["weeks"]:
		day = next(d for d in week["days"] if d.get("day") == 7)
		ans = parse_ans(day.get("answers") or "")
		for key in ("mondai1", "mondai2", "mondai3", "mondai4"):
			for item in ((day.get(key) or {}).get("items") or []):
				opts = item.get("opts") or item.get("options") or []
				rows.append({"w": week["n"], "n": item["n"], "q": item.get("q") or "", "opts": opts, "ans": ans.get(item["n"])})
	return rows


def pack(rows: list[dict], table: dict[str, dict]) -> dict[str, list]:
	by_week: dict[str, list] = {}
	missing = []
	for row in rows:
		key = f"{row['w']}-{row['n']}"
		trans = table.get(key)
		if not trans:
			missing.append(key)
			trans = {"cn": "", "en": "", "opts_cn": [""] * len(row["opts"]), "opts_en": [""] * len(row["opts"])}
		opts = row["opts"]
		by_week.setdefault(f"w{row['w']}", []).append(
			{
				"n": row["n"],
				"ans": row["ans"],
				"trans": trans.get("cn", ""),
				"trans_en": trans.get("en", ""),
				"option_translations": trans.get("opts_cn") or [""] * len(opts),
				"option_translations_en": trans.get("opts_en") or [""] * len(opts),
				"point": trans.get("point", ""),
				"point_en": trans.get("point_en", ""),
				"why": [""] * max(len(opts), 1),
				"why_en": [""] * max(len(opts), 1),
			}
		)
	if missing:
		raise SystemExit(f"missing translations: {missing[:12]} ({len(missing)} total)")
	return by_week


def main() -> None:
	vocab_rows = collect(ROOT / "public/data/n4vocab.026f711eb7.json")
	kanji_rows = collect(ROOT / "public/data/n4kanji.655356d8e2.json")
	(ROOT / "public/data/n4-vocab-exam-explanations.json").write_text(
		json.dumps(pack(vocab_rows, VOCAB_EXAM), ensure_ascii=False, indent="\t") + "\n",
		encoding="utf-8",
	)
	(ROOT / "public/data/n4-kanji-exam-explanations.json").write_text(
		json.dumps(pack(kanji_rows, KANJI_EXAM), ensure_ascii=False, indent="\t") + "\n",
		encoding="utf-8",
	)
	print(f"Wrote exam explanations ({len(vocab_rows)} vocab + {len(kanji_rows)} kanji)")


if __name__ == "__main__":
	main()
