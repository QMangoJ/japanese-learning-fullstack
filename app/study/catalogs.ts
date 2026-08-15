import { chapter2Sections } from "../data/listening-n3-structured-ch2";
import { chapter3Sections } from "../data/listening-n3-structured-ch3";
import { chapter4Sections, chapter5Sections } from "../data/listening-n3-structured-ch45";
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

const chapterOneDays = [
	{ day: 1, title: "発音について", title_cn: "发音与表记", title_en: "Pronunciation" },
	{ day: 2, title: "文法について①", title_cn: "授受・被动・使役", title_en: "Giving, passive, causative" },
	{ day: 3, title: "文法について②", title_cn: "敬语", title_en: "Honorifics" },
	{ day: 4, title: "会話表現", title_cn: "会话表达", title_en: "Conversational phrases" },
	{ day: 5, title: "まとめ問題", title_cn: "综合练习", title_en: "Review" },
];

const listeningChapters = [
	{ n: 1, title: "準備をしましょう", title_cn: "准备训练", title_en: "Get ready", days: chapterOneDays },
	{ n: 2, title: "問題のパターンに慣れましょう", title_cn: "熟悉题目模式", title_en: "Question patterns", sections: chapter2Sections },
	{ n: 3, title: "いろいろな場所で聞きましょう", title_cn: "在各种场所听", title_en: "Listen in different places", sections: chapter3Sections },
	{ n: 4, title: "いろいろな内容を聞きましょう", title_cn: "听各种内容", title_en: "Listen to different topics", sections: chapter4Sections },
	{ n: 5, title: "総まとめ問題", title_cn: "综合练习", title_en: "Final review", sections: chapter5Sections },
];

export function listeningBundle() {
	return {
		scale: "chapter" as const,
		weeks: listeningChapters.map((chapter) => ({
			n: chapter.n,
			title: chapter.title,
			title_cn: chapter.title_cn,
			title_en: chapter.title_en,
			days: (chapter.days ||
				(chapter.sections || []).map((section) => ({
					day: section.number,
					title: section.title,
					title_cn: section.subtitle,
					title_en: section.subtitle,
				}))) as { day: number; title: string; title_cn: string; title_en: string }[],
		})),
	};
}
