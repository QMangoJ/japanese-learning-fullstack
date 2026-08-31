import { listeningN2BookChapters } from "../data/listening-n2-book";
import { listeningBookChapters } from "../data/listening-n3-book";
import { readingWeeks as readingN2Weeks } from "../data/reading-n2";
import { readingWeeks } from "../data/reading-n3";

export function readingBundle() {
	return {
		scale: "week" as const,
		weeks: readingWeeks.map((week) => ({
			n: week.week,
			title: week.title,
			title_cn: week.titleCn,
			title_en: week.titleEn,
			days: week.days.map((day) => ({
				day: day.day,
				title: day.label,
				title_cn: day.label,
				title_en: day.labelEn || day.label,
				vocab: day.vocab,
				grammar: day.grammar,
			})),
		})),
	};
}

export function listeningBundle() {
	return {
		scale: "chapter" as const,
		weeks: listeningBookChapters.map((chapter) => ({
			n: chapter.number,
			title: chapter.title,
			title_cn: chapter.title_cn,
			title_en: chapter.title_en,
			days: chapter.sections.map((section) => ({
				day: section.number,
				title: section.title,
				title_cn: section.title_cn,
				title_en: section.title_en,
			})),
		})),
	};
}

export function readingN2Bundle() {
	return {
		scale: "week" as const,
		weeks: readingN2Weeks.map((week) => ({
			n: week.week,
			title: week.title,
			title_cn: week.titleCn,
			title_en: week.titleEn,
			days: week.days.map((day) => ({
				day: day.day,
				title: day.label,
				title_cn: day.label,
				title_en: day.labelEn || day.label,
				vocab: day.vocab,
				grammar: day.grammar,
			})),
		})),
	};
}

export function listeningN2Bundle() {
	return {
		scale: "chapter" as const,
		weeks: listeningN2BookChapters().map((chapter) => ({
			n: chapter.number,
			title: chapter.title,
			title_cn: chapter.title_cn,
			title_en: chapter.title_en,
			days: chapter.sections.map((section) => ({
				day: section.number,
				title: section.title,
				title_cn: section.title_cn,
				title_en: section.title_en,
			})),
		})),
	};
}
