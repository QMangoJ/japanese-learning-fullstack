import { listeningN2BookChapters } from "../data/listening-n2-book";
import { listeningBookChapters } from "../data/listening-n3-book";
import {
	readingN2CatalogDays,
	readingN2CatalogWeeks,
	readingN3CatalogDays,
	readingN3CatalogWeeks,
} from "../data/reading-catalogs";

function readingCatalogBundle(
	weeks: typeof readingN3CatalogWeeks,
	days: typeof readingN3CatalogDays,
) {
	return {
		scale: "week" as const,
		weeks: weeks.map((week) => ({
			n: week.week,
			title: week.title,
			title_cn: week.titleCn,
			title_en: week.titleEn,
			days: days
				.filter((day) => day.week === week.week)
				.map((day) => ({
					day: day.day,
					title: day.label,
					title_cn: day.label,
					title_en: day.label,
				})),
		})),
	};
}

export function readingBundle() {
	return readingCatalogBundle(readingN3CatalogWeeks, readingN3CatalogDays);
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
	return readingCatalogBundle(readingN2CatalogWeeks, readingN2CatalogDays);
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
