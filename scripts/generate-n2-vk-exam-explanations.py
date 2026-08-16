#!/usr/bin/env python3
"""Build weekend 实战 explanations for N2 vocab/kanji from parsed exam dumps + translations."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MARKS = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕"
PAT = re.compile("([" + MARKS + r"])\s*(\d|[^\s" + MARKS + "]+)")


def parse_ans(s: str) -> dict:
	out: dict = {}
	for match in PAT.finditer(s or ""):
		n = MARKS.index(match.group(1)) + 1
		v = match.group(2)
		out[n] = int(v) if v.isdigit() and 1 <= int(v) <= 4 else v
	return out


def collect(book_path: Path) -> list[dict]:
	book = json.loads(book_path.read_text(encoding="utf-8"))
	rows = []
	for week in book["weeks"]:
		day = next(d for d in week["days"] if d.get("day") == 7)
		ans = parse_ans(day.get("answers") or "")
		for key in ("mondai1", "mondai2", "mondai3", "mondai4"):
			block = day.get(key) or {}
			for item in block.get("items") or []:
				n = item["n"]
				if isinstance(n, str) and "-" in n:
					lo, hi = (int(p) for p in n.split("-"))
					val = [ans.get(i) for i in range(lo, hi + 1)]
				else:
					val = ans.get(n)
				rows.append({"w": week["n"], "n": n, "q": item.get("q") or "", "opts": item.get("opts") or [], "ans": val})
	return rows


def item_payload(row: dict, trans: dict) -> dict:
	opts = row["opts"]
	cn_opts = trans.get("opts_cn") or [""] * len(opts)
	en_opts = trans.get("opts_en") or [""] * len(opts)
	payload = {
		"n": row["n"],
		"ans": row["ans"] if isinstance(row["ans"], int) else None,
		"trans": trans.get("cn", ""),
		"trans_en": trans.get("en", ""),
		"option_translations": cn_opts,
		"option_translations_en": en_opts,
		"point": trans.get("point", ""),
		"point_en": trans.get("point_en", ""),
		"why": [""] * max(len(opts), 1),
		"why_en": [""] * max(len(opts), 1),
	}
	if isinstance(row["ans"], list):
		payload["note"] = "　".join(str(x) for x in row["ans"] if x)
		payload["ans"] = None
	return payload


def pack(rows: list[dict], table: dict[str, dict]) -> dict[str, list]:
	by_week: dict[str, list] = {}
	missing = []
	for row in rows:
		key = f"{row['w']}-{row['n']}"
		trans = table.get(key)
		if not trans:
			missing.append(key)
			trans = {"cn": "", "en": "", "opts_cn": [""] * len(row["opts"]), "opts_en": [""] * len(row["opts"])}
		by_week.setdefault(f"w{row['w']}", []).append(item_payload(row, trans))
	if missing:
		raise SystemExit(f"missing translations: {missing[:12]} ({len(missing)} total)")
	return by_week


def main() -> None:
	from n2_vk_exam_cn import KANJI_EXAM, VOCAB_EXAM

	vocab_rows = collect(ROOT / "public/data/n2vocab.4e440284d9.json")
	kanji_rows = collect(ROOT / "public/data/n2kanji.d9739ca8d4.json")
	(ROOT / "public/data/n2-vocab-exam-explanations.json").write_text(
		json.dumps(pack(vocab_rows, VOCAB_EXAM), ensure_ascii=False, indent="\t") + "\n",
		encoding="utf-8",
	)
	(ROOT / "public/data/n2-kanji-exam-explanations.json").write_text(
		json.dumps(pack(kanji_rows, KANJI_EXAM), ensure_ascii=False, indent="\t") + "\n",
		encoding="utf-8",
	)
	print(f"Wrote exam explanations ({len(vocab_rows)} vocab + {len(kanji_rows)} kanji)")


if __name__ == "__main__":
	import sys

	sys.path.insert(0, str(Path(__file__).resolve().parent))
	main()
