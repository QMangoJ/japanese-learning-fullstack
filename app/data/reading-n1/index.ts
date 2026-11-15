import type { ReadingDay, ReadingWeek } from "../reading-n3/types";

import { w1d1 } from "./w1d1";
import { w1d2 } from "./w1d2";
import { w1d3 } from "./w1d3";
import { w1d4 } from "./w1d4";
import { w1d5 } from "./w1d5";
import { w1d6 } from "./w1d6";
import { w1d7 } from "./w1d7";

export type { ReadingDay, ReadingWeek } from "../reading-n3/types";

/** Week headings from《N1読解 新日语能力考试考前对策》目次. */
export const weekOutline: Omit<ReadingWeek, "days">[] = [
	{
		week: 1,
		title: "注意する言葉はどれ？",
		titleKana: "ちゅういすることばはどれ",
		titleCn: "注意哪些词语？",
		titleEn: "Which words should you watch out for?",
		printedStart: 11,
	},
];

export const dayOutline: { week: number; day: number; label: string }[] = [
	{ week: 1, day: 1, label: "（ ）の中に入るのは？" },
	{ week: 1, day: 2, label: "意見を言いたいときの疑問文" },
	{ week: 1, day: 3, label: "否定「ない」に注意！" },
	{ week: 1, day: 4, label: "長文によく使われる表現" },
	{ week: 1, day: 5, label: "文と文とをつなぐ言葉 接続詞・接続詞的表現①" },
	{ week: 1, day: 6, label: "文と文とをつなぐ言葉 接続詞・接続詞的表現②" },
	{ week: 1, day: 7, label: "実戦問題" },
];

export const readingDays: ReadingDay[] = [
	w1d1, w1d2, w1d3, w1d4, w1d5, w1d6, w1d7,
];

export function findDay(week: number, day: number): ReadingDay | undefined {
	return readingDays.find((item) => item.week === week && item.day === day);
}

export const readingWeeks: ReadingWeek[] = weekOutline
	.map((week) => ({
		...week,
		days: readingDays.filter((day) => day.week === week.week).sort((a, b) => a.day - b.day),
	}))
	.filter((week) => week.days.length > 0);
