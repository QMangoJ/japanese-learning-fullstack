#!/usr/bin/env python3
"""Apply only high-confidence furigana repairs found by the semantic audit.

The source string is always preserved. Context-sensitive replacements are made
only when UniDic sees the same visible token and the old reading is a known bad
reading produced by the legacy character-by-character annotator.
"""

from __future__ import annotations

import json
import argparse
import re
import sys
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

try:
	from fugashi import Tagger
except ImportError as error:  # pragma: no cover - generation-time dependency
	raise SystemExit(
		"Install the audit-only dependencies first: pip install fugashi unidic-lite"
	) from error


ROOT = Path(__file__).resolve().parents[1]
DATA_FILES = (
	"public/data/grammar.d15be04258.json",
	"public/data/vocab.856eb48e32.json",
	"public/data/kanji.e43232869e.json",
	"public/data/n4grammar.40e138ccdb.json",
	"public/data/n4vocab.026f711eb7.json",
	"public/data/n4kanji.655356d8e2.json",
	"public/data/n2grammar.4e6157570a.json",
	"public/data/n2vocab.4e440284d9.json",
	"public/data/n2kanji.d9739ca8d4.json",
)

RUBY_RE = re.compile(r"<ruby>(.*?)<rt>(.*?)</rt></ruby>", re.DOTALL)
TAG_RE = re.compile(r"<[^>]+>")
PAREN_RE = re.compile(r"([（(][^）)]*[）)])")
KANJI_RE = re.compile(r"[\u3400-\u9fff\uf900-\ufaff々〆ヵヶ]")
TAGGER = Tagger()

# (visible base, bad legacy reading, reviewed replacement)
SAFE_REPLACEMENTS = {
	("人", "にん", "ひと"),
	("今日", "こんにち", "きょう"),
	("一日", "ついたち", "いちにち"),
	("君", "くん", "きみ"),
	("彼", "か", "かれ"),
	("出", "い", "で"),          # 出どころ
	("入", "い", "はい"),        # 入る / 入らない
	("入", "にゅう", "はい"),    # 入ろう in legacy distractors
	("来", "こ", "き"),          # 来なさい
	("後", "のち", "ご"),        # 毎食後
	("飯", "めし", "はん"),      # ご飯
	("苦", "く", "にが"),        # 苦み
	("方", "ほう", "かた"),      # 話し方 / 伝え方
	("日", "にち", "ひ"),        # 暖かい日
	("時", "とき", "じ"),        # 8時 / 10時
	("開", "ひら", "あ"),        # 開ける
	("通", "とう", "とお"),      # 通る
	("通", "かよ", "とお"),      # 通った (通る)
	("入", "いっ", "はい"),      # 入って
	("小", "ちー", "ちい"),      # 小さい (legacy long-vowel OCR)
	("日", "にち", "か"),        # 1日 / 2日間
	("日間", "にちかん", "かかん"),
	("怒", "いか", "おこ"),      # 怒る
	("今年", "こんねん", "ことし"),
	("年", "ねん", "とし"),      # その年
	("間", "かん", "あいだ"),
	("間", "ま", "あいだ"),
	("後", "のち", "あと"),
	("歳", "とし", "さい"),
	("降", "お", "ふ"),          # 雨が降る
	("高", "た", "たか"),        # 高かった
	("厳", "いかめ", "きび"),    # 厳しい
	("生", "う", "なま"),        # 生のまま
	("前", "ぜん", "まえ"),
	("大", "おー", "おお"),      # 大きい (legacy long-vowel OCR)
	("金", "きん", "かね"),      # お金
	("箱", "はこ", "ばこ"),      # ごみ箱
	("止", "や", "と"),          # 止められて
	("熱", "あつ", "ねつ"),      # 熱っぽい
	("熱", "あつ", "ねっ"),      # 熱する
	("分別", "ふんべつ", "ぶんべつ"),
	("大", "たい", "おお"),      # 大さじ
	("小", "ちい", "こ"),        # 小さじ
	("通", "とお", "かよ"),      # 教室に通う
	("済", "す", "ず"),          # 送信済み
	("袋", "ふくろ", "ぶくろ"),  # ポリ袋
	("月日", "がっぴ", "つきひ"),
	("愛", "いと", "あい"),      # 愛している
	("悪口", "わるくち", "わるぐち"),
	("出会", "であい", "であ"),  # 出会わない
	("優", "まさ", "すぐ"),      # 優れた
	("汚", "ぎたな", "きたな"),
	("見", "けん", "み"),        # 見る / 見違える
	("割", "さ", "わ"),          # 割って
	("乗", "じょう", "の"),      # 乗った
	("細", "こま", "ほそ"),      # 細くて長い
	("上向", "じょうこう", "うわむ"),
	("代", "か", "だい"),        # チケット代
	("着", "ちゃく", "き"),      # 着やすい
	("上", "あ", "のぼ"),        # 階段を上って
}

GRAMMAR_FORM_RE = re.compile(r"(?:受身|可能|使役|命令|意向|条件|仮定|普通|基本|辞書|ナイ|マス|テ|タ)形")


def hira(text: str) -> str:
	chars: list[str] = []
	for char in unicodedata.normalize("NFKC", text):
		code = ord(char)
		chars.append(chr(code - 0x60) if 0x30A1 <= code <= 0x30F6 else char)
	return "".join(chars)


def visible(text: str) -> str:
	return TAG_RE.sub("", RUBY_RE.sub(lambda match: match.group(1), text))


def token_reading_part(surface: str, reading: str, start: int, end: int) -> str | None:
	"""Return the reading for a surface slice when kana edges make it unambiguous."""
	surface_h = hira(surface)
	reading_h = hira(reading)
	if start == 0 and end == len(surface):
		return reading_h

	prefix = 0
	while prefix < len(surface_h) and prefix < len(reading_h):
		if KANJI_RE.search(surface_h[prefix]) or surface_h[prefix] != reading_h[prefix]:
			break
		prefix += 1

	suffix = 0
	while suffix < len(surface_h) - prefix and suffix < len(reading_h) - prefix:
		left = surface_h[len(surface_h) - suffix - 1]
		right = reading_h[len(reading_h) - suffix - 1]
		if KANJI_RE.search(left) or left != right:
			break
		suffix += 1

	core_end = len(surface) - suffix
	if start == prefix and end == core_end:
		return reading_h[prefix : len(reading_h) - suffix if suffix else None]
	return None


def token_spans(text: str) -> list[tuple[int, int, str, str]]:
	spans: list[tuple[int, int, str, str]] = []
	offset = 0
	for token in TAGGER(text):
		start = text.find(token.surface, offset)
		if start < 0:
			return []
		end = start + len(token.surface)
		kana = getattr(token.feature, "kana", None)
		if kana:
			spans.append((start, end, token.surface, kana))
		offset = end
	return spans


def ruby_positions(annotated: str) -> list[tuple[re.Match[str], int, int]]:
	positions: list[tuple[re.Match[str], int, int]] = []
	offset = 0
	for match in RUBY_RE.finditer(annotated):
		before = TAG_RE.sub("", annotated[offset : match.start()])
		start = (positions[-1][2] if positions else 0) + len(before)
		end = start + len(match.group(1))
		positions.append((match, start, end))
		offset = match.end()
	return positions


def expected_for_span(tokens: list[tuple[int, int, str, str]], start: int, end: int) -> str | None:
	parts: list[str] = []
	covered = start
	for token_start, token_end, surface, reading in tokens:
		if token_end <= start or token_start >= end:
			continue
		part_start = max(start, token_start) - token_start
		part_end = min(end, token_end) - token_start
		part = token_reading_part(surface, reading, part_start, part_end)
		if part is None or token_start + part_start != covered:
			return None
		parts.append(part)
		covered = token_start + part_end
	return "".join(parts) if covered == end and parts else None


def repair_safe_readings(plain: str, annotated: str) -> tuple[str, int]:
	plain_visible = TAG_RE.sub("", plain)
	if visible(annotated) != plain_visible:
		return annotated, 0
	tokens = token_spans(plain_visible)
	if not tokens:
		return annotated, 0

	replacements: dict[tuple[int, int], str] = {}
	for match, start, end in ruby_positions(annotated):
		base = match.group(1)
		current = hira(match.group(2))
		expected = expected_for_span(tokens, start, end)
		context = plain_visible[max(0, start - 12) : min(len(plain_visible), end + 8)]
		if base == "下" and current == "した" and re.search(r"(?:指導|支配|影響|愛情|監督|条件)の下", context):
			replacements[(match.start(), match.end())] = "<ruby>下<rt>もと</rt></ruby>"
		elif base == "形" and current in {"かたち", "がた"} and GRAMMAR_FORM_RE.search(plain_visible):
			replacements[(match.start(), match.end())] = "<ruby>形<rt>けい</rt></ruby>"
		elif expected and (base, current, expected) in SAFE_REPLACEMENTS:
			replacements[(match.start(), match.end())] = f"<ruby>{base}<rt>{expected}</rt></ruby>"

	if not replacements:
		# A reading for the kanji portion alone cannot express the counter sound
		# in e.g. 3日後 (みっかご). Showing no ruby is preferable to the old,
		# definitely wrong 3にちご annotation.
		if re.search(r"\d日後", plain_visible) and "<ruby>日後<rt>にちご</rt></ruby>" in annotated:
			return annotated.replace("<ruby>日後<rt>にちご</rt></ruby>", "日後"), 1
		return annotated, 0
	chunks: list[str] = []
	offset = 0
	for (start, end), replacement in sorted(replacements.items()):
		chunks.extend((annotated[offset:start], replacement))
		offset = end
	chunks.append(annotated[offset:])
	return "".join(chunks), len(replacements)


def annotate_japanese(text: str) -> str:
	parts: list[str] = []
	offset = 0
	for token in TAGGER(text):
		start = text.find(token.surface, offset)
		if start < 0:
			return text
		parts.append(text[offset:start])
		surface = token.surface
		kana = getattr(token.feature, "kana", None)
		if not kana or not KANJI_RE.search(surface):
			parts.append(surface)
			offset = start + len(surface)
			continue
		surface_h = hira(surface)
		reading_h = hira(kana)
		suffix = 0
		while suffix < len(surface_h) and suffix < len(reading_h):
			left = surface_h[len(surface_h) - suffix - 1]
			right = reading_h[len(reading_h) - suffix - 1]
			if KANJI_RE.search(left) or left != right:
				break
			suffix += 1
		base = surface[:-suffix] if suffix else surface
		reading = reading_h[:-suffix] if suffix else reading_h
		ending = surface[-suffix:] if suffix else ""
		parts.append(f"<ruby>{base}<rt>{reading}</rt></ruby>{ending}")
		offset = start + len(surface)
	parts.append(text[offset:])
	return "".join(parts)


def annotate_outside_parentheses(text: str) -> str:
	outside = PAREN_RE.sub("", text)
	if re.search(r"[A-Za-z]", outside):
		# These legacy relationship labels mix Japanese, English and Chinese on
		# one line. Leaving the line unannotated is safer than assigning Japanese
		# readings to the support-language text.
		return text
	parts: list[str] = []
	for part in PAREN_RE.split(text):
		if not part:
			continue
		parts.append(part if PAREN_RE.fullmatch(part) else annotate_japanese(part))
	return "".join(parts)


def repair_node(node: Any) -> tuple[Any, int, int]:
	reading_repairs = 0
	source_repairs = 0
	if isinstance(node, dict):
		for key, annotated in list(node.items()):
			if not key.endswith("_r"):
				continue
			plain = node.get(key[:-2])
			if isinstance(plain, str) and isinstance(annotated, str):
				if key == "rel_r":
					repaired = annotate_outside_parentheses(plain)
					if repaired != annotated:
						source_repairs += 1
					node[key] = repaired
					continue
				if visible(annotated) != TAG_RE.sub("", plain):
					node[key] = plain
					source_repairs += 1
				else:
					node[key], count = repair_safe_readings(plain, annotated)
					reading_repairs += count
			elif isinstance(plain, list) and isinstance(annotated, list):
				for index, (plain_item, annotated_item) in enumerate(zip(plain, annotated)):
					if not isinstance(plain_item, str) or not isinstance(annotated_item, str):
						continue
					if visible(annotated_item) != TAG_RE.sub("", plain_item):
						annotated[index] = plain_item
						source_repairs += 1
					else:
						annotated[index], count = repair_safe_readings(plain_item, annotated_item)
						reading_repairs += count
		for value in node.values():
			_, r, s = repair_node(value)
			reading_repairs += r
			source_repairs += s
	elif isinstance(node, list):
		for value in node:
			_, r, s = repair_node(value)
			reading_repairs += r
			source_repairs += s
	return node, reading_repairs, source_repairs


def main() -> int:
	parser = argparse.ArgumentParser()
	parser.add_argument("--report-candidates", action="store_true", help="List unreviewed ruby/UniDic differences without changing files")
	parser.add_argument("--limit", type=int, default=200)
	args = parser.parse_args()
	if args.report_candidates:
		counts: Counter[tuple[str, str, str]] = Counter()
		examples: dict[tuple[str, str, str], list[str]] = defaultdict(list)

		def collect(node: Any) -> None:
			if isinstance(node, dict):
				for key, annotated in node.items():
					if key.endswith("_r"):
						plain = node.get(key[:-2])
						values = [(plain, annotated)] if isinstance(plain, str) and isinstance(annotated, str) else zip(plain, annotated) if isinstance(plain, list) and isinstance(annotated, list) else []
						for plain_item, annotated_item in values:
							if not isinstance(plain_item, str) or not isinstance(annotated_item, str) or visible(annotated_item) != TAG_RE.sub("", plain_item):
								continue
							tokens = token_spans(TAG_RE.sub("", plain_item))
							for match, start, end in ruby_positions(annotated_item):
								expected = expected_for_span(tokens, start, end)
								current = hira(match.group(2))
								if expected and expected != current:
									candidate = (match.group(1), current, expected)
									counts[candidate] += 1
									if len(examples[candidate]) < 2:
										examples[candidate].append(plain_item)
					collect(annotated)
				for key, value in node.items():
					if not key.endswith("_r"):
						collect(value)
			elif isinstance(node, list):
				for value in node:
					collect(value)

		for relative in DATA_FILES:
			collect(json.loads((ROOT / relative).read_text(encoding="utf-8")))
		for (base, current, expected), count in counts.most_common(args.limit):
			print(json.dumps({"count": count, "base": base, "current": current, "unidic": expected, "examples": examples[(base, current, expected)]}, ensure_ascii=False))
		return 0

	total_readings = 0
	total_sources = 0
	for relative in DATA_FILES:
		path = ROOT / relative
		data = json.loads(path.read_text(encoding="utf-8"))
		data, readings, sources = repair_node(data)
		path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
		print(f"{relative}: {readings} contextual readings, {sources} corrupted ruby fields")
		total_readings += readings
		total_sources += sources
	print(f"Total: {total_readings} contextual readings, {total_sources} corrupted ruby fields")
	return 0


if __name__ == "__main__":
	sys.exit(main())
