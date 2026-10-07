import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import keigo from "../../app/data/common-keigo.json";
import { KeigoSummaryPage } from "../../app/study/KeigoSummaryPage";

describe("keigo summary", () => {
	it("keeps the five official kinds and the classroom special verbs", () => {
		expect(keigo.sections.map((section) => section.id)).toEqual([
			"kinds",
			"sonkei",
			"kenjo",
			"teinei",
			"uchi",
			"mistakes",
		]);
		const sonkei = keigo.sections.find((section) => section.id === "sonkei");
		expect(sonkei?.rule_cn).toContain("吃喝来去在，看穿说做给");
		expect(sonkei?.rule_cn).toContain("专用动词");
		expect(sonkei?.rows.map((row) => row[2])).toEqual(
			expect.arrayContaining([
				"いらっしゃる",
				"おいでになる",
				"おっしゃる",
				"なさる",
				"<ruby>召<rt>め</rt></ruby>し<ruby>上<rt>あ</rt></ruby>がる",
				"ご<ruby>覧<rt>らん</rt></ruby>になる",
				"お<ruby>召<rt>め</rt></ruby>しになる",
				"くださる",
				"ご<ruby>存<rt>ぞん</rt></ruby>じだ",
				"<ruby>見<rt>み</rt></ruby>える／お<ruby>見<rt>み</rt></ruby>えになる",
				"お<ruby>休<rt>やす</rt></ruby>みになる",
			]),
		);
		expect(sonkei?.rows.some((row) => row[0].includes("ご〜なさる"))).toBe(true);
		expect(sonkei?.rows.some((row) => row[0].includes("お〜だ"))).toBe(true);
		expect(sonkei?.note_cn).toContain("いらっしゃいます");
		expect(sonkei?.note_cn).toContain("ご住所");
		expect(sonkei?.note_cn).toContain("お時間");
		expect(sonkei?.note_cn).not.toContain("ご存知");
		const kenjo = keigo.sections.find((section) => section.id === "kenjo");
		expect(kenjo?.rule_cn).toContain("吃喝来去在，看问说做给");
		expect(kenjo?.rule_cn).toContain("まいる");
		expect(kenjo?.rows.some((row) => row[1].includes("申し上げる") && row[2].includes("不是てあげる"))).toBe(true);
		expect(kenjo?.rows.some((row) => row[1].includes("いただく"))).toBe(true);
		expect(kenjo?.rows.some((row) => row[1].includes("願う"))).toBe(true);
		expect(kenjo?.note_cn).toContain("お送りします");
		const teinei = keigo.sections.find((section) => section.id === "teinei");
		expect(teinei?.rows.some((row) => row[1].includes("本日") && row[2] === "今日")).toBe(true);
		expect(teinei?.rows.some((row) => row[1].includes("先日") && row[2].includes("この間"))).toBe(true);
		expect(teinei?.rows.some((row) => row[1].includes("承知"))).toBe(true);
		expect(teinei?.rows.every((row) => !row[2].includes("最近") || row[1].includes("先日"))).toBe(true);
		const mistakes = keigo.sections.find((section) => section.id === "mistakes");
		expect(mistakes?.rows.some((row) => row[0].includes("申") && row[1].includes("おっしゃいました"))).toBe(true);
		expect(mistakes?.rows.some((row) => row[0].includes("お帰りになられる"))).toBe(true);
		expect(mistakes?.note_cn).toContain("お召し上がりになる");
		expect(mistakes?.note_cn).toContain("お見えになる");
		expect(keigo.examples.rows[2][1]).toContain("<ruby>席<rt>せき</rt></ruby>を<ruby>外<rt>はず</rt></ruby>しております");
		expect(keigo.examples.rows.some((row) => row[1].includes("ご挨拶なさいました"))).toBe(true);
		expect(keigo.examples.rows.some((row) => row[1].includes("ご記入いただけますか"))).toBe(true);
	});

	it("renders the readings and points noun charts back to conjugation", () => {
		render(<KeigoSummaryPage />);
		expect(screen.getAllByText("そんけいご").length).toBeGreaterThan(0);
		expect(screen.getAllByText("けんじょうご").length).toBeGreaterThan(0);
		expect(screen.getAllByText("ていちょうご").length).toBeGreaterThan(0);
		expect(screen.getAllByText("うかが").length).toBeGreaterThan(0);
		expect(screen.getAllByText("へいしゃ").length).toBeGreaterThan(0);
		expect(screen.getByText("いらっしゃいます")).toBeInTheDocument();
		expect(screen.getByText(/席を外しております/)).toBeInTheDocument();
		expect(screen.getByText(/吃喝来去在，看穿说做给/)).toBeInTheDocument();
		expect(screen.getByText("おいでになる")).toBeInTheDocument();
		expect(screen.getByText(/改まり語/)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /活用/ })).toBeInTheDocument();
	});
});
