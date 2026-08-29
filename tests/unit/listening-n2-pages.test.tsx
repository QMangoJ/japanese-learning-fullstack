import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { listeningN2BookChapters } from "../../app/data/listening-n2-book";
import { getListeningN2Lesson } from "../../app/data/listening-n2-lessons";
import { listeningQuestionSupport } from "../../app/data/listening-n3-question-support";
import { ListeningN2Content } from "../../app/routes/listening-n2";
import { resetStudyStateForTests, setLang } from "../../app/study/store";

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
	setLang("cn");
});

describe("ListeningN2Content", () => {
	it("reconstructs the book lesson as text with answer, transcript, and translation", async () => {
		const user = userEvent.setup();
		render(<ListeningN2Content chapter={1} section={1} embedded />);

		expect(screen.getByRole("heading", { level: 1, name: /発音に関する聞き取り/ })).toBeInTheDocument();
		expect(screen.queryByRole("button", { name: "练习页" })).not.toBeInTheDocument();
		expect(screen.queryByRole("img", { name: "N2 听解 p.12" })).not.toBeInTheDocument();
		expect(document.querySelector(".listening-lesson")).toBeTruthy();

		const firstQuestion = screen.getByRole("heading", { level: 4, name: /^1番/ }).closest("article");
		expect(firstQuestion).toBeTruthy();
		await user.click(within(firstQuestion!).getByText("答案"));
		expect(firstQuestion!.querySelector(".listening-text-answers__body:not([lang])")?.textContent).toMatch(/マッチ/);
		await user.click(within(firstQuestion!).getByText("听力原文"));
		expect(firstQuestion!.querySelector(".listening-text-answers__body[lang='ja']")?.textContent).toMatch(/ひっこしのトラック/);
		await user.click(within(firstQuestion!).getByText("译文"));
		expect(within(firstQuestion!).getByText(/搬家的卡车/)).toBeInTheDocument();
	});

	it("plays chapter 3 section 5 from CD 2", () => {
		render(<ListeningN2Content chapter={3} section={5} embedded />);
		expect(document.querySelector("audio")).toHaveAttribute("src", "/audio/n2/cd2/CD02_01.mp3");
		expect(screen.getAllByText("答案").length).toBeGreaterThan(0);
		expect(screen.getAllByText("听力原文").length).toBeGreaterThan(0);
		expect(screen.getAllByText("译文").length).toBeGreaterThan(0);
	});

	it("keeps 総まとめ 問題 V scripts on 問題 V, not 問題 IV", async () => {
		const user = userEvent.setup();
		render(<ListeningN2Content chapter={5} section={5} embedded />);
		const firstQuestion = screen.getByRole("heading", { level: 4, name: /^1番/ }).closest("article");
		await user.click(within(firstQuestion!).getByText("听力原文"));
		expect(firstQuestion!).toHaveTextContent(/掃除機/);
		expect(firstQuestion!).not.toHaveTextContent(/今度の日曜日/);
	});

	it("assigns an answer, transcript, and Chinese translation to every scored question", () => {
		const missing: string[] = [];
		for (const chapter of listeningN2BookChapters()) {
			for (const section of chapter.sections) {
				const lesson = getListeningN2Lesson(chapter.number, section.number);
				expect(lesson, `${chapter.number}-${section.number} lesson`).toBeTruthy();
				const support = listeningQuestionSupport(lesson!);
				const scored = lesson!.blocks
					.map((block, index) => ({ block, index }))
					.filter((entry) => entry.block.type === "q");
				for (const { block, index } of scored) {
					if (!/番|問題/.test(block.label)) continue;
					const item = support.get(index);
					if (!item?.answer) missing.push(`${chapter.number}-${section.number} ${block.label} answer`);
					if (!item?.transcript) missing.push(`${chapter.number}-${section.number} ${block.label} transcript`);
					if (!item?.transcript_cn) missing.push(`${chapter.number}-${section.number} ${block.label} cn`);
				}
			}
		}
		expect(missing).toEqual([]);
	});
});
