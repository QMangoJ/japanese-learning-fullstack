import { chapter1Lessons } from "./listening-n3-lessons-ch1";
import { chapter2Lessons } from "./listening-n3-lessons-ch2";
import { chapter3Lessons } from "./listening-n3-lessons-ch3";
import { chapter4Lessons } from "./listening-n3-lessons-ch4";
import { chapter5Lessons } from "./listening-n3-lessons-ch5";
import type { ListeningLesson } from "./listening-n3-lesson-types";
import { findListeningSection } from "./listening-n3-book";
import { listeningTranscriptEn } from "./listening-n3-transcripts-en";

const byChapter: Record<number, readonly ListeningLesson[]> = {
	1: chapter1Lessons,
	2: chapter2Lessons,
	3: chapter3Lessons,
	4: chapter4Lessons,
	5: chapter5Lessons,
};

export function getListeningLesson(chapter: number, section: number): ListeningLesson | undefined {
	const found = findListeningSection(chapter, section);
	const lesson = byChapter[chapter]?.[section - 1];
	if (!lesson || !found) return lesson;
	const transcript_en = lesson.transcript_en || listeningTranscriptEn[`${chapter}-${section}`];
	if (transcript_en && transcript_en !== lesson.transcript_en) {
		return { ...lesson, transcript_en };
	}
	return lesson;
}
