import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import {
	findListeningN2Section,
	listeningN2BookChapters,
	listeningN2Chapters,
	listeningN2PageSrc,
	listeningN2SectionDisc,
	listeningN2TrackSrc,
} from "../../app/data/listening-n2-book";
import { isAudioAssetRequest } from "../../workers/audio-range";

const pagesDir = resolve(import.meta.dirname, "../../public/listening/n2/pages");

describe("listening-n2-book", () => {
	it("keeps five chapters and the original section counts", () => {
		expect(listeningN2BookChapters().map((chapter) => [chapter.number, chapter.sections.length])).toEqual([
			[1, 5],
			[2, 7],
			[3, 5],
			[4, 5],
			[5, 5],
		]);
	});

	it("maps printed page numbers to the same JPG index", () => {
		expect(listeningN2PageSrc(12)).toBe("/listening/n2/pages/012.jpg");
		expect(listeningN2PageSrc(175)).toBe("/listening/n2/pages/175.jpg");
	});

	it("maps every lesson, answer, and translation page to an existing scan", () => {
		const missing: string[] = [];
		for (const chapter of listeningN2BookChapters()) {
			for (const section of chapter.sections) {
				for (const page of [...section.pages.map((item) => item.page), ...section.answerPages, ...section.translationPages]) {
					const file = resolve(pagesDir, `${String(page).padStart(3, "0")}.jpg`);
					if (!existsSync(file)) missing.push(`${chapter.number}-${section.number}:${page}`);
				}
			}
		}
		expect(missing).toEqual([]);
	});

	it("attaches each audio track to exactly one lesson page on its disc", () => {
		const seen = new Map<string, string>();
		for (const chapter of listeningN2Chapters) {
			for (const section of chapter.sections) {
				const disc = listeningN2SectionDisc(chapter.number, section.number);
				expect(section.pages.some((page) => page.tracks.includes(section.firstTrack)) || section.questions.some((question) => question.tracks.includes(section.firstTrack))).toBe(true);
				for (const page of section.pages) {
					for (const track of page.tracks) {
						const key = `${disc}-${track}`;
						expect(seen.has(key), `${key} already on ${seen.get(key)}`).toBe(false);
						seen.set(key, `${chapter.number}-${section.number}/p${page.page}`);
					}
				}
			}
		}
	});

	it("does not use chapter-title tracks, and maps every other track to an existing MP3", () => {
		const used = new Map<string, number[]>();
		const missing: string[] = [];
		for (const chapter of listeningN2Chapters) {
			for (const section of chapter.sections) {
				const disc = listeningN2SectionDisc(chapter.number, section.number);
				for (const question of section.questions) {
					for (const track of question.tracks) {
						used.set(disc, [...(used.get(disc) ?? []), track]);
						const fileName = disc === "cd1" ? `CD01_${String(track).padStart(2, "0")}.mp3` : `CD02_${String(track).padStart(2, "0")}.mp3`;
						const file = resolve(import.meta.dirname, `../../public/audio/n2/${disc}/${fileName}`);
						if (!existsSync(file)) missing.push(`${chapter.number}-${section.number}:${fileName}`);
						expect(isAudioAssetRequest(new Request(`https://example.test${listeningN2TrackSrc(disc, track)}`))).toBe(true);
					}
				}
			}
		}
		expect(missing).toEqual([]);
		expect(used.get("cd1")?.includes(1)).toBe(false);
		expect(used.get("cd1")?.includes(18)).toBe(false);
		expect(used.get("cd1")?.includes(52)).toBe(false);
		expect(used.get("cd2")?.includes(9)).toBe(false);
		expect(listeningN2SectionDisc(3, 4)).toBe("cd1");
		expect(listeningN2SectionDisc(3, 5)).toBe("cd2");
	});

	it("keeps chapter 5 スクリプト pages on the actual answer spreads", () => {
		expect(findListeningN2Section(5, 2)?.answerPages).toEqual([158, 160, 162]);
		expect(findListeningN2Section(5, 4)?.answerPages).toEqual([168]);
		expect(findListeningN2Section(5, 5)?.answerPages).toEqual([170, 172, 174]);
		expect(findListeningN2Section(5, 5)?.translationPages).toEqual([171, 173, 175]);
	});
});
