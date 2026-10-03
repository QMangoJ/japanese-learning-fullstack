import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { dueEntry, resetDueForTests } from "../../app/study/due-review";
import { TopicsPage } from "../../app/study/TopicsPage";
import { topicDueId } from "../../app/study/topic-vocab";

const DIR = join(process.cwd(), "public/data/topics");
const realFetch = globalThis.fetch;

beforeEach(() => {
	resetDueForTests();
	globalThis.fetch = vi.fn(async (url: string | URL | Request) => {
		const name = String(url).replace("/data/topics/", "");
		return new Response(readFileSync(join(DIR, name), "utf8"), { status: 200 });
	}) as typeof fetch;
});
afterEach(() => {
	globalThis.fetch = realFetch;
});

describe("TopicsPage", () => {
	it("lists topics from index.json", async () => {
		render(<TopicsPage slug={null} />);
		expect(await screen.findByText("日本投资理财日语")).toBeInTheDocument();
		expect(screen.getByText("121 个词")).toBeInTheDocument();
		expect(screen.getByText("银行 ATM 取钱")).toBeInTheDocument();
		expect(screen.getByText("前端工程师")).toBeInTheDocument();
		expect(screen.getByText("逛街买衣服")).toBeInTheDocument();
	});

	it("filters by subtopic, marks a word as 不会 and shows only those", async () => {
		const { container } = render(<TopicsPage slug="japan-investing" />);
		await screen.findByText("証券口座");
		expect(container.querySelectorAll(".topic-item")).toHaveLength(121);
		fireEvent.click(container.querySelector('[data-subtopic="股票"]')!);
		expect(container.querySelectorAll(".topic-item")).toHaveLength(14);
		const first = container.querySelector(".topic-item")!;
		const id = first.getAttribute("data-card")!;
		fireEvent.click(first.querySelector(".topic-item__grade button")!);
		expect(dueEntry(topicDueId("japan-investing", id))).toMatchObject({ kind: "topic", step: 0 });
		fireEvent.click(container.querySelector('[data-only="unknown"]')!);
		await waitFor(() => expect(container.querySelectorAll(".topic-item")).toHaveLength(1));
	});

	it("runs a flashcard self-test", async () => {
		const { container } = render(<TopicsPage slug="japan-investing" />);
		await screen.findByText("証券口座");
		fireEvent.click(screen.getByRole("tab", { name: /闪卡自测/ }));
		expect(screen.getByText("1 / 121")).toBeInTheDocument();
		fireEvent.click(container.querySelector(".fcard")!);
		expect(screen.getByText("しょうけんこうざ")).toBeInTheDocument();
		fireEvent.click(container.querySelector('[data-grade="pass"]')!);
		expect(screen.getByText("2 / 121")).toBeInTheDocument();
		expect(dueEntry(topicDueId("japan-investing", "inv-001"))).toMatchObject({ step: 2 });
	});
});
