#!/usr/bin/env python3
"""Build N4 daily-exercise explanations from n4grammar book + hand translations."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BOOK = ROOT / "public/data/n4grammar.40e138ccdb.json"
OUT = ROOT / "public/data/n4-grammar-daily-explanations.json"
CIRCLED = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳"

# key: "w1d1-1" -> [cn, en]
TRANSLATIONS: dict[str, list[str]] = {}


def parse_answers(text: str) -> dict[int, str]:
	out: dict[int, str] = {}
	if not text:
		return out
	for match in re.finditer(r"([①-⑳])\s*([^\s①-⑳]+)", text):
		out[CIRCLED.index(match.group(1)) + 1] = match.group(2).strip("　。")
	return out


def option_text(raw: str) -> str:
	return re.sub(r"^\s*[1-4]\s*", "", raw or "").strip()


def complete_choice(q: str, answer: str, options: list[str]) -> str:
	if not answer or not options:
		return q
	letters = re.findall(r"[1-4]", answer)
	if not letters:
		return q
	idx = int(letters[0]) - 1
	if idx < 0 or idx >= len(options):
		return q
	fill = option_text(options[idx])
	parts = [p.strip() for p in re.split(r"[／/]", fill) if p.strip()]
	result = q
	for part in parts:
		replaced = re.sub(r"（[ 　]*）", part, result, count=1)
		if replaced == result:
			break
		result = replaced
	return result


def complete_order(q: str, answer: str, options: list[str]) -> str:
	parts = [option_text(options[int(n) - 1]) for n in re.findall(r"[1-4]", answer or "") if 1 <= int(n) <= len(options)]
	result = q
	for part in parts:
		result = re.sub(r"＿＿|★", part, result, count=1)
	return re.sub(r"[ 　]+", "", result).strip()


def guess_point_indexes(day: dict, n: int, q: str, answer: str) -> list[int]:
	points = day.get("points") or []
	if not points:
		return []
	text = q + answer
	hits = []
	for i, point in enumerate(points):
		pat = str(point.get("pattern") or "")
		keys = [pat]
		for chunk in re.split(r"[／・、，\s]+", pat):
			if len(chunk) >= 2:
				keys.append(chunk)
		if any(k and k in text for k in keys):
			hits.append(i)
	if hits:
		return hits
	return [min(n - 1, len(points) - 1)]


def build_day(week_n: int, day: dict) -> dict | None:
	if day.get("day") == 7:
		return None
	ex = day.get("exercises") or {}
	answers = parse_answers(ex.get("answers") or "")
	items = []
	key_base = f"w{week_n}d{day['day']}"
	for sec in ex.get("sections") or []:
		kind = "order" if sec.get("type") == "order" else "choice"
		for it in sec.get("items") or []:
			n = it["n"]
			ans = answers.get(n, "")
			qtext = it.get("q") or ""
			opts = it.get("options") or it.get("opts") or []
			completed = complete_order(qtext, ans, opts) if kind == "order" else complete_choice(qtext, ans, opts)
			cn_en = TRANSLATIONS.get(f"{key_base}-{n}", ["", ""])
			items.append(
				{
					"n": n,
					"type": kind,
					"answer": ans,
					"completed": completed or qtext,
					"translation": cn_en[0],
					"translation_en": cn_en[1],
					"pointIndexes": guess_point_indexes(day, n, qtext, ans),
				}
			)
	return {"items": items}


def load_translations() -> None:
	from n4_grammar_daily_cn import DAILY

	TRANSLATIONS.update(DAILY)


def main() -> None:
	load_translations()
	book = json.loads(BOOK.read_text(encoding="utf-8"))
	out: dict[str, dict] = {}
	missing = []
	for week in book.get("weeks") or []:
		for day in week.get("days") or []:
			pack = build_day(week["n"], day)
			if not pack:
				continue
			key = f"w{week['n']}d{day['day']}"
			out[key] = pack
			for item in pack["items"]:
				if not item["translation"] or not item["translation_en"]:
					missing.append(f"{key}-{item['n']}|{item['completed']}")
	OUT.write_text(json.dumps(out, ensure_ascii=False, indent="\t") + "\n", encoding="utf-8")
	print(f"Wrote {OUT.name}: {sum(len(v['items']) for v in out.values())} items, missing {len(missing)}")
	for line in missing:
		print("MISSING", line)


if __name__ == "__main__":
	import sys

	sys.path.insert(0, str(Path(__file__).resolve().parent))
	main()
