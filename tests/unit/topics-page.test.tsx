import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { dueEntry, resetDueForTests } from "../../app/study/due-review";
import { setNavImpl } from "../../app/study/store";
import { Sheet } from "../../app/study/Sheet";
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

	it("common sheet tiles every topic under its group and links to its detail page", () => {
		const navs: string[] = [];
		setNavImpl((key) => navs.push(key));
		const { container } = render(<Sheet kind="common" onClose={() => {}} onLevel={() => {}} />);
		const subs = [...container.querySelectorAll(".sheet-sub")].map((e) => e.textContent);
		expect(subs).toEqual(["工作面试", "生活", "投资理财", "通用"]);
		const walk = [...container.querySelectorAll(".sheet-sub, .sheet-item")].map((e) => e.textContent ?? "");
		const at = (label: string) => walk.findIndex((t) => t.includes(label));
		expect(at("前端工程师")).toBeGreaterThan(at("工作面试"));
		expect(at("前端工程师")).toBeLessThan(at("生活"));
		expect(at("银行 ATM")).toBeGreaterThan(at("生活"));
		expect(at("逛街买衣服")).toBeGreaterThan(at("生活"));
		expect(at("咖啡店菜单")).toBeGreaterThan(at("生活"));
		expect(at("咖啡店菜单")).toBeLessThan(at("投资理财"));
		const go = (label: string, route: string) => {
			navs.length = 0;
			fireEvent.click(screen.getByText(label));
			expect(navs).toEqual([route]);
		};
		go("前端工程师", "#/topics/frontend");
		go("银行 ATM", "#/topics/bank-atm");
		go("逛街买衣服", "#/topics/clothes-shopping");
		go("咖啡店菜单", "#/topics/cafe-menu");
		go("日语面试", "#/topics/job-interview");
		go("日本投资理财", "#/topics/japan-investing");
		setNavImpl(() => {});
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

	it("puts readings as ruby over kanji only on kanji-journey script cards", async () => {
		const { container } = render(<TopicsPage slug="kanji-journey" />);
		await waitFor(() => expect(container.querySelector('[data-card="kj-002"]')).not.toBeNull());
		const head = (id: string) => container.querySelector(`[data-card="${id}"] .topic-item__top`)!;
		const rubyBase = (r: Element) =>
			[...r.childNodes]
				.filter((n) => n.nodeType === 3)
				.map((n) => n.textContent)
				.join("");
		// 正文句（kj-002）：复用分段注音渲染主句——ruby 只罩汉字，假名部分在 ruby 外，主区没有整行 kana。
		const top = head("kj-002");
		expect(top.querySelector(".topic-item__kana")).toBeNull();
		const rubies = [...top.querySelectorAll(".topic-item__jp ruby")];
		expect(rubies.map(rubyBase)).toEqual(["中国", "来"]);
		expect(rubies.map((r) => r.querySelector("rt")?.textContent)).toEqual(["ちゅうごく", "き"]);
		expect(top.querySelector(".topic-item__jp")?.textContent).toContain("から");
		// 全假名开场句（kj-001）：没有汉字就不需要注音，也不摆 kana 行。
		const plain = head("kj-001");
		expect(plain.querySelector("ruby")).toBeNull();
		expect(plain.querySelector(".topic-item__kana")).toBeNull();
		// 问句卡（kj-024）：例句是回答、主句没有分段 → 保留整行 kana 兜底。
		const qa = head("kj-024");
		expect(qa.querySelector(".topic-item__jp ruby")).toBeNull();
		expect(qa.querySelector(".topic-item__kana")?.textContent).toBe("この どうがは じぶんで つくったんですか");
	});

	it("renders word cards as whole-word ruby without a kana row", async () => {
		const { container } = render(<TopicsPage slug="japan-investing" />);
		await screen.findByText("証券口座");
		const item = container.querySelector('[data-card="inv-001"]')!;
		const top = item.querySelector(".topic-item__top")!;
		expect(top.querySelector(".topic-item__kana")).toBeNull();
		const ruby = top.querySelector(".topic-item__jp ruby")!;
		expect(ruby).not.toBeNull();
		expect(ruby.querySelector("rt")?.textContent).toBe("しょうけんこうざ");
	});

	it("keeps the kana row as fallback for sentence cards without ruby segments (bo-001)", async () => {
		const { container } = render(<TopicsPage slug="bank-atm" />);
		await screen.findByText("口座開設をしたいのですが。");
		const item = container.querySelector('[data-card="bo-001"]')!;
		const top = item.querySelector(".topic-item__top")!;
		expect(top.querySelector(".topic-item__jp ruby")).toBeNull();
		expect(top.querySelector(".topic-item__kana")?.textContent).toBe("こうざかいせつをしたいのですが");
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
