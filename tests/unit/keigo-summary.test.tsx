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
		expect(sonkei?.rows.map((row) => row[2])).toEqual(
			expect.arrayContaining([
				"いらっしゃる",
				"おっしゃる",
				"なさる",
				"<ruby>召<rt>め</rt></ruby>し<ruby>上<rt>あ</rt></ruby>がる",
				"ご<ruby>覧<rt>らん</rt></ruby>になる",
				"くださる",
				"ご<ruby>存<rt>ぞん</rt></ruby>じだ",
				"お<ruby>休<rt>やす</rt></ruby>みになる",
			]),
		);
		expect(sonkei?.note_cn).toContain("いらっしゃいます");
		expect(sonkei?.note_cn).not.toContain("ご存知");
		const mistakes = keigo.sections.find((section) => section.id === "mistakes");
		expect(mistakes?.rows.some((row) => row[0].includes("申") && row[1].includes("おっしゃいました"))).toBe(true);
		expect(mistakes?.note_cn).toContain("お召し上がりになる");
		expect(mistakes?.note_cn).toContain("お見えになる");
		expect(keigo.examples.rows[2][1]).toContain("<ruby>席<rt>せき</rt></ruby>を<ruby>外<rt>はず</rt></ruby>しております");
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
		expect(screen.getByRole("button", { name: /活用/ })).toBeInTheDocument();
	});
});
