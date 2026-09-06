import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DayPage } from "../../app/study/days";
import { ExerciseReset, ExerciseSession, useQuestionProgress } from "../../app/study/exercise-progress";
import { G, G2, G4, K, V, resetStudyStateForTests, setModule } from "../../app/study/store";

function seedExams() {
	for (const book of [G, G2, G4, K, V]) {
		book.weeks = [1, 2].map((n) => ({ n, days: [{
			day: 7, title: "実戦問題", answers: "①1②1",
			mondai1: { instruction: "選んでください。", items: [1, 2].map((n) => ({
				n, q: `問題${n}：もう＿＿ました。`, opts: ["食べ", "食べて", "食べた", "食べる"],
			})) },
		}] }));
		book.besatsu = Object.fromEntries([1, 2].map((w) => [`w${w}`, {
			mondai1: [1, 2].map((n) => ({ n, ans: 1, trans: "已经吃过了。", trans_en: "I have already eaten." })),
		}]));
	}
}

function choice(question: number, option: number) {
	return document.querySelectorAll(".qz")[question - 1].querySelector<HTMLButtonElement>(`[data-optidx="${option}"]`)!;
}

beforeEach(() => {
	window.sessionStorage.clear();
	localStorage.clear();
	resetStudyStateForTests();
	seedExams();
});

describe("weekly exercise progress", () => {
	it.each(["grammar", "n2grammar", "n4grammar", "vocab", "kanji"] as const)("restores %s choices after leaving the page and remounting", (module) => {
		setModule(module);
		const view = render(<DayPage w={1} d={7} token={null} />);
		fireEvent.click(choice(1, 1));
		fireEvent.click(choice(2, 2));
		expect(choice(1, 1)).toHaveClass("correct");
		expect(choice(2, 2)).toHaveClass("wrong");
		const fold = document.querySelector<HTMLButtonElement>("button[data-ans='exam-1-1']");
		if (fold) fireEvent.click(fold);
		view.unmount();

		render(<DayPage w={1} d={7} token={null} />);
		expect(choice(1, 1)).toHaveAttribute("aria-pressed", "true");
		expect(choice(2, 2)).toHaveClass("wrong");
		expect(screen.getByText("✓ 答对了")).toBeInTheDocument();
		expect(screen.getByText("✗ 答错了")).toBeInTheDocument();
		if (fold) expect(document.getElementById("exam-1-1")).toHaveClass("show");
		fireEvent.click(choice(2, 3));
		expect(choice(2, 2)).toHaveAttribute("aria-pressed", "true");
	});

	it("isolates identical questions by module and week and resets only the current lesson", () => {
		const view = render(<DayPage w={1} d={7} token={null} />);
		fireEvent.click(choice(1, 1));
		view.rerender(<DayPage w={2} d={7} token={null} />);
		expect(document.querySelector(".qz.answered")).toBeNull();
		fireEvent.click(choice(1, 2));
		setModule("n2grammar");
		view.rerender(<DayPage w={2} d={7} token={null} />);
		expect(document.querySelector(".qz.answered")).toBeNull();
		fireEvent.click(choice(1, 3));
		setModule("grammar");
		view.rerender(<DayPage w={1} d={7} token={null} />);
		expect(choice(1, 1)).toHaveAttribute("aria-pressed", "true");
		fireEvent.click(screen.getByRole("button", { name: "重新作答" }));
		expect(document.querySelector(".qz.answered")).toBeNull();
		view.rerender(<DayPage w={2} d={7} token={null} />);
		expect(choice(1, 2)).toHaveAttribute("aria-pressed", "true");
		setModule("n2grammar");
		view.rerender(<DayPage w={2} d={7} token={null} />);
		expect(choice(1, 3)).toHaveAttribute("aria-pressed", "true");
	});

	it("does not restore an answer when its source question changes", () => {
		const view = render(<DayPage w={1} d={7} token={null} />);
		fireEvent.click(choice(1, 1));
		G.weeks[0].days[0].mondai1.items[0].q = "昨日＿＿ました。";
		view.rerender(<DayPage w={1} d={7} token={null} />);
		expect(choice(1, 1)).toHaveAttribute("aria-pressed", "false");
	});
});

function Probe() {
	const [progress, update] = useQuestionProgress("probe");
	return <button onClick={() => update({ picked: 2 })}>{progress.picked || "unanswered"}</button>;
}

describe("exercise storage resilience", () => {
	it("tolerates malformed saved progress", () => {
		window.sessionStorage.setItem("jl-exercise-progress-v1:broken", "not JSON");
		render(<ExerciseSession scope="broken"><Probe /></ExerciseSession>);
		fireEvent.click(screen.getByText("unanswered"));
		expect(screen.getByText("2")).toBeInTheDocument();
	});

	it("keeps navigation and reset working when session storage is blocked", () => {
		const mock = vi.spyOn(window, "sessionStorage", "get").mockImplementation(() => { throw new Error("blocked"); });
		try {
			const content = <ExerciseSession scope="blocked"><Probe /><ExerciseReset label="Reset" /></ExerciseSession>;
			const view = render(content);
			fireEvent.click(screen.getByText("unanswered"));
			view.unmount();
			render(content);
			expect(screen.getByText("2")).toBeInTheDocument();
			fireEvent.click(screen.getByText("Reset"));
			expect(screen.getByText("unanswered")).toBeInTheDocument();
		} finally {
			mock.mockRestore();
		}
	});
});
