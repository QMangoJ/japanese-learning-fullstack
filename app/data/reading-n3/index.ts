import type { ReadingDay, ReadingWeek } from "./types";

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
import { w4d1 } from "./w4d1";
import { w4d2 } from "./w4d2";
import { w4d3 } from "./w4d3";
import { w4d4 } from "./w4d4";
import { w4d5 } from "./w4d5";
import { w4d6 } from "./w4d6";
import { w4d7 } from "./w4d7";
import { w5d1 } from "./w5d1";
import { w5d2 } from "./w5d2";
import { w5d3 } from "./w5d3";
import { w5d4 } from "./w5d4";
import { w5d5 } from "./w5d5";
import { w5d6 } from "./w5d6";
import { w5d7 } from "./w5d7";
import { w6d1 } from "./w6d1";
import { w6d2 } from "./w6d2";
import { w6d3 } from "./w6d3";
import { w6d4 } from "./w6d4";
import { w6d5 } from "./w6d5";
import { w6d6 } from "./w6d6";
import { w6d7 } from "./w6d7";

export * from "./types";

/** Week headings and the printed table of contents, used for the catalog. */
export const weekOutline: Omit<ReadingWeek, "days">[] = [
	{
		week: 1,
		title: "お知らせや案内を読もう",
		titleKana: "おしらせやあんないをよもう",
		titleCn: "阅读各种启事和指南",
		titleEn: "Try to read notices and information!",
		printedStart: 11,
	},
	{
		week: 2,
		title: "身のまわりの文書を読もう",
		titleKana: "みのまわりのぶんしょをよもう",
		titleCn: "阅读日常生活中随处可见的文章",
		titleEn: "Let's read the language you see on a daily basis!",
		printedStart: 27,
	},
	{
		week: 3,
		title: "通信文を読もう",
		titleKana: "つうしんぶんをよもう",
		titleCn: "阅读通讯文章",
		titleEn: "Let's read letters and messages!",
		printedStart: 43,
	},
	{
		week: 4,
		title: "新聞を読もう",
		titleKana: "しんぶんをよもう",
		titleCn: "阅读报纸",
		titleEn: "Let's read newspapers!",
		printedStart: 59,
	},
	{
		week: 5,
		title: "日記や小説を読もう",
		titleKana: "にっきやしょうせつをよもう",
		titleCn: "阅读日记和小说",
		titleEn: "Let's read diaries and novels!",
		printedStart: 75,
	},
	{
		week: 6,
		title: "意見文や説明文を読もう",
		titleKana: "いけんぶんやせつめいぶんをよもう",
		titleCn: "阅读议论文和说明文",
		titleEn: "Try to read opinions and explanations!",
		printedStart: 91,
	},
];

/** The printed table of contents — every one of the 42 days, in book order. */
export const dayOutline: { week: number; day: number; label: string }[] = [
	{ week: 1, day: 1, label: "案内①" },
	{ week: 1, day: 2, label: "案内②" },
	{ week: 1, day: 3, label: "案内③" },
	{ week: 1, day: 4, label: "試験要項" },
	{ week: 1, day: 5, label: "募集①" },
	{ week: 1, day: 6, label: "募集②" },
	{ week: 1, day: 7, label: "実戦問題" },
	{ week: 2, day: 1, label: "カタログ①" },
	{ week: 2, day: 2, label: "カタログ②" },
	{ week: 2, day: 3, label: "お知らせ" },
	{ week: 2, day: 4, label: "説明書①" },
	{ week: 2, day: 5, label: "説明書②" },
	{ week: 2, day: 6, label: "保証書" },
	{ week: 2, day: 7, label: "実戦問題" },
	{ week: 3, day: 1, label: "メール①" },
	{ week: 3, day: 2, label: "メール②" },
	{ week: 3, day: 3, label: "手紙・はがき①" },
	{ week: 3, day: 4, label: "手紙・はがき②" },
	{ week: 3, day: 5, label: "手紙・はがき③" },
	{ week: 3, day: 6, label: "FAX（ビジネスレター）" },
	{ week: 3, day: 7, label: "実戦問題" },
	{ week: 4, day: 1, label: "見出し" },
	{ week: 4, day: 2, label: "グラフ①" },
	{ week: 4, day: 3, label: "グラフ②" },
	{ week: 4, day: 4, label: "広告①" },
	{ week: 4, day: 5, label: "広告②" },
	{ week: 4, day: 6, label: "まんが" },
	{ week: 4, day: 7, label: "実戦問題" },
	{ week: 5, day: 1, label: "日記①" },
	{ week: 5, day: 2, label: "日記②" },
	{ week: 5, day: 3, label: "家族①" },
	{ week: 5, day: 4, label: "家族②" },
	{ week: 5, day: 5, label: "小説①" },
	{ week: 5, day: 6, label: "小説②" },
	{ week: 5, day: 7, label: "実戦問題" },
	{ week: 6, day: 1, label: "意見文①" },
	{ week: 6, day: 2, label: "意見文②" },
	{ week: 6, day: 3, label: "意見文③" },
	{ week: 6, day: 4, label: "計算に関する文章" },
	{ week: 6, day: 5, label: "医学に関する文章" },
	{ week: 6, day: 6, label: "社会に関する文章" },
	{ week: 6, day: 7, label: "実戦問題" },
];

/** Every transcribed day, in book order. Add new day modules here. */
export const readingDays: ReadingDay[] = [w1d1, w1d2, w1d3, w1d4, w1d5, w1d6, w1d7, w2d1, w2d2, w2d3, w2d4, w2d5, w2d6, w2d7, w3d1, w3d2, w3d3, w3d4, w3d5, w3d6, w3d7, w4d1, w4d2, w4d3, w4d4, w4d5, w4d6, w4d7, w5d1, w5d2, w5d3, w5d4, w5d5, w5d6, w5d7, w6d1, w6d2, w6d3, w6d4, w6d5, w6d6, w6d7];

export function findDay(week: number, day: number): ReadingDay | undefined {
	return readingDays.find((item) => item.week === week && item.day === day);
}

export const readingWeeks: ReadingWeek[] = weekOutline.map((week) => ({
	...week,
	days: readingDays.filter((day) => day.week === week.week).sort((a, b) => a.day - b.day),
}));
