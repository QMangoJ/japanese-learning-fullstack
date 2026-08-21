import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { listeningBookChapters } from "../../app/data/listening-n3-book";
import { getListeningLesson } from "../../app/data/listening-n3-lessons";
import type { ListeningLessonBlock } from "../../app/data/listening-n3-lesson-types";

const figuresDir = resolve(import.meta.dirname, "../../public/listening/n3/figures");
const knownTypes = new Set([
	"hero",
	"slogan",
	"h",
	"p",
	"tip",
	"steps",
	"table",
	"kv",
	"box",
	"figure",
	"example",
	"aside",
	"note",
	"q",
]);

function at(chapter: number, section: number, extra: string) {
	return `listening ${chapter}-${section}: ${extra}`;
}

function figureName(src: string) {
	return src.replace(/^\/listening\/n3\/figures\//, "");
}

function assertBlock(block: ListeningLessonBlock, chapter: number, section: number, index: number) {
	const here = at(chapter, section, `block[${index}] type=${(block as { type?: string }).type}`);
	expect(knownTypes.has(block.type), `${here} is not a known lesson block`).toBe(true);

	switch (block.type) {
		case "hero":
			expect(block.title, `${here} needs title`).toBeTruthy();
			expect(block.no, `${here} needs no`).toBe(section);
			break;
		case "slogan":
		case "h":
		case "p":
		case "tip":
			expect(typeof block.jp, `${here} needs jp`).toBe("string");
			break;
		case "steps":
			expect(Array.isArray(block.items), `${here} needs items[]`).toBe(true);
			break;
		case "table":
			expect(Array.isArray(block.rows), `${here} needs rows[]`).toBe(true);
			for (const [rowIndex, row] of block.rows.entries()) {
				expect(Array.isArray(row), `${here} row ${rowIndex} must be an array`).toBe(true);
			}
			break;
		case "kv":
			expect(Array.isArray(block.rows), `${here} needs rows[]`).toBe(true);
			for (const [rowIndex, row] of block.rows.entries()) {
				expect(row.k, `${here} row ${rowIndex} needs k`).toBeTruthy();
				expect(typeof row.v, `${here} row ${rowIndex} needs v`).toBe("string");
			}
			break;
		case "box":
			expect(Array.isArray(block.items), `${here} needs items[]`).toBe(true);
			for (const [itemIndex, item] of block.items.entries()) {
				expect(item.title, `${here} item ${itemIndex} needs title`).toBeTruthy();
				expect(Array.isArray(item.lines), `${here} item ${itemIndex} 「${item.title}」 needs lines[]`).toBe(true);
			}
			break;
		case "figure":
			expect(block.src, `${here} needs src`).toMatch(/^\/listening\/n3\/figures\//);
			expect(block.alt, `${here} needs alt`).toBeTruthy();
			expect(existsSync(resolve(figuresDir, figureName(block.src))), `${here} missing ${block.src}`).toBe(true);
			break;
		case "example":
			expect(Array.isArray(block.lines), `${here} needs lines[]`).toBe(true);
			break;
		case "aside":
			expect(block.title, `${here} needs title`).toBeTruthy();
			expect(typeof block.text, `${here} needs text`).toBe("string");
			break;
		case "note":
			expect(typeof block.text, `${here} needs text`).toBe("string");
			break;
		case "q":
			expect(block.label, `${here} needs label`).toBeTruthy();
			if (block.tracks) {
				expect(Array.isArray(block.tracks), `${here} tracks must be an array`).toBe(true);
				for (const track of block.tracks) expect(track, `${here} track`).toBeGreaterThan(0);
			}
			if (block.options) expect(Array.isArray(block.options), `${here} options must be an array`).toBe(true);
			if (block.figure) {
				expect(block.figure, `${here} figure`).toMatch(/^\/listening\/n3\/figures\//);
				expect(existsSync(resolve(figuresDir, figureName(block.figure))), `${here} missing ${block.figure}`).toBe(true);
			}
			break;
	}
}

describe("listening-n3-lessons", () => {
	const catalog = listeningBookChapters.flatMap((chapter) =>
		chapter.sections.map((section) => ({ chapter: chapter.number, section: section.number, title: section.title })),
	);

	it("covers every catalog section with a reconstructed lesson", () => {
		expect(catalog).toHaveLength(27);
		for (const { chapter, section, title } of catalog) {
			const lesson = getListeningLesson(chapter, section);
			expect(lesson, at(chapter, section, `missing lesson (${title})`)).toBeTruthy();
			expect(lesson!.blocks[0]?.type, at(chapter, section, "first block should be hero")).toBe("hero");
			expect(lesson!.answer, at(chapter, section, "needs answer text")).toBeTruthy();
			expect(lesson!.transcript, at(chapter, section, "needs transcript")).toBeTruthy();
		}
	});

	it("gives every rendered block the fields LessonBlocks maps over", () => {
		for (const { chapter, section } of catalog) {
			const lesson = getListeningLesson(chapter, section);
			expect(lesson).toBeTruthy();
			lesson!.blocks.forEach((block, index) => assertBlock(block, chapter, section, index));
		}
	});

	it("gives every lesson an English transcript", () => {
		for (const { chapter, section } of catalog) {
			const lesson = getListeningLesson(chapter, section);
			expect(lesson?.transcript_en, at(chapter, section, "needs transcript_en")).toBeTruthy();
			expect(lesson!.transcript_en!.trim().length, at(chapter, section, "transcript_en too short")).toBeGreaterThan(20);
			expect(lesson!.transcript_en, at(chapter, section, "transcript_en should be English, not a JP copy")).not.toBe(lesson!.transcript);
		}
	});

	it("includes every chapter-1 section-2 drill in Japanese, Chinese, and English", () => {
		const lesson = getListeningLesson(1, 2);
		expect(lesson).toBeTruthy();
		for (const [label, text] of [
			["transcript", lesson!.transcript],
			["transcript_cn", lesson!.transcript_cn],
			["transcript_en", lesson!.transcript_en],
		] as const) {
			expect(text, `1-2 ${label} missing`).toBeTruthy();
			expect(text, `1-2 ${label} needs the worked example`).toMatch(/例題|例题/);
			for (const mark of ["①", "②", "③", "④", "⑤"]) {
				expect(text, `1-2 ${label} missing ${mark}`).toContain(mark);
			}
		}
		expect(lesson!.transcript).toContain("書いてもらってください");
		expect(lesson!.transcript).toContain("手伝わされた");
		expect(lesson!.transcript).toContain("ぼくにも使わせて");
		expect(lesson!.transcript).toContain("病院へ行ってきて");
		expect(lesson!.transcript).toContain("飲め飲め");
		expect(lesson!.transcript_cn).toContain("让他写");
		expect(lesson!.transcript_cn).toContain("医院");
		expect(lesson!.transcript_en).toContain("hospital");
		expect(lesson!.transcript_en).toContain("drink");
	});

	it("keeps the final drills in every formerly truncated transcript", () => {
		const checks = [
			[1, 1, "バースデーパーティー", "生日聚会"],
			[1, 3, "こちらのボタンでお知らせください", "按这个按钮"],
			[1, 4, "11時を過ぎますと", "超过 11 点"],
			[1, 5, "問題Ⅱ 5番", "問題Ⅱ 5番"],
			[2, 6, "問題V", "問題V"],
			[4, 5, "問題III・2番", "問題III・2番"],
			[5, 5, "【7番】", "【7番】"],
		] as const;
		for (const [chapter, section, japanese, chinese] of checks) {
			const lesson = getListeningLesson(chapter, section)!;
			expect(lesson.transcript, at(chapter, section, `missing final Japanese drill ${japanese}`)).toContain(japanese);
			expect(lesson.transcript_cn, at(chapter, section, `missing final Chinese drill ${chinese}`)).toContain(chinese);
		}
	});

	it("gives every lesson a Chinese transcript", () => {
		for (const { chapter, section } of catalog) {
			const lesson = getListeningLesson(chapter, section);
			expect(lesson?.transcript_cn, at(chapter, section, "needs transcript_cn")).toBeTruthy();
			expect(lesson!.transcript_cn!.trim().length, at(chapter, section, "transcript_cn too short")).toBeGreaterThan(20);
			expect(lesson!.transcript_cn, at(chapter, section, "transcript_cn should be Chinese, not a JP copy")).not.toBe(lesson!.transcript);
		}
	});

	it("gives chapters 1 and 3 teaching and practice figures like chapters 2, 4, and 5", () => {
		const needed = [
			[1, 1, "/listening/n3/figures/ch1-s1-example.jpg"],
			[1, 2, "/listening/n3/figures/ch1-s2-example.jpg"],
			[1, 3, "/listening/n3/figures/ch1-s3-example.jpg"],
			[1, 4, "/listening/n3/figures/ch1-s4-example.jpg"],
			[3, 1, "/listening/n3/figures/ch3-s1-example.jpg"],
			[3, 1, "/listening/n3/figures/ch3-s1-q1.jpg"],
			[3, 2, "/listening/n3/figures/ch3-s2-q1.jpg"],
			[3, 3, "/listening/n3/figures/ch3-s3-q1.jpg"],
			[3, 4, "/listening/n3/figures/ch3-s4-q1.jpg"],
			[3, 5, "/listening/n3/figures/ch3-s5-example.jpg"],
			[3, 6, "/listening/n3/figures/ch3-s6-q1.jpg"],
		] as const;
		for (const [chapter, section, src] of needed) {
			const lesson = getListeningLesson(chapter, section);
			const hits = lesson!.blocks.filter((block) => {
				if (block.type === "figure") return block.src === src;
				if (block.type === "q") return block.figure === src;
				return false;
			});
			expect(hits.length, at(chapter, section, `missing figure ${src}`)).toBeGreaterThan(0);
			expect(existsSync(resolve(figuresDir, figureName(src))), `missing file ${src}`).toBe(true);
		}
	});

	it("requires boxed notes to include a lines array, including the traffic-info item that used to crash", () => {
		const lesson = getListeningLesson(3, 2);
		expect(lesson).toBeTruthy();
		const boxes = lesson!.blocks.filter((block) => block.type === "box");
		expect(boxes.length).toBeGreaterThan(0);
		const flight = boxes
			.flatMap((block) => (block.type === "box" ? block.items : []))
			.find((item) => item.title.includes("ABC航空"));
		expect(flight, "chapter 3-2 must still teach the delayed-flight announcement").toBeTruthy();
		expect(Array.isArray(flight!.lines), "that announcement must have lines[] so the page can render").toBe(true);
		expect(flight!.lines.length).toBeGreaterThan(0);
	});
});
