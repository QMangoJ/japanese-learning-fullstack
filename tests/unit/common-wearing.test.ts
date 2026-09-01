import { describe, expect, it } from "vitest";

import wearing from "../../app/data/common-wearing.json";

describe("common wearing verbs reference data", () => {
	it("covers the core Japanese clothing and accessory verb distinctions", () => {
		expect(wearing.items).toHaveLength(9);
		expect(wearing.items.map((item) => item.verb)).toEqual([
			"着る", "はく", "かぶる", "はめる", "つける", "かける", "巻く", "締める", "する",
		]);
		expect(wearing.items.find((item) => item.verb === "着る")?.state).toBe("着ている");
		expect(wearing.items.find((item) => item.verb === "はく")?.state).toBe("はいている");
		expect(wearing.items.find((item) => item.verb === "かける")?.objects_jp).toContain("眼鏡");
		expect(wearing.items.find((item) => item.verb === "はめる")?.objects_jp).toContain("指輪");
	});

	it("keeps bilingual guidance, examples, readings, and take-off verbs complete", () => {
		for (const item of wearing.items) {
			expect(item.action_cn, item.verb).toBeTruthy();
			expect(item.action_en, item.verb).toBeTruthy();
			expect(item.objects_cn, item.verb).toBeTruthy();
			expect(item.objects_en, item.verb).toBeTruthy();
			expect(item.example_cn, item.verb).toBeTruthy();
			expect(item.example_en, item.verb).toBeTruthy();
			expect(item.example, item.verb).toMatch(/。$/);
			expect(item.kana, item.verb).toMatch(/^[ぁ-ゖー]+$/);
			expect(item.state, item.verb).toMatch(/いる$/);
			expect(item.remove, item.verb).toBeTruthy();
		}
		expect(wearing.removal.items.map((item) => item.verb)).toEqual(["脱ぐ", "外す", "取る"]);
		expect(wearing.footer).toContain("着ていない");
		expect(wearing.footer_en).toContain("does not simply mean");
	});
});
