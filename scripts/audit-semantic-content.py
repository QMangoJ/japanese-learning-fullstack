#!/usr/bin/env python3
"""Find high-risk text and furigana defects in the structured study data.

This is deliberately an audit, not an automatic rewrite. UniDic provides a
context-aware second opinion, but names and accepted variant readings still
need to be checked against the scanned source page before editing. For that
reason UniDic differences are reported as review candidates, not as errors.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
from collections import Counter
from pathlib import Path
from typing import Any, Iterable

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
	"public/data/common.aa13cae172.json",
)

RUBY_RE = re.compile(r"<ruby>(.*?)<rt>(.*?)</rt></ruby>", re.DOTALL)
TAG_RE = re.compile(r"<[^>]+>")
KANJI_RE = re.compile(r"[\u3400-\u9fff\uf900-\ufaff々〆ヵヶ]")
JP_RE = re.compile(r"[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff々〆ヵヶー]")
MARKDOWN_ARTIFACT_RE = re.compile(r"\*\*|__")
GENERIC_REASON_RE = re.compile(
	r"不符合本题(?:语境|句意)|代入后(?:的接续或语义)?不成立|"
	r"does not fit (?:here|the context)|not fit grammatically here",
	re.IGNORECASE,
)


def hira(text: str) -> str:
	chars: list[str] = []
	for char in unicodedata.normalize("NFKC", text):
		code = ord(char)
		if 0x30A1 <= code <= 0x30F6:
			chars.append(chr(code - 0x60))
		else:
			chars.append(char)
	return "".join(chars)


def comparable(text: str) -> str:
	return "".join(char for char in hira(text) if JP_RE.match(char))


def strip_markup(text: str) -> str:
	return TAG_RE.sub("", RUBY_RE.sub(lambda match: match.group(1), text))


def annotated_reading(text: str) -> str:
	return comparable(TAG_RE.sub("", RUBY_RE.sub(lambda match: match.group(2), text)))


TAGGER = Tagger()


def unidic_reading(text: str) -> str | None:
	parts: list[str] = []
	for token in TAGGER(TAG_RE.sub("", text)):
		surface = token.surface
		if KANJI_RE.search(surface):
			kana = getattr(token.feature, "kana", None)
			if not kana:
				return None
			parts.append(kana)
		else:
			parts.append(surface)
	return comparable("".join(parts))


def pairs(node: Any, path: str = "$") -> Iterable[tuple[str, str, str]]:
	if isinstance(node, dict):
		for key, annotated in node.items():
			if not key.endswith("_r"):
				continue
			plain = node.get(key[:-2])
			if isinstance(plain, str) and isinstance(annotated, str):
				yield f"{path}.{key}", plain, annotated
			elif isinstance(plain, list) and isinstance(annotated, list):
				for index, (plain_item, annotated_item) in enumerate(zip(plain, annotated)):
					if isinstance(plain_item, str) and isinstance(annotated_item, str):
						yield f"{path}.{key}[{index}]", plain_item, annotated_item
		for key, value in node.items():
			yield from pairs(value, f"{path}.{key}")
	elif isinstance(node, list):
		for index, value in enumerate(node):
			yield from pairs(value, f"{path}[{index}]")


def strings(node: Any, path: str = "$") -> Iterable[tuple[str, str]]:
	if isinstance(node, dict):
		for key, value in node.items():
			yield from strings(value, f"{path}.{key}")
	elif isinstance(node, list):
		for index, value in enumerate(node):
			yield from strings(value, f"{path}[{index}]")
	elif isinstance(node, str):
		yield path, node


def main() -> int:
	parser = argparse.ArgumentParser()
	parser.add_argument("--limit", type=int, default=200)
	args = parser.parse_args()

	findings: list[dict[str, str]] = []
	counts: Counter[str] = Counter()
	for relative in DATA_FILES:
		path = ROOT / relative
		data = json.loads(path.read_text(encoding="utf-8"))
		for data_path, plain, annotated in pairs(data):
			if strip_markup(annotated) != TAG_RE.sub("", plain):
				counts["ruby_source_mismatch"] += 1
				findings.append({"kind": "ruby_source_mismatch", "file": relative, "path": data_path, "plain": plain, "annotated": annotated})
				continue
			expected = unidic_reading(plain)
			actual = annotated_reading(annotated)
			if expected and actual and expected != actual:
				counts["furigana_review_candidate"] += 1
				findings.append({"kind": "furigana_review_candidate", "file": relative, "path": data_path, "plain": plain, "actual": actual, "unidic": expected})
		for data_path, value in strings(data):
			if MARKDOWN_ARTIFACT_RE.search(value):
				counts["markdown_artifact"] += 1
				findings.append({"kind": "markdown_artifact", "file": relative, "path": data_path, "value": value})
			if "。。" in value:
				counts["double_punctuation"] += 1
				findings.append({"kind": "double_punctuation", "file": relative, "path": data_path, "value": value})
			if GENERIC_REASON_RE.search(value):
				counts["generic_reason"] += 1
				findings.append({"kind": "generic_reason", "file": relative, "path": data_path, "value": value})

	definite_kinds = {"ruby_source_mismatch", "markdown_artifact", "double_punctuation", "generic_reason"}
	error_count = sum(counts[kind] for kind in definite_kinds)
	print(json.dumps({"counts": counts, "definite_error_count": error_count, "findings": findings[: args.limit]}, ensure_ascii=False, indent=2))
	return 1 if error_count else 0


if __name__ == "__main__":
	sys.exit(main())
