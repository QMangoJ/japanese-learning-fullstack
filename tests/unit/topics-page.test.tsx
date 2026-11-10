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
const READING_DIR = join(process.cwd(), "public/data/reading");
const realFetch = globalThis.fetch;

beforeEach(() => {
	resetDueForTests();
	globalThis.fetch = vi.fn(async (url: string | URL | Request) => {
		const u = String(url);
		if (u.includes("/data/reading/")) return new Response(readFileSync(join(READING_DIR, u.split("/data/reading/")[1]), "utf8"), { status: 200 });
		const name = u.replace("/data/topics/", "");
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

	it("renders kanji-journey as a reading article (IT-listening form), not flashcards", async () => {
		const { container } = render(<TopicsPage slug="kanji-journey" />);
		await screen.findByText("《漢字的旅程》v8 暂停讲解（6:01）");
		// 旧闪卡形态消失：没有专题卡片列表、没有子主题筛选。
		expect(container.querySelector(".topic-item")).toBeNull();
		expect(container.querySelector(".topic-subs")).toBeNull();
		// 七段正文（开场、五处暂停、结尾）+ 来宾问答节。
		const heads = [...container.querySelectorAll(".kj-section-h")].map((h) => h.childNodes[0]?.textContent);
		expect(heads).toEqual([
			"开场",
			"第 1 段　甲骨文是怎样来的",
			"第 2 段　字形的变化，以「馬」为例",
			"第 3 段　汉字传到日本",
			"第 4 段　日本怎样写出自己的字",
			"第 5 段　日本自己造字，新词又传回中国",
			"结尾",
			"来宾问答",
		]);
		// 正文 20 句；问答 6 问 6 答；救命句 1 条。本页不带朗读按钮，正文句首也不带连续序号。
		// 全页不应出现 .sayb / .itl-s-no；问答的 Q 编号是问题标识，保留。
		const sections = [...container.querySelectorAll(".kj-section")];
		const bodyRows = sections.slice(0, 7).flatMap((s) => [...s.querySelectorAll(".itl-sentence")]);
		expect(bodyRows).toHaveLength(20);
		expect(container.querySelectorAll(".itl-s-no")).toHaveLength(0);
		expect(bodyRows.every((r) => r.querySelector(".itl-s-top") === null)).toBe(true);
		expect([...container.querySelectorAll(".kj-qa .kj-chip")].map((c) => c.textContent)).toEqual([
			"Q1", "A", "Q2", "A", "Q3", "A", "Q4", "A", "Q5", "A", "Q6", "A",
		]);
		expect(container.querySelectorAll(".kj-qa")).toHaveLength(6);
		expect(container.querySelectorAll(".itl-sentence")).toHaveLength(20 + 12 + 1);
		expect(container.querySelectorAll(".sayb")).toHaveLength(0);
		expect(container.querySelector(".itl-eyebrow")?.textContent).toBe("V8 PAUSE MEMO");
		expect(container.querySelector(".itl-head-meta")?.textContent).toContain("v8 暂停讲解");
		expect(container.querySelector(".itl-head-meta")?.textContent).toContain("6:01");
		// 第 1 句的注音：ruby 只罩汉字（中国/来），读音对，假名和空格在 ruby 外。
		const rubyBase = (r: Element) =>
			[...r.childNodes]
				.filter((n) => n.nodeType === 3)
				.map((n) => n.textContent)
				.join("");
		const first = bodyRows[0];
		const rubies = [...first.querySelectorAll(".itl-jp ruby")];
		expect(rubies.map(rubyBase)).toEqual(["中国", "来"]);
		expect(rubies.map((r) => r.querySelector("rt")?.textContent)).toEqual(["ちゅうごく", "き"]);
		// 五处暂停的时码和旁白最后一句在句子上方；舞台提示不进句子。造字段和旧时码不留。
		const pauses = [...container.querySelectorAll(".kj-pause")];
		expect(pauses).toHaveLength(7);
		expect(pauses[1].textContent).toContain("约 1:31");
		expect(pauses[1].textContent).toContain("そこで甲骨文字の「日」は、四角く、まっすぐな線で刻まれました。");
		expect(pauses[2].textContent).toContain("约 3:20");
		expect(pauses[3].textContent).toContain("约 3:55（万叶假名开始前）");
		expect(pauses[4].textContent).toContain("约 4:51");
		expect(pauses[4].textContent).toContain("「イ」。");
		expect(pauses[5].textContent).toContain("约 5:21（常用汉字开始前）");
		expect(pauses[0].textContent).not.toContain("旁白最后一句");
		const pageText = container.textContent ?? "";
		expect(pageText).not.toMatch(/2:16|4:05|4:39|5:35|6:06|汉字是怎样造出来的|形声文字/);
		// 问句同样带注音（Q3 甲骨文字）；Q6 的「〇週間」占位原样保留，不许被填上数字。
		// textContent 会把 ruby 读音插进句中，比对时先剥掉 <rt> 只留正文。
		const baseText = (el: Element) => {
			const clone = el.cloneNode(true) as Element;
			clone.querySelectorAll("rt").forEach((rt) => rt.remove());
			return clone.textContent;
		};
		expect(baseText(first.querySelector(".itl-jp")!)).toBe("みなさん、こんにちは。中国から 来た ダニエルです。");
		expect(bodyRows.map((row) => baseText(row.querySelector(".itl-jp")!)).join("\n")).not.toContain("继续播放");
		const qaPairs = [...container.querySelectorAll(".kj-qa")];
		expect(baseText(qaPairs[2].querySelector(".itl-jp")!)).toBe("甲骨文字はいつ見つかりましたか。");
		expect(baseText(qaPairs[5].querySelector(".kj-qa-a .itl-jp")!)).toBe("〇週間ぐらいかかりました。");
		// 救命句在文末小注区。
		expect(baseText(container.querySelector(".kj-rescue .itl-jp")!)).toBe("すみません、もう一度お願いします。");
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

	it("renders sentence cards with ruby segments and no kana row (bo-001 / bo-002)", async () => {
		// Daniel 2026-11-10 定的默认规矩：日语句子默认汉字加 ruby，有 ruby 就没有整行假名。
		// 原先这条断言的是「无分段整句卡保留整行 kana 兜底」，数据补齐分段后按新规矩改。
		const { container } = render(<TopicsPage slug="bank-atm" />);
		// 注音把整句拆成了多个文本节点，等卡片元素出现即可，不能再用整句 findByText。
		await waitFor(() => expect(container.querySelector('[data-card="bo-001"]')).not.toBeNull());
		const item = container.querySelector('[data-card="bo-001"]')!;
		const top = item.querySelector(".topic-item__top")!;
		expect(top.querySelector(".topic-item__kana")).toBeNull();
		const rubies = [...top.querySelectorAll(".topic-item__jp ruby")];
		expect(rubies.map((r) => r.childNodes[0]?.textContent)).toEqual(["口座開設"]);
		expect(rubies.map((r) => r.querySelector("rt")?.textContent)).toEqual(["こうざかいせつ"]);
		// 截图里被点名的第二句：普通預金口座・証券口座都要有分段注音，例句区有 ruby 时不再挂整行假名。
		const item2 = container.querySelector('[data-card="bo-002"]')!;
		const top2 = item2.querySelector(".topic-item__top")!;
		expect(top2.querySelector(".topic-item__kana")).toBeNull();
		const rt2 = [...top2.querySelectorAll(".topic-item__jp ruby rt")].map((rt) => rt.textContent);
		expect(rt2).toEqual(["ぎんこう", "ふつうよきんこうざ", "ねが", "しょうけんこうざ"]);
		expect(item2.querySelector(".topic-item__ex .review-reading")).toBeNull();
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
