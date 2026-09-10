import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path: string) => JSON.parse(readFileSync(resolve(process.cwd(), path), "utf8"));
const data = read("public/data/n2-grammar-daily-explanations.json");
const reviewed = read("scripts/n2-daily-reviewed.json");
const book = read("public/data/n2grammar.4e6157570a.json");

// These are the actual lesson destinations, not a match based on question order.
const destinations = [
	["忘れっぽい", "病気がち", "さびしげ", "疲れ気味|忘れっぽい", "忘れっぽい", "さびしげ|病気がち", "さびしげ"],
	["知らなかったんだもの", "帰れるものなら", "持っているものの", "暑いものだから", "知らなかったんだもの", "持っているものの", "暑いものだから"],
	["見た目はともかく味は", "車はもとより自転車も", "仕事の話は抜きにして", "仕事の話は抜きにして", "旅行はまだしも", "車はもとより自転車も", "旅行はまだしも"],
	["心配でたまらない", "ひまでしょうがない", "残念でならない", "心配でたまらない", "残念でならない", "うるさくてかなわない", "残念でならない"],
	["言わないではいられない", "食べないことはない", "覚えられないこともない", "飲まずにはいられない", "覚えられないこともない", "覚えられないこともない", "飲まずにはいられない"],
	["帰らねばならない", "遊んでばかりはいられない", "待っていられない", "忘れてはならない", "待っていられない", "忘れてはならない", "待っていられない"],
];

describe("N2 first-week daily calibration", () => {
	it.each(destinations.flatMap((rows, d) => rows.map((expected, q) => ({ day: d + 1, n: q + 1, expected }))))(
		"day $day question $n links to the reviewed grammar",
		({ day, n, expected }) => {
			const item = data[`w1d${day}`].items.find((q: { n: number }) => q.n === n);
			const lesson = book.weeks[0].days.find((d: { day: number }) => d.day === day);
			expect(item.pointIndexes.map((i: number) => lesson.points[i].pattern).join("|")).toBe(expected);
			expect(item).toMatchObject(reviewed[`w1d${day}-${n}`]);
		},
	);
	it("retains uncertainty and translates the entire weather question", () => {
		expect(data.w1d1.items[0].translation).not.toContain("掺");
		expect(data.w1d1.items[3].translation_en).toContain("feel feverish");
		expect(data.w1d3.items[4].translation_en).toContain("tomorrow");
	});
	it("uses contextual vocabulary rather than unrelated dictionary forms", () => {
		expect(data.w1d1.items[0].words.find((w: { jp: string }) => w.jp === "気味").kana).toBe("ぎみ");
		expect(data.w1d4.items[2].words[0].cn).toBe("声音");
		expect(data.w1d5.items[1].words[0].kana).toBe("いちにち");
		expect(data.w1d5.items[6].words[0]).toMatchObject({ jp: "失礼", en: "rude; impolite" });
		expect(data.w1d6.items[6].words[0].jp).toBe("恥ずかしい");
	});
});
