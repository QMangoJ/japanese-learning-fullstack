import {
	completeKanjiWord,
	filledKanjiExamForm,
	type KanjiExamLesson,
} from "./kanji-exam";

export type KanjiVocabWord = {
	word: string;
	reading: string;
};

export type KanjiVocabEntry = {
	kanji: string;
	words: KanjiVocabWord[];
};

// Chapter 8 word lists, taken from the textbook exercises in Daniel's photos
// (『漢字マスターN4 改訂版』8章). Words are only the ones printed in the book.
const explicitVocab: Record<string, KanjiVocabEntry[]> = {
	"ch8-1-study": [
		{ kanji: "勉", words: [{ word: "勉強", reading: "べんきょう" }, { word: "勉強家", reading: "べんきょうか" }, { word: "勤勉", reading: "きんべん" }] },
		{ kanji: "漢", words: [{ word: "漢字", reading: "かんじ" }, { word: "漢数字", reading: "かんすうじ" }, { word: "漢和辞典", reading: "かんわじてん" }, { word: "漢方薬", reading: "かんぽうやく" }] },
		{ kanji: "宿", words: [{ word: "宿題", reading: "しゅくだい" }, { word: "宿", reading: "やど" }, { word: "宿泊", reading: "しゅくはく" }, { word: "合宿", reading: "がっしゅく" }, { word: "新宿駅", reading: "しんじゅくえき" }] },
		{ kanji: "題", words: [{ word: "題名", reading: "だいめい" }, { word: "話題", reading: "わだい" }, { word: "宿題", reading: "しゅくだい" }] },
		{ kanji: "質", words: [{ word: "質問", reading: "しつもん" }, { word: "質が高い", reading: "しつがたかい" }] },
		{ kanji: "問", words: [{ word: "質問", reading: "しつもん" }, { word: "問題", reading: "もんだい" }, { word: "問題集", reading: "もんだいしゅう" }, { word: "社会問題", reading: "しゃかいもんだい" }, { word: "学問", reading: "がくもん" }, { word: "問い合わせ", reading: "といあわせ" }, { word: "問いに答える", reading: "といにこたえる" }, { word: "意見を問う", reading: "いけんをとう" }] },
		{ kanji: "教", words: [{ word: "教える", reading: "おしえる" }, { word: "教わる", reading: "おそわる" }, { word: "教育", reading: "きょういく" }, { word: "教室", reading: "きょうしつ" }, { word: "教科書", reading: "きょうかしょ" }, { word: "教授", reading: "きょうじゅ" }, { word: "仏教", reading: "ぶっきょう" }] },
		{ kanji: "室", words: [{ word: "教室", reading: "きょうしつ" }, { word: "室内", reading: "しつない" }, { word: "研究室", reading: "けんきゅうしつ" }] },
	],
	"ch8-2-test": [
		{ kanji: "試", words: [{ word: "試みる", reading: "こころみる" }, { word: "試す", reading: "ためす" }, { word: "試験", reading: "しけん" }, { word: "試食", reading: "ししょく" }, { word: "試着", reading: "しちゃく" }, { word: "試合", reading: "しあい" }] },
		{ kanji: "験", words: [{ word: "試験", reading: "しけん" }, { word: "実験", reading: "じっけん" }, { word: "受験", reading: "じゅけん" }, { word: "体験", reading: "たいけん" }] },
		{ kanji: "答", words: [{ word: "答える", reading: "こたえる" }, { word: "答え", reading: "こたえ" }, { word: "回答", reading: "かいとう" }, { word: "解答用紙", reading: "かいとうようし" }] },
		{ kanji: "考", words: [{ word: "考える", reading: "かんがえる" }, { word: "考え方", reading: "かんがえかた" }, { word: "参考", reading: "さんこう" }, { word: "思考", reading: "しこう" }] },
		{ kanji: "正", words: [{ word: "正しい", reading: "ただしい" }, { word: "正解", reading: "せいかい" }, { word: "正確", reading: "せいかく" }, { word: "正午", reading: "しょうご" }, { word: "正月", reading: "しょうがつ" }] },
		{ kanji: "丸", words: [{ word: "丸", reading: "まる" }, { word: "丸い", reading: "まるい" }, { word: "丸める", reading: "まるめる" }, { word: "丸をつける", reading: "まるをつける" }, { word: "砲丸投げ", reading: "ほうがんなげ" }] },
		{ kanji: "不", words: [{ word: "不便", reading: "ふべん" }, { word: "不安", reading: "ふあん" }, { word: "不合格", reading: "ふごうかく" }, { word: "不思議", reading: "ふしぎ" }, { word: "不足", reading: "ふそく" }] },
		{ kanji: "同", words: [{ word: "同じ", reading: "おなじ" }, { word: "同時", reading: "どうじ" }, { word: "同級生", reading: "どうきゅうせい" }, { word: "合同", reading: "ごうどう" }] },
	],
	"ch8-3-library": [
		{ kanji: "貸", words: [{ word: "貸す", reading: "かす" }, { word: "貸し出し", reading: "かしだし" }, { word: "貸し切り", reading: "かしきり" }, { word: "賃貸", reading: "ちんたい" }, { word: "貸し借り", reading: "かしかり" }] },
		{ kanji: "借", words: [{ word: "借りる", reading: "かりる" }, { word: "借金", reading: "しゃっきん" }, { word: "借地", reading: "しゃくち" }] },
		{ kanji: "返", words: [{ word: "返す", reading: "かえす" }, { word: "振り返る", reading: "ふりかえる" }, { word: "返事", reading: "へんじ" }, { word: "返品", reading: "へんぴん" }] },
		{ kanji: "冊", words: [{ word: "一冊", reading: "いっさつ" }, { word: "三冊", reading: "さんさつ" }, { word: "短冊", reading: "たんざく" }, { word: "冊子", reading: "さっし" }, { word: "別冊", reading: "べっさつ" }] },
		{ kanji: "図", words: [{ word: "図", reading: "ず" }, { word: "地図", reading: "ちず" }, { word: "図書館", reading: "としょかん" }, { word: "植物図鑑", reading: "しょくぶつずかん" }, { word: "動物図鑑", reading: "どうぶつずかん" }] },
		{ kanji: "歴", words: [{ word: "歴史", reading: "れきし" }, { word: "歴代", reading: "れきだい" }, { word: "履歴書", reading: "りれきしょ" }, { word: "学歴", reading: "がくれき" }] },
		{ kanji: "史", words: [{ word: "歴史", reading: "れきし" }, { word: "日本史", reading: "にほんし" }, { word: "世界史", reading: "せかいし" }, { word: "東洋史", reading: "とうようし" }, { word: "西洋史", reading: "せいようし" }, { word: "史学", reading: "しがく" }] },
	],
};

// Mixed textbook forms (a kana syllable printed in place of an untaught kanji,
// e.g. か去) are not standalone words, so they never enter the list.
function isListWord(word: string): boolean {
	if (!word || word.length > 9) return false;
	if (/^[ぁ-んァ-ヶー][\p{Script=Han}]/u.test(word)) return false;
	return !/[。、！？\s]/.test(word);
}

function derivedVocab(lesson: KanjiExamLesson): KanjiVocabEntry[] {
	const pairs: KanjiVocabWord[] = [];
	const seen = new Set<string>();
	const add = (word: string, reading: string) => {
		if (!isListWord(word) || !reading || seen.has(word)) return;
		seen.add(word);
		pairs.push({ word, reading });
	};
	for (const question of lesson.questions) {
		if (question.kind === "reading") {
			add(question.target, question.answer);
		} else {
			const word = completeKanjiWord(question);
			// Only single-word prompts carry the word's own reading; phrase
			// prompts (e.g. 英語をおしえる, 木をきる) belong to the exam, not
			// the list, so require a pure-kana prompt whose filled form is
			// exactly the complete word.
			if (/^[ぁ-んァ-ヶー]+$/.test(question.prompt) && filledKanjiExamForm(question) === word) add(word, question.prompt);
		}
	}
	return lesson.kanji.map((kanji) => ({
		kanji,
		words: pairs.filter((pair) => pair.word.includes(kanji)),
	}));
}

export function vocabForLesson(lesson: KanjiExamLesson): KanjiVocabEntry[] {
	return explicitVocab[lesson.id] || derivedVocab(lesson);
}
