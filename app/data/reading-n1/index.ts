import type { ReadingDay, ReadingWeek } from "../reading-n3/types";

import { w1d1 } from "./w1d1";
import { w1d2 } from "./w1d2";
import { w1d3 } from "./w1d3";
import { w1d4 } from "./w1d4";
import { w1d5 } from "./w1d5";
import { w1d6 } from "./w1d6";
import { w1d7 } from "./w1d7";
import { w2d1 } from "./w2d1";
import { w2d2 } from "./w2d2";
import { w2d3 } from "./w2d3";
import { w2d4 } from "./w2d4";
import { w2d5 } from "./w2d5";
import { w2d6 } from "./w2d6";
import { w2d7 } from "./w2d7";
import { w3d1 } from "./w3d1";
import { w3d2 } from "./w3d2";
import { w3d3 } from "./w3d3";
import { w3d4 } from "./w3d4";
import { w3d5 } from "./w3d5";
import { w3d6 } from "./w3d6";
import { w3d7 } from "./w3d7";

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
	{
		week: 2,
		title: "いつ・だれ・何のこと？",
		titleKana: "いつ・だれ・なんのこと",
		titleCn: "什么时候、谁、什么事？",
		titleEn: "When, who, and what is it about?",
		printedStart: 29,
	},
	{
		week: 3,
		title: "答えは文章の中にある！",
		titleKana: "こたえはぶんしょうのなかにある",
		titleCn: "答案就在文章里！",
		titleEn: "The answers are in the text!",
		printedStart: 47,
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
	{ week: 2, day: 1, label: "それはだれのこと？" },
	{ week: 2, day: 2, label: "それはいつのこと？" },
	{ week: 2, day: 3, label: "どんな気持ち？" },
	{ week: 2, day: 4, label: "「これ」「それ」①" },
	{ week: 2, day: 5, label: "「これ」「それ」②" },
	{ week: 2, day: 6, label: "「これ」「それ」③" },
	{ week: 2, day: 7, label: "実戦問題" },
	{ week: 3, day: 1, label: "答えは書いてある！" },
	{ week: 3, day: 2, label: "結論を探せ！" },
	{ week: 3, day: 3, label: "何を言いたいの？①" },
	{ week: 3, day: 4, label: "何を言いたいの？②" },
	{ week: 3, day: 5, label: "文の骨組み" },
	{ week: 3, day: 6, label: "省略" },
	{ week: 3, day: 7, label: "実戦問題" },
];

export const readingDays: ReadingDay[] = [
	w1d1, w1d2, w1d3, w1d4, w1d5, w1d6, w1d7,
	w2d1, w2d2, w2d3, w2d4, w2d5, w2d6, w2d7,
	w3d1, w3d2, w3d3, w3d4, w3d5, w3d6, w3d7,
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
