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
		const examples = summary.examples.groups;
		expect(examples.map((group) => group.name_cn)).toEqual(["一类", "二类", "三类"]);
		expect(examples[0].rows.find((row) => row[0] === "行く")).toEqual(["行く", "いく", "いきます", "いって", "いける", "行こう"]);
		expect(examples[0].rows.find((row) => row[0] === "帰る")?.[5]).toBe("帰ろう");
		expect(examples[1].rows.find((row) => row[0] === "食べる")?.[5]).toBe("食べよう");
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
		expect(screen.getByText("辞書形のつくりかた")).toBeInTheDocument();
		expect(screen.getByText("意向形のつくりかた")).toBeInTheDocument();
		expect(screen.getByText("可能形のつくりかた")).toBeInTheDocument();
		expect(screen.getByText("て形のつくりかた")).toBeInTheDocument();
		expect(screen.getByText("買おう")).toBeInTheDocument();
		expect(screen.getByText("食べよう")).toBeInTheDocument();
		expect(screen.getByText("連れてこよう")).toBeInTheDocument();
	});
});
