import {
	completeKanjiWord,
	filledKanjiExamForm,
	type KanjiExamLesson,
} from "./kanji-exam";
import { KANJI_VOCAB_NOTES } from "./kanji-exam-vocab-notes";

export type KanjiVocabWord = {
	word: string;
	reading: string;
	// Study notes for the word list only (never shown in the quiz itself):
	// Chinese gloss, part of speech, and one short example sentence.
	meaningZh?: string;
	pos?: string;
	example?: string;
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
	// Chapter 9 word lists, likewise from the textbook exercises in Daniel's
	// photos (『漢字マスターN4 改訂版』9章). Words are only the ones printed
	// in the book; inflected reading targets are listed in dictionary form.
	"ch9-1-sports": [
		{ kanji: "運", words: [{ word: "運ぶ", reading: "はこぶ" }, { word: "運転", reading: "うんてん" }, { word: "運動", reading: "うんどう" }, { word: "運転手", reading: "うんてんしゅ" }, { word: "運がいい", reading: "うんがいい" }] },
		{ kanji: "動", words: [{ word: "運動", reading: "うんどう" }, { word: "動物園", reading: "どうぶつえん" }, { word: "動く", reading: "うごく" }, { word: "動かす", reading: "うごかす" }, { word: "動物", reading: "どうぶつ" }, { word: "動作", reading: "どうさ" }] },
		{ kanji: "練", words: [{ word: "練習", reading: "れんしゅう" }, { word: "避難訓練", reading: "ひなんくんれん" }, { word: "訓練", reading: "くんれん" }, { word: "練る", reading: "ねる" }] },
		{ kanji: "習", words: [{ word: "習う", reading: "ならう" }, { word: "復習", reading: "ふくしゅう" }, { word: "習慣", reading: "しゅうかん" }, { word: "学習", reading: "がくしゅう" }, { word: "習字", reading: "しゅうじ" }, { word: "予習", reading: "よしゅう" }] },
		{ kanji: "走", words: [{ word: "走る", reading: "はしる" }, { word: "競走", reading: "きょうそう" }, { word: "走者", reading: "そうしゃ" }] },
		{ kanji: "歩", words: [{ word: "万歩計", reading: "まんぽけい" }, { word: "歩行者", reading: "ほこうしゃ" }, { word: "歩道", reading: "ほどう" }, { word: "歩く", reading: "あるく" }, { word: "散歩", reading: "さんぽ" }, { word: "歩行者天国", reading: "ほこうしゃてんごく" }] },
		{ kanji: "泳", words: [{ word: "泳ぐ", reading: "およぐ" }, { word: "泳ぎ", reading: "およぎ" }, { word: "水泳", reading: "すいえい" }, { word: "水泳大会", reading: "すいえいたいかい" }, { word: "平泳ぎ", reading: "ひらおよぎ" }] },
		{ kanji: "才", words: [{ word: "才能", reading: "さいのう" }, { word: "天才", reading: "てんさい" }, { word: "才女", reading: "さいじょ" }] },
	],
	"ch9-2-resort": [
		{ kanji: "自", words: [{ word: "自分", reading: "じぶん" }, { word: "自然", reading: "しぜん" }, { word: "自宅", reading: "じたく" }, { word: "自信", reading: "じしん" }, { word: "自動車", reading: "じどうしゃ" }, { word: "自習", reading: "じしゅう" }, { word: "自力", reading: "じりき" }] },
		{ kanji: "然", words: [{ word: "自然", reading: "しぜん" }, { word: "全然", reading: "ぜんぜん" }, { word: "天然水", reading: "てんねんすい" }, { word: "天然記念物", reading: "てんねんきねんぶつ" }, { word: "当然", reading: "とうぜん" }] },
		{ kanji: "草", words: [{ word: "草", reading: "くさ" }, { word: "草花", reading: "くさばな" }, { word: "草原", reading: "そうげん" }, { word: "海草", reading: "かいそう" }] },
		{ kanji: "原", words: [{ word: "草原", reading: "そうげん" }, { word: "原作", reading: "げんさく" }, { word: "原因", reading: "げんいん" }, { word: "原料", reading: "げんりょう" }, { word: "高原", reading: "こうげん" }] },
		{ kanji: "湖", words: [{ word: "湖", reading: "みずうみ" }, { word: "琵琶湖", reading: "びわこ" }, { word: "山中湖", reading: "やまなかこ" }, { word: "湖上", reading: "こじょう" }, { word: "湖水", reading: "こすい" }] },
		{ kanji: "谷", words: [{ word: "谷", reading: "たに" }, { word: "渓谷", reading: "けいこく" }, { word: "谷間", reading: "たにま" }, { word: "谷川", reading: "たにがわ" }] },
		{ kanji: "海", words: [{ word: "海", reading: "うみ" }, { word: "海外旅行", reading: "かいがいりょこう" }, { word: "海辺", reading: "うみべ" }, { word: "海草", reading: "かいそう" }, { word: "日本海", reading: "にほんかい" }] },
		{ kanji: "辺", words: [{ word: "海辺", reading: "うみべ" }, { word: "辺り", reading: "あたり" }, { word: "辺", reading: "へん" }, { word: "川辺", reading: "かわべ" }, { word: "この辺", reading: "このへん" }, { word: "近辺", reading: "きんぺん" }] },
	],
	"ch9-3-countryside": [
		{ kanji: "里", words: [{ word: "ふる里", reading: "ふるさと" }, { word: "人里", reading: "ひとざと" }, { word: "一里", reading: "いちり" }, { word: "里帰り", reading: "さとがえり" }] },
		{ kanji: "野", words: [{ word: "野原", reading: "のはら" }, { word: "野球", reading: "やきゅう" }, { word: "野山", reading: "のやま" }, { word: "野菜", reading: "やさい" }] },
		{ kanji: "緑", words: [{ word: "緑色", reading: "みどりいろ" }, { word: "緑", reading: "みどり" }, { word: "緑茶", reading: "りょくちゃ" }, { word: "新緑", reading: "しんりょく" }] },
		{ kanji: "池", words: [{ word: "池", reading: "いけ" }, { word: "電池", reading: "でんち" }, { word: "小池さん", reading: "こいけさん" }, { word: "貯水池", reading: "ちょすいち" }] },
		{ kanji: "鳥", words: [{ word: "鳥", reading: "とり" }, { word: "白鳥", reading: "はくちょう" }, { word: "小鳥", reading: "ことり" }] },
		{ kanji: "羽", words: [{ word: "羽", reading: "はね" }, { word: "羽田空港", reading: "はねだくうこう" }] },
		{ kanji: "馬", words: [{ word: "馬", reading: "うま" }, { word: "竹馬", reading: "たけうま" }, { word: "馬車", reading: "ばしゃ" }, { word: "乗馬", reading: "じょうば" }] },
		{ kanji: "鳴", words: [{ word: "悲鳴", reading: "ひめい" }, { word: "鳴く", reading: "なく" }, { word: "鳴る", reading: "なる" }, { word: "鳴らす", reading: "ならす" }] },
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

function withNote(item: KanjiVocabWord): KanjiVocabWord {
	const note = KANJI_VOCAB_NOTES[item.word];
	return note ? { ...item, meaningZh: note.meaningZh, pos: note.pos, example: note.example } : item;
}

export function vocabForLesson(lesson: KanjiExamLesson): KanjiVocabEntry[] {
	const entries = explicitVocab[lesson.id] || derivedVocab(lesson);
	return entries.map((entry) => ({ ...entry, words: entry.words.map(withNote) }));
}
