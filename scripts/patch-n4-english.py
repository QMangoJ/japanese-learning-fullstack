#!/usr/bin/env python3
"""Fill missing title_en / heading_en / instruction_en on N4 books."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

INSTR = {
	"（　）に何を入れますか。1・2・3・4からいちばんいいものを一つえらんでください。": "What goes in (　)? Choose the best option from 1–4.",
	"＿★＿に入るものはどれですか。1・2・3・4からいちばんいいものを一つえらんでください。": "Which option goes in ★? Choose the best from 1–4.",
	"もんだい1　（　）になにをいれますか。": "Question 1  What goes in (　)?",
	"もんだい2　＿＿のぶんとだいたいおなじいみのぶんはどれですか。": "Question 2  Which sentence is closest in meaning?",
	"もんだい3　つぎのことばのつかいかたでいちばんいいものはどれですか。": "Question 3  Which is the best use of this word?",
	"＿＿のことばはひらがなでどうかきますか。": "How is the underlined word written in hiragana?",
	"＿＿のことばはどうかきますか。": "How is the underlined word written in kanji?",
}

HEADINGS = {
	"音がにていることば": "Words that sound alike",
	"気持ちをあらわすことば": "Words for feelings",
	"まとめておぼえましょう": "Learn these together",
	"ことばをふやしましょう：いく（go）／くる（come）": "Build vocabulary: いく (go) / くる (come)",
	"日課をあらわすことば": "Words for daily routines",
	"ことばをふやしましょう：〜機（machine）": "Build vocabulary: 〜機 (machine)",
	"まちがいやすいことば": "Easy-to-mix-up words",
	"ペアでおぼえましょう": "Learn in pairs",
	"ことばをふやしましょう：−しいのつくことば": "Build vocabulary: words ending in -しい",
	"人のようすをあらわすことば": "Words that describe people",
	"ことばをふやしましょう：〜ちゅう（中）＝〜している": "Build vocabulary: 〜ちゅう = in the middle of doing",
	"文でおぼえましょう": "Learn the word in a sentence",
	"ことばをふやしましょう：自動": "Build vocabulary: 自動 (automatic)",
	"勉強の仕方をあらわすことば": "Words for how you study",
	"副詞": "Adverbs",
	"こんな使い方もあります：「やっぱり」で考えが変わったことを表す": "Also used this way: やっぱり when you change your mind",
	"自動詞と他動詞": "Intransitive and transitive verbs",
	"会話のことばをおぼえましょう": "Learn conversation phrases",
	"話し方に注意しましょう": "Watch how you say it",
	"ことばをふやしましょう：形容詞→名詞": "Build vocabulary: adjective → noun",
	"状態や状況をあらわすことば": "Words for states and situations",
	"ことばをふやしましょう：かたち": "Build vocabulary: shapes",
	"おつきあいのことば": "Words for social contact",
	"会話表現": "Conversational expressions",
	"敬語": "Honorific language",
	"尊敬語": "Respectful language (sonkeigo)",
	"謙譲語": "Humble language (kenjōgo)",
}


def patch_book(path: Path) -> tuple[int, int, int]:
	book = json.loads(path.read_text(encoding="utf-8"))
	titles = headings = instrs = 0
	for week in book.get("weeks") or []:
		for day in week.get("days") or []:
			if day.get("title") and not day.get("title_en"):
				if day.get("title") == "まとめ問題" or day.get("title_cn") == "复习问题":
					day["title_en"] = "Review questions"
					titles += 1
			for section in day.get("sections") or []:
				if section.get("heading") and not section.get("heading_en"):
					en = HEADINGS.get(section["heading"])
					if en:
						section["heading_en"] = en
						headings += 1
			ex = day.get("exercises") or {}
			for section in ex.get("sections") or []:
				text = section.get("instruction") or ""
				if text and not section.get("instruction_en"):
					en = INSTR.get(text)
					if en:
						section["instruction_en"] = en
						instrs += 1
	path.write_text(json.dumps(book, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
	return titles, headings, instrs


def main() -> None:
	for name in ("n4vocab.026f711eb7.json", "n4kanji.655356d8e2.json", "n4grammar.40e138ccdb.json"):
		t, h, i = patch_book(ROOT / "public/data" / name)
		print(f"{name}: title_en +{t}, heading_en +{h}, instruction_en +{i}")


if __name__ == "__main__":
	main()
