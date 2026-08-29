import type { ListeningLesson } from "./listening-n3-lesson-types";
import { findListeningN2Section } from "./listening-n2-book";
import { chapter1Lessons } from "./listening-n2-lessons-ch1";
import { chapter2Lessons } from "./listening-n2-lessons-ch2";
import { chapter3Lessons } from "./listening-n2-lessons-ch3";
import { chapter4Lessons } from "./listening-n2-lessons-ch4";
import { chapter5Lessons } from "./listening-n2-lessons-ch5";

const byChapter: Record<number, readonly ListeningLesson[]> = {
	1: chapter1Lessons,
	2: chapter2Lessons,
	3: chapter3Lessons,
	4: chapter4Lessons,
	5: chapter5Lessons,
};

export function getListeningN2Lesson(chapter: number, section: number): ListeningLesson | undefined {
	if (!findListeningN2Section(chapter, section)) return undefined;
	return byChapter[chapter]?.[section - 1];
}
