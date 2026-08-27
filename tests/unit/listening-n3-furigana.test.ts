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
		expect(annotatedLines.size).toBe(640);
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

	it("matches the reviewed textbook readings in chapters 3 through 5", () => {
		const estimate = listeningTranscriptWithFurigana(transcriptLine(3, 4, "ヒガシ印刷さんからの見積書"));
		expect(estimate).toContain("{見積|みつもり}{書|しょ}");

		const oyama = listeningTranscriptWithFurigana(transcriptLine(3, 4, "日本通信の小川"));
		expect(oyama).toContain("{大山|おおやま}{様|さま}");
		expect(oyama).not.toContain("{大山|だいせん}");

		expect(listeningTranscriptWithFurigana(transcriptLine(3, 6, "来週の火曜日"))).toContain("{火曜日|かようび}");
		expect(listeningTranscriptWithFurigana(transcriptLine(4, 1, "白髪も染めて"))).toContain("{白髪|しらが}");
		expect(listeningTranscriptWithFurigana(transcriptLine(4, 2, "今駅に着きました"))).toContain("{今|いま}{駅|えき}");
		expect(listeningTranscriptWithFurigana(transcriptLine(4, 4, "この間、学校"))).toContain("この{間|あいだ}");
		expect(listeningTranscriptWithFurigana(transcriptLine(4, 5, "日本人の友達"))).toContain("{日本人|にほんじん}");

		expect(listeningTranscriptWithFurigana(transcriptLine(5, 2, "給料日には"))).toContain("{給料日|きゅうりょうび}");
		expect(listeningTranscriptWithFurigana(transcriptLine(5, 2, "同じ階に1つ"))).toContain("{階|かい}");
		expect(listeningTranscriptWithFurigana(transcriptLine(5, 3, "今度の土曜日、ゴルフ"))).toContain("{土曜日|どようび}");
		expect(listeningTranscriptWithFurigana(transcriptLine(5, 3, "体を大切に"))).toContain("{体|からだ}");
		expect(listeningTranscriptWithFurigana(transcriptLine(5, 3, "人と知り合う"))).toContain("{人|ひと}");
	});

	it("uses weekday readings when the transcript names days of the week", () => {
		expect(listeningTranscriptWithFurigana(transcriptLine(3, 3, "月・水・金は"))).toContain("{月|げつ}・{水|すい}・{金|きん}");
		expect(listeningTranscriptWithFurigana(transcriptLine(2, 5, "今度の日曜日"))).toContain("{日曜日|にちようび}");
		expect(listeningTranscriptWithFurigana(transcriptLine(3, 2, "20日月曜日"))).toContain("{月曜日|げつようび}");
	});
});
