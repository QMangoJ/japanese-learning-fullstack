#!/usr/bin/env python3
"""Generate the N3 listening transcript furigana lookup.

Input is the merged lesson transcript JSON exported from the TypeScript data.
Fugashi with UniDic Lite is used only at generation time; the application ships the reviewed
lookup and has no runtime tokenizer dependency.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

from fugashi import Tagger


KANJI_RE = re.compile(r"[一-龯々〆ヵヶ]")
KANJI_GROUP_RE = re.compile(r"([一-龯々〆ヵヶ]+)")
RUBY_RE = re.compile(r"\{([^{}|]+)\|([^{}|]+)\}")

# UniDic exposes several possible readings for these surfaces. The listening text uses
# the conversational or proper-noun readings below throughout the book.
FORCED_READINGS = {
	"男": "おとこ",
	"女": "おんな",
	"私": "わたし",
	"今日": "きょう",
	"明日": "あした",
	"日本": "にほん",
	"大山": "おおやま",
	"三重": "みえ",
	"何人": "なんにん",
	"何時": "なんじ",
	"何時ごろ": "なんじごろ",
	"方": "かた",
	"次": "つぎ",
	"角": "かど",
	"丸い": "まるい",
	"割る": "わる",
}


def to_hiragana(value: str) -> str:
	return "".join(chr(ord(char) - 0x60) if "ァ" <= char <= "ヶ" else char for char in value)


def align_segments(segments: list[str], reading: str, segment_index: int = 0, reading_index: int = 0) -> list[tuple[str, str | None]] | None:
	if segment_index == len(segments):
		return [] if reading_index == len(reading) else None
	segment = segments[segment_index]
	if not KANJI_GROUP_RE.fullmatch(segment):
		anchor = to_hiragana(segment)
		if not reading.startswith(anchor, reading_index):
			return None
		rest = align_segments(segments, reading, segment_index + 1, reading_index + len(anchor))
		return None if rest is None else [(segment, None), *rest]

	for end in range(reading_index + 1, len(reading) + 1):
		rest = align_segments(segments, reading, segment_index + 1, end)
		if rest is not None:
			return [(segment, reading[reading_index:end]), *rest]
	return None


def annotate_surface(surface: str, reading: str) -> tuple[str, list[str]]:
	if not KANJI_RE.search(surface) or not reading or reading == "*":
		return surface, [surface] if KANJI_RE.search(surface) else []

	reading_hira = to_hiragana(reading)
	segments = [segment for segment in KANJI_GROUP_RE.split(surface) if segment]
	aligned = align_segments(segments, reading_hira)
	if aligned is None:
		return f"{{{surface}|{reading_hira}}}", [surface]
	return "".join(f"{{{segment}|{segment_reading}}}" if segment_reading else segment for segment, segment_reading in aligned), []


def annotate_line(tokenizer: Tagger, line: str) -> tuple[str, list[str]]:
	parts: list[str] = []
	unresolved: list[str] = []
	cursor = 0
	for token in tokenizer(line):
		start = line.find(token.surface, cursor)
		if start < 0:
			raise ValueError(f"Could not align token {token.surface!r} in {line!r}")
		parts.append(line[cursor:start])
		reading = FORCED_READINGS.get(token.surface, getattr(token.feature, "kana", ""))
		annotated, token_unresolved = annotate_surface(token.surface, reading)
		parts.append(annotated)
		unresolved.extend(token_unresolved)
		cursor = start + len(token.surface)
	parts.append(line[cursor:])
	return apply_context_overrides("".join(parts)), unresolved


def apply_context_overrides(value: str) -> str:
	"""Correct readings that depend on neighboring words or irregular counters."""
	replacements = {
		"お{母|はは}さん": "お{母|かあ}さん",
		"お{父|ちち}さん": "お{父|とう}さん",
		"{今日|きょう}{中|ちゅう}": "{今日中|きょうじゅう}",
		"10{日間|かかん}": "{10日間|とおかかん}",
		"20{日|か}": "{20日|はつか}",
		"３{日|か}{目|め}": "{３日|みっか}{目|め}",
		"３{日間|かかん}": "{３日間|みっかかん}",
		"24{日|か}": "{24日|にじゅうよっか}",
		"8{日|か}": "{8日|ようか}",
		"1{歳|さい}": "{1歳|いっさい}",
		"{一|いち}{時|じ}{雨|う}": "{一時|いちじ}{雨|あめ}",
		"{台|だい}{風|ふう}": "{台風|たいふう}",
		"3{軒|けん}{目|め}": "{3軒目|さんげんめ}",
		"{丸|まり}い": "{丸|まる}い",
		"{割|われ}る": "{割|わ}る",
		"{見積|みつもり}{書|かき}": "{見積|みつもり}{書|しょ}",
		"{月|がつ}・{水|みず}・{金|きん}": "{月|げつ}・{水|すい}・{金|きん}",
		"{火曜|かよう}{日|ひ}": "{火曜日|かようび}",
		"{日曜|にちよう}{日|ひ}": "{日曜日|にちようび}",
		"{月曜|げつよう}{日|ひ}": "{月曜日|げつようび}",
		"{白髪|はくはつ}": "{白髪|しらが}",
		"{今|こん}{駅|えき}": "{今|いま}{駅|えき}",
		"この{間|かん}": "この{間|あいだ}",
		"{日本|にほん}{人|にん}": "{日本人|にほんじん}",
		"{給料|きゅうりょう}{日|ひ}": "{給料日|きゅうりょうび}",
		"{階|きざはし}": "{階|かい}",
		"{土曜|どよう}{日|ひ}": "{土曜日|どようび}",
		"{体|たい}を{大切|たいせつ}": "{体|からだ}を{大切|たいせつ}",
		"{人|にん}と{知|し}り{合|あ}う": "{人|ひと}と{知|し}り{合|あ}う",
		"1{日|か}・2{日|か}・3{日|か}・4{日|か}・5{日|か}・6{日|か}・7{日|か}・{8日|ようか}・9{日|か}・10{日|か}": "{1日|ついたち}・{2日|ふつか}・{3日|みっか}・{4日|よっか}・{5日|いつか}・{6日|むいか}・{7日|なのか}・{8日|ようか}・{9日|ここのか}・{10日|とおか}",
		"14{日|か}・19{日|か}・{20日|はつか}・{24日|にじゅうよっか}": "{14日|じゅうよっか}・{19日|じゅうくにち}・{20日|はつか}・{24日|にじゅうよっか}",
		"１{泊|はく}": "{１泊|いっぱく}",
		"２{泊|はく}": "{２泊|にはく}",
		"３{泊|はく}": "{３泊|さんぱく}",
	}
	for source, target in replacements.items():
		value = value.replace(source, target)
	value = re.sub(r"(?<![0-9０-９])1\{人\|にん\}", "1{人|ひとり}", value)
	value = re.sub(r"(?<![0-9０-９])2\{人\|にん\}", "2{人|ふたり}", value)
	return value


def strip_ruby(value: str) -> str:
	return RUBY_RE.sub(r"\1", value)


def main() -> None:
	parser = argparse.ArgumentParser()
	parser.add_argument("input", type=Path)
	parser.add_argument("output", type=Path)
	parser.add_argument("--body-support", action="store_true")
	args = parser.parse_args()

	source_data: dict[str, str] = json.loads(args.input.read_text(encoding="utf-8"))
	tokenizer = Tagger()
	lookup: dict[str, str] = {}
	unresolved: set[str] = set()

	texts = source_data.keys() if args.body_support else source_data.values()
	for transcript in texts:
		for source_line in transcript.splitlines():
			line = source_line.strip()
			if not line or line in lookup:
				continue
			if not KANJI_RE.search(line):
				if args.body_support:
					lookup[line] = line
				continue
			annotated, line_unresolved = annotate_line(tokenizer, line)
			if strip_ruby(annotated) != line:
				raise ValueError(f"Furigana changed source text: {line!r} -> {annotated!r}")
			lookup[line] = annotated
			unresolved.update(line_unresolved)

	if args.body_support:
		support = {line: {"jp": annotated, "cn": source_data[line]} for line, annotated in lookup.items()}
		payload = json.dumps(support, ensure_ascii=False, indent="\t")
		content = f'''// Generated from the reviewed N3 listening teaching pages. Do not edit this file directly.
export type ListeningBodySupport = {{ readonly jp: string; readonly cn: string }};

const listeningN3BodySupportByLine: Readonly<Record<string, ListeningBodySupport>> = {payload} as const;

export function listeningBodySupport(text: string): ListeningBodySupport | undefined {{
	return listeningN3BodySupportByLine[text];
}}
'''
	else:
		payload = json.dumps(lookup, ensure_ascii=False, indent="\t")
		content = f'''// Generated from the reviewed N3 listening transcripts. Do not edit source text here.
const listeningN3FuriganaByLine: Readonly<Record<string, string>> = {payload} as const;

export function listeningTranscriptWithFurigana(text: string) {{
\treturn text
\t\t.split("\\n")
\t\t.map((line) => {{
\t\t\tconst leading = line.match(/^\\s*/)?.[0] || "";
\t\t\tconst trailing = line.match(/\\s*$/)?.[0] || "";
\t\t\tconst source = line.slice(leading.length, line.length - trailing.length || undefined);
\t\t\treturn `${{leading}}${{listeningN3FuriganaByLine[source] || source}}${{trailing}}`;
\t\t}})
\t\t.join("\\n");
}}
'''
	args.output.write_text(content, encoding="utf-8")
	print(f"Wrote {len(lookup)} annotated lines to {args.output}")
	if unresolved:
		print("Unresolved tokens:", "、".join(sorted(unresolved)))


if __name__ == "__main__":
	main()
