import { describe, expect, it } from "vitest";
import jita from "../../app/data/common-jita.json";
import { JITA_TEARU_EXAMPLES } from "../../app/data/common-jita-tearu";

const pairs = jita.groups.flatMap((group) => group.pairs);
const plainRuby = (html: string) => html.replace(/<rt>.*?<\/rt>/g, "").replace(/<[^>]+>/g, "");
const rubyReading = (html: string) => html.replace(/<ruby>.*?<rt>(.*?)<\/rt><\/ruby>/g, "$1");

describe("common transitive/intransitive reference data", () => {
	it("retains the original pairs and expands the reference to 51 unique pairs", () => {
		expect(pairs).toHaveLength(51);
		expect(new Set(pairs.map((pair) => `${pair.ta.dict}/${pair.ji.dict}`)).size).toBe(51);
		for (const [ta, ji] of [
			["切る", "切れる"],
			["続ける", "続く"], ["増やす", "増える"], ["減らす", "減る"],
			["上げる", "上がる"], ["下げる", "下がる"], ["進める", "進む"],
			["動かす", "動く"], ["戻す", "戻る"], ["降ろす", "降りる"], ["通す", "通る"],
			["倒す", "倒れる"], ["広げる", "広がる"], ["伸ばす", "伸びる"],
			["汚す", "汚れる"], ["外す", "外れる"], ["温める", "温まる"],
			["冷やす", "冷える"], ["沸かす", "沸く"], ["乾かす", "乾く"],
			["溶かす", "溶ける"], ["燃やす", "燃える"], ["育てる", "育つ"],
			["伝える", "伝わる"], ["なくす", "なくなる"], ["治す", "治る"],
			["開ける", "開く"], ["閉める", "閉まる"], ["始める", "始まる"],
			["終える", "終わる"], ["直す", "直る"], ["集める", "集まる"],
		]) expect(pairs).toContainEqual(expect.objectContaining({
			ta: expect.objectContaining({ dict: ta }), ji: expect.objectContaining({ dict: ji }),
		}));
	});

	it("has bilingual meanings/examples and matching text, readings, and ruby throughout", () => {
		for (const group of jita.groups) {
			expect(group.title).toBeTruthy();
			expect(group.title_en).toBeTruthy();
			for (const pair of group.pairs) {
				expect(pair.cn).toBeTruthy();
				expect(pair.en).toBeTruthy();
				for (const side of [pair.ta, pair.ji]) {
					expect(side.eg_cn, side.dict).toBeTruthy();
					expect(side.eg_en, side.dict).toBeTruthy();
					expect(side.kana, side.dict).toMatch(/^[ぁ-ゖー]+$/);
					expect(side.masu).toMatch(/ます$/);
					for (const field of ["dict", "masu", "eg"] as const) {
						const rendered = (side as Record<string, string>)[`${field}_r`] || side[field];
						expect(plainRuby(rendered), `${side.dict}: ${field}`).toBe(side[field]);
						expect(rubyReading(rendered), `${side.dict}: ${field} readings`).not.toMatch(/\p{Script=Han}/u);
						if (field === "dict") expect(rubyReading(rendered)).toBe(side.kana);
					}
				}
			}
		}
	});

	it("uses the reviewed forms of tsuzukeru/tsuzuku and preserves shimaru's okurigana", () => {
		const continued = pairs.find((pair) => pair.ta.dict === "続ける")!;
		expect(continued.ta).toMatchObject({ kana: "つづける", masu: "続けます", eg: "日本語の勉強を続けます。" });
		expect(continued.ji).toMatchObject({ kana: "つづく", masu: "続きます", eg: "雨が三日間続いています。" });
		expect(continued.ji.eg_cn).toBe("雨已经连续下了三天。");
		expect(continued.ji.eg_en).toBe("It has been raining for three days.");
		const closed = pairs.find((pair) => pair.ji.dict === "閉まる")!.ji;
		expect(closed.dict_r).toBe("<ruby>閉<rt>し</rt></ruby>まる");
		expect(plainRuby(closed.eg_r)).toBe("窓が閉まっています。");
	});

	it("includes the transitive 切る and intransitive 切れる pair", () => {
		const cut = pairs.find((pair) => pair.ta.dict === "切る")!;
		expect(cut.ta).toMatchObject({ kana: "きる", masu: "切ります", eg: "紙が切ってあります。" });
		expect(cut.ji).toMatchObject({ kana: "きれる", masu: "切れます", eg: "糸が切れています。" });
		expect(cut.ta.eg_cn).toBe("纸已经有人提前剪好了。");
		expect(cut.ta.eg_en).toBe("The paper has been cut in advance.");
		expect(cut.ji.eg_en).toBe("The thread is broken.");
	});

	it("replaces every transitive action example with a reviewed てあります example", () => {
		const transitiveVerbs = pairs.map((pair) => pair.ta.dict).sort();
		expect(Object.keys(JITA_TEARU_EXAMPLES).sort()).toEqual(transitiveVerbs);
		for (const verb of transitiveVerbs) {
			const example = JITA_TEARU_EXAMPLES[verb];
			expect(example.jp, verb).toMatch(/てあります。$/);
			expect(example.cn, verb).toBeTruthy();
			expect(example.en, verb).toBeTruthy();
			expect(plainRuby(example.jp_r), verb).toBe(example.jp);
			expect(rubyReading(example.jp_r), `${verb}: readings`).not.toMatch(/\p{Script=Han}/u);
		}
		expect(JITA_TEARU_EXAMPLES["切る"].jp).toBe("紙が必要な大きさに切ってあります。");
	});
});
