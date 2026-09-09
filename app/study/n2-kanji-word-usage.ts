import { N2_KANJI_USAGE } from "../data/n2-kanji-usage";
import { getReviewedKanjiWordUsage, type KanjiWord, type KanjiWordUsage } from "./kanji-word-usage";

const POS = {
	v: ["动词", "Verb"], i: ["い形容词", "い-adjective"], na: ["な形容词", "な-adjective"],
	adv: ["副词", "Adverb"], expr: ["表达", "Expression"], suru: ["名词・する动词", "Noun / する verb"],
} as const;

export function getN2KanjiWordUsage(word: KanjiWord): KanjiWordUsage | null {
	const spec = N2_KANJI_USAGE[`${word.jp}|${word.reading}`] || N2_KANJI_USAGE[word.jp];
	if (!spec) return getReviewedKanjiWordUsage(word);
	const [jp, exampleCn, exampleEn, pos, reading] = spec;
	const match = /^(.*?)【([^【】]+)】([^【】]*)$/.exec(jp);
	if (!match) return null;
	const [posCn, posEn] = pos ? POS[pos] : ["名词", "Noun"];
	return { before: match[1], focus: match[2], after: match[3], focusReading: reading || word.reading, exampleCn, exampleEn, posCn, posEn };
}
