#!/usr/bin/env python3
"""Attach sentence vocabulary glosses to N2/N3/N4 grammar daily + exam explanations."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "public/data"
RUBY = re.compile(r"<ruby>([^<]*)<rt>([^<]*)</rt></ruby>", re.I)
SKIP = {
	"これ", "それ", "あれ", "どれ", "ここ", "そこ", "あそこ", "どこ",
	"この", "その", "あの", "どの", "こう", "そう", "ああ", "どう",
	"もの", "こと", "ため", "よう", "とき", "とき", "ところ", "ほう",
	"さん", "くん", "ちゃん", "です", "ます", "した", "して",
}

JOBS = [
	(DATA / "grammar.d15be04258.json", DATA / "n3-grammar-daily-explanations.json", DATA / "n3-grammar-explanations.json"),
	(DATA / "n2grammar.4e6157570a.json", DATA / "n2-grammar-daily-explanations.json", DATA / "n2-grammar-explanations.json"),
	(DATA / "n4grammar.40e138ccdb.json", DATA / "n4-grammar-daily-explanations.json", DATA / "n4-grammar-explanations.json"),
]
VOCAB_BOOKS = [
	DATA / "vocab.856eb48e32.json",
	DATA / "n2vocab.4e440284d9.json",
	DATA / "n4vocab.026f711eb7.json",
	DATA / "kanji.e43232869e.json",
	DATA / "n2kanji.d9739ca8d4.json",
	DATA / "n4kanji.655356d8e2.json",
]


def strip_ruby(html: str) -> str:
	return RUBY.sub(r"\1", html or "")


def rubies(html: str) -> list[tuple[str, str]]:
	return [(base.strip(), reading.strip()) for base, reading in RUBY.findall(html or "") if base.strip()]


def add_entry(lex: dict[str, dict], jp: str, kana: str, cn: str, en: str) -> None:
	jp = (jp or "").strip()
	if not jp:
		return
	if len(jp) < 2 and not re.search(r"[一-龯]", jp):
		return
	cn = (cn or "").strip()
	en = (en or "").strip()
	if re.search(r"[。！？.!?]$", cn) or len(cn) > 14 or re.search(r"[让是有会要把被的]", cn) and len(cn) > 6:
		cn = ""
	if re.search(r"[.!?]$", en) or len(en.split()) > 5:
		en = ""
	entry = {"jp": jp, "kana": (kana or "").strip(), "cn": cn, "en": en}
	if not entry["cn"] and not entry["en"]:
		return
	for key in {jp, jp.replace("する", ""), jp.replace("（", "").replace("）", "")}:
		if key and key not in lex:
			lex[key] = entry


COMMON = [
	("車", "くるま", "车", "car"),
	("母", "はは", "母亲", "mother"),
	("父", "ちち", "父亲", "father"),
	("本", "ほん", "书", "book"),
	("人", "ひと", "人", "person"),
	("山", "やま", "山", "mountain"),
	("川", "かわ", "河", "river"),
	("今", "いま", "现在", "now"),
	("何", "なに", "什么", "what"),
	("時", "とき", "时候", "time"),
	("分", "ふん", "分钟", "minute"),
	("年", "とし", "年", "year"),
	("月", "つき", "月", "month / moon"),
	("日", "ひ", "日", "day"),
	("日本", "にほん", "日本", "Japan"),
	("日本語", "にほんご", "日语", "Japanese"),
	("英語", "えいご", "英语", "English"),
	("学校", "がっこう", "学校", "school"),
	("先生", "せんせい", "老师", "teacher"),
	("学生", "がくせい", "学生", "student"),
	("友達", "ともだち", "朋友", "friend"),
	("会社", "かいしゃ", "公司", "company"),
	("仕事", "しごと", "工作", "work"),
	("電車", "でんしゃ", "电车", "train"),
	("駅", "えき", "车站", "station"),
	("家", "いえ", "家", "house"),
	("天気", "てんき", "天气", "weather"),
	("病気", "びょうき", "生病", "illness"),
	("時間", "じかん", "时间", "time"),
	("気持ち", "きもち", "心情", "feeling"),
	("気味", "きみ", "倾向", "a touch of"),
	("世界", "せかい", "世界", "world"),
	("話", "はなし", "话／说话", "talk"),
	("考える", "かんがえる", "考虑", "to think"),
	("休む", "やすむ", "休息", "to rest"),
	("働く", "はたらく", "工作", "to work"),
]


def harvest_vocab(lex: dict[str, dict]) -> None:
	for jp, kana, cn, en in COMMON:
		add_entry(lex, jp, kana, cn, en)
	for path in VOCAB_BOOKS:
		if not path.exists():
			continue
		book = json.loads(path.read_text(encoding="utf-8"))
		for week in book.get("weeks") or []:
			for day in week.get("days") or []:
				for sec in day.get("sections") or []:
					for item in sec.get("items") or []:
						add_entry(lex, item.get("jp"), item.get("reading") or item.get("kana"), item.get("cn"), item.get("en"))
				for kanji in day.get("kanji") or []:
					for word in kanji.get("words") or []:
						add_entry(lex, word.get("jp"), word.get("reading") or word.get("kana"), word.get("cn"), word.get("en"))


def harvest_grammar_examples(lex: dict[str, dict], book: dict) -> None:
	for week in book.get("weeks") or []:
		for day in week.get("days") or []:
			for point in day.get("points") or []:
				for ex in point.get("examples") or []:
					pairs = rubies(ex.get("jp_r") or "")
					cn = ex.get("cn") or ""
					en = ex.get("en") or ""
					for base, reading in pairs:
						if base in lex:
							continue
						# keep only if we already know it; examples don't split word translations
						_ = (reading, cn, en)


def lookup(lex: dict[str, dict], base: str) -> dict | None:
	for key in (base, base.replace("する", ""), re.sub(r"[するたているだ]$", "", base)):
		if key in lex:
			return lex[key]
	if len(base) >= 3 and base[:-1] in lex:
		return lex[base[:-1]]
	return None


def words_from_html(lex: dict[str, dict], html: str) -> list[dict]:
	seen: set[str] = set()
	out: list[dict] = []
	for base, reading in rubies(html):
		if base in SKIP or base in seen:
			continue
		if not re.search(r"[一-龯ァ-ン]", base) and len(base) < 2:
			continue
		hit = lookup(lex, base)
		if not hit:
			continue
		seen.add(base)
		out.append({"jp": hit["jp"], "kana": hit["kana"] or reading, "cn": hit["cn"], "en": hit["en"]})
	return out[:8]


def attach_daily(lex: dict[str, dict], book: dict, daily: dict) -> int:
	count = 0
	for week in book.get("weeks") or []:
		for day in week.get("days") or []:
			if day.get("day") == 7:
				continue
			key = f"w{week['n']}d{day['day']}"
			pack = daily.get(key)
			if not pack:
				continue
			items = []
			for sec in (day.get("exercises") or {}).get("sections") or []:
				items.extend(sec.get("items") or [])
			for src, info in zip(items, pack.get("items") or []):
				words = words_from_html(lex, src.get("q_r") or "")
				info["words"] = words
				if words:
					count += 1
	return count


def attach_exam(lex: dict[str, dict], book: dict, exam: dict) -> int:
	count = 0
	for week in book.get("weeks") or []:
		day = next((d for d in week.get("days") or [] if d.get("day") == 7), None)
		if not day:
			continue
		pack = exam.get(f"w{week['n']}") or {}
		for section in ("mondai1", "mondai2", "mondai3"):
			src_items = (day.get(section) or {}).get("items") or []
			dst_items = pack.get(section) or []
			by_n = {it.get("n"): it for it in dst_items}
			for src in src_items:
				dst = by_n.get(src.get("n"))
				if not dst:
					continue
				words = words_from_html(lex, src.get("q_r") or "")
				dst["words"] = words
				if words:
					count += 1
	return count


def main() -> None:
	lex: dict[str, dict] = {}
	harvest_vocab(lex)
	print(f"lexicon {len(lex)}")
	for book_path, daily_path, exam_path in JOBS:
		book = json.loads(book_path.read_text(encoding="utf-8"))
		daily = json.loads(daily_path.read_text(encoding="utf-8"))
		exam = json.loads(exam_path.read_text(encoding="utf-8"))
		d = attach_daily(lex, book, daily)
		e = attach_exam(lex, book, exam)
		daily_path.write_text(json.dumps(daily, ensure_ascii=False, indent="\t") + "\n", encoding="utf-8")
		exam_path.write_text(json.dumps(exam, ensure_ascii=False, indent="\t") + "\n", encoding="utf-8")
		print(f"{book_path.name}: daily {d} exam {e}")


if __name__ == "__main__":
	main()
