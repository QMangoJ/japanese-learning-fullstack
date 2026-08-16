import { describe, expect, it } from "vitest";

import n2daily from "../../public/data/n2-grammar-daily-explanations.json";
import n3daily from "../../public/data/n3-grammar-daily-explanations.json";
import n4daily from "../../public/data/n4-grammar-daily-explanations.json";

function items(pack: Record<string, { items?: { words?: { jp?: string; cn?: string; en?: string }[] }[] }>) {
	return Object.values(pack).flatMap((day) => day.items || []);
}

describe("grammar explanation words", () => {
	it("adds sentence vocabulary to daily grammar explanations", () => {
		for (const [label, pack, min] of [
			["n2", n2daily, 200],
			["n3", n3daily, 150],
			["n4", n4daily, 60],
		] as const) {
			const all = items(pack);
			const withWords = all.filter((item) => (item.words || []).length);
			expect(withWords.length, label).toBeGreaterThanOrEqual(min);
			for (const item of withWords) {
				for (const word of item.words || []) {
					expect(word.jp).toBeTruthy();
					expect(word.cn || word.en).toBeTruthy();
				}
			}
		}
	});
});
