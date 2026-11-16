import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { KANJI_MASTER_QUIZ_URL, KANJI_MASTER_STRUCTURE_URL, resetKanjiMasterDataCache, type KanjiMasterQuiz } from "../../app/data/kanji-master-n2";
import { KanjiExamPage } from "../../app/study/KanjiExamPage";

const dir = join(process.cwd(), "public/data/kanji-master-n2");
const files: Record<string, string> = {
	[KANJI_MASTER_QUIZ_URL]: readFileSync(join(dir, "quiz.json"), "utf8"),
	[KANJI_MASTER_STRUCTURE_URL]: readFileSync(join(dir, "structure.json"), "utf8"),
};
const quiz = JSON.parse(files[KANJI_MASTER_QUIZ_URL]) as KanjiMasterQuiz;
const byId = new Map(quiz.questions.map((question) => [question.id, question]));

function questionIds(container: HTMLElement) {
	return [...container.querySelectorAll<HTMLElement>(".kanji-exam-question")].map((item) => item.dataset.questionId!);
}

describe("KanjiExamPage groups and 漢字マスター N2", () => {
	let fetchSpy: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		localStorage.clear();
		resetKanjiMasterDataCache();
		fetchSpy = vi.fn(async (input: RequestInfo | URL) => {
			const body = files[String(input)];
			return body ? new Response(body, { status: 200 }) : new Response("not found", { status: 404 });
		});
		vi.stubGlobal("fetch", fetchSpy);
		vi.spyOn(window, "requestAnimationFrame").mockReturnValue(0);
	});
	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it("opens on the textbook group, fetching its data lazily, and keeps the old bank as its own group", async () => {
		const user = userEvent.setup();
		render(<KanjiExamPage />);
		const groups = screen.getByRole("radiogroup", { name: /选择题组|Choose a group/ });
		expect(within(groups).getByRole("radio", { name: /漢字マスター N2/ })).toHaveAttribute("aria-checked", "true");
		expect(await screen.findByRole("button", { name: /按课|By lesson/ })).toBeInTheDocument();
		expect(fetchSpy.mock.calls.map(([url]) => String(url)).sort()).toEqual([KANJI_MASTER_QUIZ_URL, KANJI_MASTER_STRUCTURE_URL].sort());

		// The picker re-mounts once the lazy group component is in, so query it again.
		await user.click(within(screen.getByRole("radiogroup", { name: /选择题组|Choose a group/ })).getByRole("radio", { name: /原学校汉字|Original school kanji/ }));
		expect(screen.getByRole("button", { name: /学校汉字 · 第2章/ })).toBeInTheDocument();
		expect(localStorage.getItem("jp-kanji-exam-group-v1")).toBe("school-legacy");
	});

	it("practises one lesson picked by part → chapter → lesson and records mistakes by question id", async () => {
		const user = userEvent.setup();
		const { container } = render(<KanjiExamPage />);
		await user.click(await screen.findByRole("button", { name: /^挑戦編（/ }));
		await user.click(screen.getByRole("button", { name: /^13 健康-2$/ }));
		await user.click(screen.getByRole("button", { name: /^3 診察/ }));
		await user.click(screen.getByRole("button", { name: /只练汉字|Kanji only/ }));
		await user.click(screen.getByRole("button", { name: /^10题|^10 questions/ }));
		await user.click(screen.getByRole("button", { name: /开始随机练习|Start randomized practice/ }));

		const ids = questionIds(container);
		expect(ids).toHaveLength(10);
		for (const id of ids) expect(byId.get(id)).toMatchObject({ lessonId: "km-ch13-3", kind: "writing", source: "example" });

		screen.getAllByRole("textbox").forEach((input, index) => {
			fireEvent.change(input, { target: { value: index === 0 ? byId.get(ids[0])!.answer : "×" } });
		});
		await user.click(screen.getByRole("button", { name: /交卷并查看答案|Submit and see answers/ }));
		expect(screen.getByText(/答对 1 题，答错 9 题|1 correct, 9 incorrect/)).toBeInTheDocument();
		const wrong = JSON.parse(localStorage.getItem("jp-kanji-master-n2-wrong-v1") || "{}");
		expect(Object.keys(wrong).sort()).toEqual(ids.slice(1).sort());
		expect(JSON.parse(localStorage.getItem("jp-kanji-master-n2-history-v1") || "[]")[0]).toMatchObject({ correct: 1, total: 10, kind: "writing" });
		// The legacy history is untouched.
		expect(localStorage.getItem("jp-kanji-exam-history-v1")).toBeNull();

		await user.click(screen.getByRole("button", { name: /完成并返回题库|Finish and return/ }));
		await user.click(screen.getByRole("button", { name: /错题重练|Wrong answers/ }));
		await user.click(screen.getByRole("button", { name: /开始随机练习（9题）|Start randomized practice \(9\)/ }));
		expect(questionIds(container).sort()).toEqual(ids.slice(1).sort());
	});

	it("marks and reveals the second は for the repeated-kana question", async () => {
		localStorage.setItem("jp-kanji-master-n2-wrong-v1", JSON.stringify({ "km-ch3-5-writing-40-18": { misses: 1, streak: 0, lastWrongAt: "2026-11-16T00:00:00.000Z" } }));
		const user = userEvent.setup();
		const { container } = render(<KanjiExamPage />);
		await user.click(await screen.findByRole("button", { name: /错题重练|Wrong answers/ }));
		await user.click(screen.getByRole("button", { name: /开始随机练习（1题）|Start randomized practice \(1\)/ }));
		const item = container.querySelector<HTMLElement>(".kanji-exam-question")!;
		const prompt = item.querySelector(".kanji-exam-question__body > p")!;
		expect(prompt.innerHTML).toBe("彼女の演技は<mark>は</mark>えて見えた");
		await user.click(screen.getByRole("button", { name: /显示全部答案|Show all answers/ }));
		expect(item.querySelector(".kanji-exam-full-kanji")?.textContent).toBe("栄えて");
		expect(item.querySelector(".kanji-exam-answer-gloss")?.textContent).toBe("她的演技显得格外出色");
	});

	it("offers book tests as multiple choice", async () => {
		const user = userEvent.setup();
		const { container } = render(<KanjiExamPage />);
		await user.click(await screen.findByRole("button", { name: /按测验|By test/ }));
		expect(within(container.querySelectorAll<HTMLElement>(".kanji-exam-batches")[1]!).getAllByRole("button", { name: /(アチーブメントテスト|まとめテスト|クイズ)（/ })).toHaveLength(15);
		await user.click(screen.getByRole("button", { name: /开始随机练习（30题）|Start randomized practice \(30\)/ }));
		const choiceGroups = screen.getAllByRole("radiogroup");
		expect(choiceGroups).toHaveLength(10);
		expect(screen.getAllByRole("textbox")).toHaveLength(20);
		const illegible = screen.getByRole("radio", { name: /扫描不清|illegible/ });
		expect(illegible).toBeDisabled();

		const ids = questionIds(container);
		for (const group of choiceGroups) {
			const id = group.closest<HTMLElement>(".kanji-exam-question")!.dataset.questionId!;
			const question = byId.get(id)!;
			await user.click(within(group).getAllByRole("radio")[question.correctChoice! - 1]);
		}
		for (const input of screen.getAllByRole("textbox")) {
			const id = input.closest<HTMLElement>(".kanji-exam-question")!.dataset.questionId!;
			fireEvent.change(input, { target: { value: byId.get(id)!.answer } });
		}
		await user.click(screen.getByRole("button", { name: /交卷并查看答案|Submit and see answers/ }));
		expect(screen.getByText(/答对 30 题，答错 0 题|30 correct, 0 incorrect/)).toBeInTheDocument();
		expect(ids).toHaveLength(30);
	});

	it("tells the learner when the question bank cannot be loaded", async () => {
		vi.stubGlobal("fetch", vi.fn(async () => new Response("offline", { status: 503 })));
		render(<KanjiExamPage />);
		expect(await screen.findByText(/题库加载失败|Could not load the question bank/)).toBeInTheDocument();
	});
});
