import { describe, expect, it } from "vitest";

import { listeningBookChapters } from "../../app/data/listening-n3-book";
import { listeningTranscriptWithFurigana } from "../../app/data/listening-n3-furigana";
import { getListeningLesson } from "../../app/data/listening-n3-lessons";

const KANJI = /[一-龯々〆ヵヶ]/;
const RUBY = /\{([^{}|]+)\|([^{}|]+)\}/g;

function transcriptLine(chapter: number, section: number, fragment: string) {
	const line = getListeningLesson(chapter, section)?.transcript
		.split("\n")
		.find((candidate) => candidate.includes(fragment));
	expect(line, `missing transcript line containing ${fragment}`).toBeTruthy();
	return line!;
}

describe("N3 listening transcript furigana", () => {
	it("keeps every transcript character and annotates every line containing kanji", () => {
		let lessonCount = 0;
		const annotatedLines = new Set<string>();

		for (const chapter of listeningBookChapters) {
			for (const section of chapter.sections) {
				const transcript = getListeningLesson(chapter.number, section.number)?.transcript;
				expect(transcript, `missing transcript ${chapter.number}-${section.number}`).toBeTruthy();
				lessonCount += 1;
				const annotated = listeningTranscriptWithFurigana(transcript!);
				expect(annotated.replace(RUBY, "$1")).toBe(transcript);

				for (const [index, line] of transcript!.split("\n").entries()) {
					if (!KANJI.test(line)) continue;
					annotatedLines.add(line.trim());
					expect(annotated.split("\n")[index], `${chapter.number}-${section.number} line ${index + 1}`).toMatch(RUBY);
				}
			}
		}

		expect(lessonCount).toBe(27);
		expect(annotatedLines.size).toBe(639);
	});

	it("uses the contextual readings from the listening scripts", () => {
		const family = listeningTranscriptWithFurigana(transcriptLine(2, 3, "あなたのお父さんやお母さん"));
		expect(family).toContain("{女|おんな}");
		expect(family).toContain("お{父|とう}さん");
		expect(family).toContain("お{母|かあ}さん");
		expect(family).toContain("2{人|ふたり}");
		expect(family).toContain("{私|わたし}たち");
		expect(listeningTranscriptWithFurigana(transcriptLine(2, 3, "男：これ、かっこいい"))).toContain("{男|おとこ}");

		const trip = listeningTranscriptWithFurigana(transcriptLine(2, 6, "明日から10日間出張"));
		expect(trip).toContain("{明日|あした}");
		expect(trip).toContain("{10日間|とおかかん}");

		const voicemail = listeningTranscriptWithFurigana(transcriptLine(5, 1, "今日中にだって"));
		expect(voicemail).toContain("{今日中|きょうじゅう}");
	});
});
