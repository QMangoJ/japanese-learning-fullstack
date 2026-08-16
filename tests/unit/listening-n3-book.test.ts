import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { listeningBookChapters, listeningPageSrc, printedPage } from "../../app/data/listening-n3-book";

const pagesDir = resolve(import.meta.dirname, "../../public/listening/n3/pages");

describe("listening-n3-book", () => {
	it("keeps five chapters and the original section counts", () => {
		expect(listeningBookChapters.map((chapter) => [chapter.number, chapter.sections.length])).toEqual([
			[1, 5],
			[2, 6],
			[3, 6],
			[4, 5],
			[5, 5],
		]);
	});

	it("maps every lesson, answer, and translation page to an existing scan", () => {
		const missing: string[] = [];
		for (const chapter of listeningBookChapters) {
			for (const section of chapter.sections) {
				for (const page of [...section.pages.map((item) => item.page), ...section.answerPages, ...section.translationPages]) {
					const file = resolve(pagesDir, `${String(page).padStart(3, "0")}.jpg`);
					if (!existsSync(file)) missing.push(`${chapter.number}-${section.number}:${page}`);
				}
			}
		}
		expect(missing).toEqual([]);
	});

	it("prints footer page numbers as file page minus 3", () => {
		expect(printedPage(15)).toBe(12);
		expect(printedPage(27)).toBe(24);
		expect(listeningPageSrc(27)).toBe("/listening/n3/pages/027.jpg");
	});

	it("attaches each audio track to exactly one lesson page", () => {
		for (const chapter of listeningBookChapters) {
			const seen = new Map<number, string>();
			for (const section of chapter.sections) {
				expect(section.pages.some((page) => page.tracks.includes(section.firstTrack))).toBe(true);
				for (const page of section.pages) {
					for (const track of page.tracks) {
						const key = `${chapter.disc}-${track}`;
						expect(seen.has(key)).toBe(false);
						seen.set(key, `${section.number}/${page.page}`);
					}
				}
			}
		}
	});
});
