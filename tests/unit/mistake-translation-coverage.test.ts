import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { beforeAll, describe, expect, it } from "vitest";

import { passageBlankPrompt } from "../../app/study/exam-answers";
import { loadReadingGlosses } from "../../app/study/memory-deck";
import { cardsFromMistakes } from "../../app/study/mistakes-memory-cards";
import { MODULES, resetStudyStateForTests, setStudyBooksForTests } from "../../app/study/store";
import { mistakeSources, type MistakeSource } from "./helpers/mistake-sources";
import { loadStudyBooks } from "./helpers/study-books";

/** Modules with no quiz that writes into the 错题本 (listening answers are self-checked). */
const NO_NOTEBOOK_QUIZ = new Set(["listening", "n2listening", "n1listening"]);

const PLACEHOLDER = /^(?:TODO|TBD|FIXME|待翻译|翻译中|\?+|…+|-+)$/i;

let sources: MistakeSource[] = [];

beforeAll(async () => {
	resetStudyStateForTests();
	const books = loadStudyBooks();
	setStudyBooksForTests(books);
	await loadReadingGlosses();
	sources = mistakeSources(books);
});

function translationOf(text: string) {
	return cardsFromMistakes([{ id: "audit", type: "q", text }])[0];
}

describe("错题本 translations cover every quiz that writes a mistake", () => {
	it("enumerates a quiz for every study module that can log one", () => {
		const covered = new Set(sources.map((s) => s.module));
		for (const module of MODULES) {
			if (NO_NOTEBOOK_QUIZ.has(module)) continue;
			expect(covered, `${module} has no 错题本 quiz in the audit — add it to tests/unit/helpers/mistake-sources.ts`).toContain(module);
		}
		expect(sources.length).toBeGreaterThan(5000);
	});

	it("only the known quiz pages write into the 错题本", () => {
		const callers: string[] = [];
		const walk = (dir: string) => {
			for (const name of readdirSync(dir)) {
				const path = join(dir, name);
				if (statSync(path).isDirectory()) walk(path);
				else if (/\.(tsx?|mts)$/.test(name) && !path.endsWith(join("study", "store.ts"))) {
					const src = readFileSync(path, "utf8");
					if (/\baddMistake(?:Note)?\(/.test(src)) callers.push(path.slice(path.indexOf("app")).replace(/\\/g, "/"));
				}
			}
		};
		walk(join(__dirname, "../../app"));
		// A new caller needs its quiz added to mistakeSources() so its translations are audited too.
		expect(callers.sort()).toEqual(["app/routes/reading-n3-book.tsx", "app/routes/study-common.tsx", "app/study/days.tsx"]);
	});

	it("every quiz question has a Chinese translation in the textbook data", () => {
		const missing = sources.filter((s) => !s.expected || !/[\u4e00-\u9fff]/.test(s.expected) || PLACEHOLDER.test(s.expected.trim()));
		expect(missing.map((s) => `${s.module} ${s.where}`)).toEqual([]);
	});

	it("every wrong-answer note shows that question's own translation on the card", () => {
		const wrong = sources
			.map((s) => ({ s, card: translationOf(s.text) }))
			.filter(({ s, card }) => card.translation !== s.expected)
			.map(({ s, card }) => `${s.module} ${s.where}: ${card.translation ?? "(none)"}`);
		expect(wrong).toEqual([]);
	});

	it("old passage-blank notes saved without a prompt get the sentence and its translation", () => {
		const blanks = sources.filter((s) => /grammar$/.test(s.module) && / mondai3 /.test(s.where));
		expect(blanks.length).toBeGreaterThan(100);
		for (const s of blanks) {
			const [prompt, ...answers] = s.text.split("\n");
			const card = translationOf(answers.join("\n"));
			expect(card.jp, `${s.module} ${s.where}`).toBe(prompt);
			expect(card.translation, `${s.module} ${s.where}`).toBe(s.expected);
		}
	});
});

describe("passageBlankPrompt", () => {
	it("returns the passage sentence that holds the blank", () => {
		const passage = "今日は混んでいた。それで、中のほうへ【21】が、行けなかった。「中に【22】ください」と言って入った。";
		expect(passageBlankPrompt(passage, 21)).toBe("それで、中のほうへ【21】が、行けなかった。");
		expect(passageBlankPrompt(passage, 22)).toBe("「中に【22】ください」と言って入った。");
		expect(passageBlankPrompt("電話【22-a】メール【22-b】して、励ました。", 22)).toBe("電話【22-a】メール【22-b】して、励ました。");
		expect(passageBlankPrompt(passage, 30)).toBeUndefined();
	});
});
