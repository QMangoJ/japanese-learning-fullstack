import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import summary from "../../app/data/common-verb-summary.json";
import { VerbSummaryPage } from "../../app/study/VerbSummaryPage";

describe("verb form summary", () => {
	it("keeps the classroom charts and the three verb groups", () => {
		const byId = Object.fromEntries(summary.forms.map((form) => [form.id, form]));
		expect(byId.dict.groups[0].rows).toContainEqual(["かきます", "かく（く）"]);
		expect(byId.volitional.groups[2].rows).toContainEqual(["くる", "こよう"]);
		expect(byId.potential.groups[2].rows).toContainEqual(["します", "できます"]);
		expect(byId.potential.groups[2].rows).toContainEqual(["きます", "こられます"]);
		expect(byId.te.groups[0].rows).toContainEqual(["いきます", "いって（って）"]);
		expect(byId.te.groups[0].rows.some((row) => row[1].startsWith("いいて"))).toBe(false);
		expect(byId.masu.groups[0].rows).toContainEqual(["かく", "かきます（き）"]);
		expect(byId.nai.groups[0].rows).toContainEqual(["うたう", "うたわない（わ）"]);
		expect(byId.nai.groups[0].rows.some((row) => row[1].includes("あない"))).toBe(false);
		expect(byId.ta.groups[0].rows).toContainEqual(["いきます", "いった（った）"]);
		expect(byId.ba.groups[2].rows).toContainEqual(["くる", "くれば"]);
		expect(byId.imperative.groups[1].rows).toContainEqual(["たべる", "たべろ"]);
		expect(byId.imperative.groups[2].rows).toContainEqual(["くる", "こい"]);
		expect(byId.passive.groups[2].rows).toContainEqual(["する", "される"]);
		expect(byId.causative.groups[0].rows).toContainEqual(["はなす", "はなさせる（さ）"]);
		expect(byId.causative.groups[0].rows.some((row) => row[1].includes("ささせ"))).toBe(false);
		const examples = summary.examples.groups;
		expect(examples.map((group) => group.name_cn)).toEqual(["五段動詞", "一段動詞", "不規則動詞"]);
		expect(examples[0].rows.find((row) => row[0] === "行く")).toEqual(["行く", "いく", "いきます", "いって", "いける", "行こう"]);
		expect(examples[0].rows.find((row) => row[0] === "帰る")?.[5]).toBe("帰ろう");
		expect(examples[1].rows.find((row) => row[0] === "食べる")?.[5]).toBe("食べよう");
		expect(summary.forms.map((form) => form.id)).toEqual([
			"masu",
			"te",
			"nai",
			"dict",
			"ta",
			"potential",
			"volitional",
			"imperative",
			"ba",
			"passive",
			"causative",
		]);
		expect(examples[2].rows.find((row) => row[0] === "発表する")).toEqual([
			"発表する",
			"はっぴょうする",
			"発表します",
			"発表して",
			"発表できる",
			"発表しよう",
		]);
	});

	it("renders the four forms and an example from each group", () => {
		render(<VerbSummaryPage />);
		const lessons = screen
			.getAllByRole("heading", { level: 2 })
			.map((heading) => heading.textContent?.match(/第(\d+)課/)?.[1])
			.filter(Boolean);
		expect(lessons).toEqual(["4", "14", "17", "18", "19", "27", "31", "33", "35", "37", "48"]);
		expect(screen.getAllByText("じしょ").length).toBeGreaterThan(0);
		expect(screen.getAllByText("かのう").length).toBeGreaterThan(0);
		expect(screen.getAllByText("いこう").length).toBeGreaterThan(0);
		expect(screen.getAllByText("めいれい").length).toBeGreaterThan(0);
		expect(screen.getAllByText("うけみ").length).toBeGreaterThan(0);
		expect(screen.getAllByText("しえき").length).toBeGreaterThan(0);
		expect(screen.getAllByText("ごだん").length).toBeGreaterThan(0);
		expect(screen.getAllByText("いちだん").length).toBeGreaterThan(0);
		expect(screen.getAllByText("ふきそく").length).toBeGreaterThan(0);
		expect(screen.getByText("買おう")).toBeInTheDocument();
		expect(screen.getByText("買わない")).toBeInTheDocument();
		expect(screen.getByText("行った")).toBeInTheDocument();
		expect(screen.getByText("話させる")).toBeInTheDocument();
		expect(screen.getByText("食べよう")).toBeInTheDocument();
		expect(screen.getByText("食べろ")).toBeInTheDocument();
		expect(screen.getByText("連れてこよう")).toBeInTheDocument();
		expect(screen.getByText("連れてこい")).toBeInTheDocument();
		expect(screen.getByText("発表される")).toBeInTheDocument();
	});
});
