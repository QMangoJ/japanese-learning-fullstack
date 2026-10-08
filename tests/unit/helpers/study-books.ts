import { readFileSync } from "node:fs";
import { join } from "node:path";

import { buildN2GrammarContrast } from "../../../app/data/n2-grammar-contrast";
import { attachWeekendKaisetsu, DATA_FILES, fixN3GrammarExerciseLayout, mergeGrammarExplanations } from "../../../app/study/store";

const DATA = join(__dirname, "../../../public/data");

function json(name: string): any {
	return JSON.parse(readFileSync(join(DATA, name), "utf8"));
}

/** Every textbook bundle, enriched the same way bootStudyData / bootN2 / bootN4 / bootN1 do it. */
export function loadStudyBooks() {
	const G = json(DATA_FILES.grammar);
	const V = json(DATA_FILES.vocab);
	const K = json(DATA_FILES.kanji);
	fixN3GrammarExerciseLayout(G);
	mergeGrammarExplanations(G, json("n3-grammar-explanations.json"));
	G.daily_explanations = json("n3-grammar-daily-explanations.json");
	const n3vk = json("n3-vocab-kanji-daily-translations.json");
	V.daily_translations = n3vk.vocab || {};
	K.daily_translations = n3vk.kanji || {};
	attachWeekendKaisetsu(V, json("n3-vocab-exam-explanations.json"));
	attachWeekendKaisetsu(K, json("n3-kanji-exam-explanations.json"));

	const G2 = json(DATA_FILES.n2grammar);
	const V2 = json(DATA_FILES.n2vocab);
	const K2 = json(DATA_FILES.n2kanji);
	G2.besatsu = json("n2-grammar-explanations.json");
	G2.daily_explanations = json("n2-grammar-daily-explanations.json");
	const n2vk = json("n2-vocab-kanji-daily-translations.json");
	V2.daily_translations = n2vk.vocab || {};
	K2.daily_translations = n2vk.kanji || {};
	attachWeekendKaisetsu(V2, json("n2-vocab-exam-explanations.json"));
	attachWeekendKaisetsu(K2, json("n2-kanji-exam-explanations.json"));
	G2.contrast = buildN2GrammarContrast(G2);

	const G4 = json(DATA_FILES.n4grammar);
	const V4 = json(DATA_FILES.n4vocab);
	const K4 = json(DATA_FILES.n4kanji);
	G4.besatsu = json("n4-grammar-explanations.json");
	G4.daily_explanations = json("n4-grammar-daily-explanations.json");
	const n4vk = json("n4-vocab-kanji-daily-translations.json");
	V4.daily_translations = n4vk.vocab || {};
	K4.daily_translations = n4vk.kanji || {};
	attachWeekendKaisetsu(V4, json("n4-vocab-exam-explanations.json"));
	attachWeekendKaisetsu(K4, json("n4-kanji-exam-explanations.json"));

	const G1 = json(DATA_FILES.n1grammar);
	const V1 = json(DATA_FILES.n1vocab);
	const K1 = json(DATA_FILES.n1kanji);
	G1.besatsu = json("n1-grammar-explanations.json");
	V1.daily_translations = json("n1-vocab-daily-translations.json").vocab || {};
	attachWeekendKaisetsu(V1, json("n1-vocab-exam-explanations.json"));
	K1.daily_translations = json("n1-kanji-daily-translations.json").kanji || {};
	attachWeekendKaisetsu(K1, json("n1-kanji-exam-explanations.json"));

	return { G, V, K, G2, V2, K2, G4, V4, K4, G1, V1, K1 };
}
