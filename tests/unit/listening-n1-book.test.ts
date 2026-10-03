import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import {
	LISTENING_N1_MISSING_TRACKS,
	listeningN1BookChapters,
	listeningN1Chapters,
	listeningN1SectionDisc,
	listeningN1TrackSrc,
} from "../../app/data/listening-n1-book";
import { getListeningN1Lesson } from "../../app/data/listening-n1-lessons";
import { isAudioAssetRequest } from "../../workers/audio-range";

const audioFile = (disc: "cd1" | "cd2", track: number) =>
	resolve(import.meta.dirname, `../../public/audio/n1/${disc}/${disc === "cd1" ? "CD01" : "CD02"}_${String(track).padStart(2, "0")}.mp3`);

describe("listening-n1-book", () => {
	it("keeps five chapters and the original section counts", () => {
		expect(listeningN1BookChapters().map((chapter) => [chapter.number, chapter.sections.length])).toEqual([
			[1, 5],
			[2, 7],
			[3, 5],
			[4, 5],
			[5, 5],
		]);
	});

	it("switches from CD 1 to CD 2 at chapter 3 section 5", () => {
		expect(listeningN1SectionDisc(3, 4)).toBe("cd1");
		expect(listeningN1SectionDisc(3, 5)).toBe("cd2");
		expect(listeningN1TrackSrc("cd2", 1)).toBe("/audio/n1/cd2/CD02_01.mp3");
	});

	it("maps every question and page track to an existing MP3, skipping title and missing tracks", () => {
		const missing: string[] = [];
		const used: Record<string, number[]> = { cd1: [], cd2: [] };
		for (const chapter of listeningN1Chapters) {
			for (const section of chapter.sections) {
				const disc = listeningN1SectionDisc(chapter.number, section.number);
				const tracks = [...section.pages.flatMap((page) => page.tracks), ...section.questions.flatMap((question) => question.tracks)];
				for (const track of tracks) {
					used[disc].push(track);
					if (!existsSync(audioFile(disc, track))) missing.push(`${chapter.number}-${section.number}:${disc}/${track}`);
					expect(isAudioAssetRequest(new Request(`https://example.test${listeningN1TrackSrc(disc, track)}`))).toBe(true);
				}
			}
		}
		expect(missing).toEqual([]);
		for (const title of [1, 19, 54]) expect(used.cd1).not.toContain(title);
		expect(used.cd2).not.toContain(9);
		for (const track of LISTENING_N1_MISSING_TRACKS.cd2) {
			expect(used.cd2).not.toContain(track);
			expect(existsSync(audioFile("cd2", track))).toBe(false);
		}
	});

	it("loads a lesson for every section", () => {
		for (const chapter of listeningN1BookChapters()) {
			for (const section of chapter.sections) {
				expect(getListeningN1Lesson(chapter.number, section.number), `${chapter.number}-${section.number}`).toBeTruthy();
			}
		}
	});
});
