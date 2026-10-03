#!/usr/bin/env python3
"""Generate furigana for the grammar summary 「相似表达」 section (N3 and N2).

Sources (listed by scripts/list-similar-japanese.mts):
  * app/data/n3-related-grammar.ts   N3 cross-level rows: form + example sentence
  * app/data/n2-summary-related.ts   N2 cross-level rows: form + example sentence
  * public/data/n2-grammar-similar.json  N2 same-level items: form, against, example

Readings come from Fugashi + UniDic Lite at generation time only (the app ships the
reviewed lookup, no runtime tokenizer). Context-dependent or grammar-specific readings
are fixed by FORCED_READINGS / CONTEXT_OVERRIDES below, which were checked by hand.
Output: app/data/similar-furigana.ts, a {plain text: ruby HTML} lookup in the same
<ruby>漢字<rt>よみ</rt></ruby> format as the book data's *_r fields.

  /workspace/venv-n1/bin/python scripts/generate-similar-furigana.py [--report]

--report prints every annotated string (for review) and readings that differ from the
ones used in the book's own ruby data (public/data/*grammar*.json).
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
from pathlib import Path

from fugashi import Tagger

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "app/data/similar-furigana.ts"
KANJI_RE = re.compile(r"[一-龯々〆ヵヶ]")
KANJI_GROUP_RE = re.compile(r"([一-龯々〆ヵヶ]+)")
KANA_ONLY_RE = re.compile(r"^[\u3041-\u309f\u30a0-\u30ffー]+$")
RUBY_RE = re.compile(r"<ruby>([^<]*)<rt>([^<]*)</rt></ruby>")
# Parenthesised notes in pattern names: （样态） etc. are Chinese labels, （は）／（に） are optional kana.
PAREN_RE = re.compile(r"（[^（）]*）")

# Surface → reading where UniDic's default is wrong for these grammar patterns / sentences.
FORCED_READINGS = {
	"私": "わたし",
	"今日": "きょう",
	"明日": "あした",
	"昨日": "きのう",
	"一人": "ひとり",
	"二人": "ふたり",
	"日本": "にほん",
	"何": "なに",
	"方": "かた",
	"気味": "ぎみ",  # only used as the suffix ～気味 here
}

# Applied to the generated ruby (written as {漢字|よみ}); each (wrong, right) was checked against the sentence.
CONTEXT_OVERRIDES_BRACES: list[tuple[str, str]] = [
	("{一人|ひとり}で{一日|ついたち}", "{一人|ひとり}で{一日|いちにち}"),
	("{一|いち}{日|にち}", "{一日|いちにち}"),
	("{三|みっ}{日間|かかん}", "{三日間|みっかかん}"),
	("{十|とお}{日|か}", "{十日|とおか}"),
	("{十|じゅう}{一|いち}{時|じ}", "{十一時|じゅういちじ}"),
	("{九|きゅう}{時|じ}", "{九時|くじ}"),
	("{一|いち}{晩|ばん}", "{一晩|ひとばん}"),
	("{一|いち}{本|ぽん}", "{一本|いっぽん}"),
	("30{分|ふん}", "{30分|さんじゅっぷん}"),
	("{何|なに}{度|ど}", "{何度|なんど}"),
	("{外国|がいこく}{人|にん}", "{外国人|がいこくじん}"),
	("{先生|せんせい}{方|かた}", "{先生方|せんせいがた}"),
	("{月曜|げつよう}{日|ひ}", "{月曜日|げつようび}"),
	("{金曜|きんよう}{日|ひ}", "{金曜日|きんようび}"),
	("{休館|きゅうかん}{日|ひ}", "{休館日|きゅうかんび}"),
	("{今日|きょう}{中|ちゅう}", "{今日中|きょうじゅう}"),
	("{図書|としょ}{館|かん}", "{図書館|としょかん}"),
	("{桜|さくら}{通|とお}り", "{桜|さくら}{通|どお}り"),
	("{家|いえ}に{入|い}れなかった", "{家|いえ}に{入|はい}れなかった"),
	("{彼|かれ}が{入|い}れるはずがない", "{彼|かれ}が{入|はい}れるはずがない"),
	("それで{入|い}れないわけだ", "それで{入|はい}れないわけだ"),
]
# Whole pattern names whose reading depends on the grammar sense.
FORM_OVERRIDES = {
	"～末（に）": "～{末|すえ}（に）",
	"～間に": "～{間|あいだ}に",
}


def braces_to_html(value: str) -> str:
	return re.sub(r"\{([^{}|]+)\|([^{}|]+)\}", r"<ruby>\1<rt>\2</rt></ruby>", value)


CONTEXT_OVERRIDES = [(braces_to_html(a), braces_to_html(b)) for a, b in CONTEXT_OVERRIDES_BRACES]


def to_hiragana(value: str) -> str:
	return "".join(chr(ord(c) - 0x60) if "ァ" <= c <= "ヶ" else c for c in value)


def ruby(base: str, reading: str) -> str:
	return f"<ruby>{base}<rt>{reading}</rt></ruby>"


def align(segments: list[str], reading: str, si: int = 0, ri: int = 0):
	if si == len(segments):
		return [] if ri == len(reading) else None
	seg = segments[si]
	if not KANJI_GROUP_RE.fullmatch(seg):
		anchor = to_hiragana(seg)
		if not reading.startswith(anchor, ri):
			return None
		rest = align(segments, reading, si + 1, ri + len(anchor))
		return None if rest is None else [(seg, None), *rest]
	for end in range(ri + 1, len(reading) + 1):
		rest = align(segments, reading, si + 1, end)
		if rest is not None:
			return [(seg, reading[ri:end]), *rest]
	return None


def annotate_surface(surface: str, reading: str, unresolved: set[str]) -> str:
	if not KANJI_RE.search(surface):
		return surface
	if not reading or reading == "*":
		unresolved.add(surface)
		return surface
	hira = to_hiragana(reading)
	segments = [s for s in KANJI_GROUP_RE.split(surface) if s]
	aligned = align(segments, hira)
	if aligned is None:
		return ruby(surface, hira)
	return "".join(ruby(s, r) if r else s for s, r in aligned)


def annotate_plain(tagger: Tagger, text: str, unresolved: set[str]) -> str:
	parts: list[str] = []
	cursor = 0
	for token in tagger(text):
		start = text.find(token.surface, cursor)
		if start < 0:
			raise ValueError(f"Could not align token {token.surface!r} in {text!r}")
		parts.append(text[cursor:start])
		reading = FORCED_READINGS.get(token.surface) or getattr(token.feature, "kana", "") or ""
		parts.append(annotate_surface(token.surface, reading, unresolved))
		cursor = start + len(token.surface)
	parts.append(text[cursor:])
	return "".join(parts)


def annotate(tagger: Tagger, text: str, unresolved: set[str]) -> str:
	"""Annotate outside （…）; parenthesised Chinese labels and kana stay as they are."""
	if text in FORM_OVERRIDES:
		return braces_to_html(FORM_OVERRIDES[text])
	out: list[str] = []
	cursor = 0
	for m in PAREN_RE.finditer(text):
		out.append(annotate_plain(tagger, text[cursor:m.start()], unresolved) if m.start() > cursor else "")
		out.append(m.group(0))
		cursor = m.end()
	if cursor < len(text):
		out.append(annotate_plain(tagger, text[cursor:], unresolved))
	html = "".join(out)
	for wrong, right in CONTEXT_OVERRIDES:
		html = html.replace(wrong, right)
	# 「～反面（はんめん）」: once ruby is shown, a parenthesised reading that repeats it is dropped.
	html = re.sub(r"<ruby>([^<]*)<rt>([^<]*)</rt></ruby>（([^（）]*)）", lambda m: m.group(0)[: -len(m.group(3)) - 2] if m.group(3) == m.group(2) else m.group(0), html)
	return html


def strip_ruby(html: str) -> str:
	return RUBY_RE.sub(r"\1", html)


def book_readings() -> dict[str, set[str]]:
	seen: dict[str, set[str]] = {}
	for path in (ROOT / "public/data").glob("*grammar*.json"):
		for base, reading in RUBY_RE.findall(path.read_text(encoding="utf-8")):
			seen.setdefault(base, set()).add(reading)
	return seen


def main() -> None:
	parser = argparse.ArgumentParser()
	parser.add_argument("--report", action="store_true")
	args = parser.parse_args()
	listed = subprocess.run(["node", "--experimental-strip-types", "--no-warnings", str(ROOT / "scripts/list-similar-japanese.mts")], check=True, capture_output=True, text=True).stdout
	strings: dict[str, list[dict]] = json.loads(listed)
	tagger = Tagger()
	unresolved: set[str] = set()
	lookup: dict[str, str] = {}
	for text in sorted(strings):
		if not KANJI_RE.search(text):
			continue
		html = annotate(tagger, text, unresolved)
		plain = strip_ruby(html)
		if plain != text and not re.sub(r"（[\u3041-\u309f]+）", "", text) == plain:
			raise ValueError(f"Furigana changed source text: {text!r} -> {html!r}")
		if html != text:
			lookup[text] = html
	unused = [a for a, b in CONTEXT_OVERRIDES_BRACES if not any(braces_to_html(b) in html for html in lookup.values())]
	if unused:
		raise SystemExit(f"Override never applied (data changed?): {unused}")
	if unresolved:
		raise SystemExit(f"No reading for: {sorted(unresolved)}")
	payload = json.dumps(lookup, ensure_ascii=False, indent="\t", sort_keys=True)
	OUTPUT.write_text(
		"// Generated by scripts/generate-similar-furigana.py from the 「相似表达」 data. Do not edit by hand.\n"
		"// Plain Japanese text → the same text with <ruby> readings over kanji (RubyHtml format).\n"
		f"export const SIMILAR_FURIGANA: Readonly<Record<string, string>> = {payload};\n\n"
		"/** Ruby HTML for a 相似表达 form or example; falls back to the plain text (kana-only text has no entry). */\n"
		"export function similarFurigana(text: string): string {\n\treturn SIMILAR_FURIGANA[text] ?? text;\n}\n",
		encoding="utf-8",
	)
	counts: dict[str, dict[str, int]] = {}
	for text in lookup:
		for use in strings[text]:
			counts.setdefault(use["level"], {}).setdefault(use["kind"], 0)
			counts[use["level"]][use["kind"]] += 1
	print(f"{len(lookup)} distinct strings annotated → {OUTPUT.relative_to(ROOT)}; uses by level/kind: {counts}")
	if args.report:
		book = book_readings()
		for text, html in lookup.items():
			print(html)
		print("--- readings not seen for the same ruby base in the book data ---")
		for text, html in lookup.items():
			for base, reading in RUBY_RE.findall(html):
				if base in book and reading not in book[base]:
					print(f"{base}: {reading} (book: {'/'.join(sorted(book[base]))})  in {text}")


if __name__ == "__main__":
	main()
