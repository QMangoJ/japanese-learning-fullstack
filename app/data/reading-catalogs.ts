type ReadingCatalogWeek = {
	week: number;
	title: string;
	titleCn: string;
	titleEn: string;
	printedStart: number;
};

const makeDays = (labels: readonly (readonly string[])[]) =>
	labels.map((week, weekIndex) =>
		week.map((label, dayIndex) => ({
			week: weekIndex + 1,
			day: dayIndex + 1,
			label,
		})),
	).flat();

export const readingN3CatalogWeeks: readonly ReadingCatalogWeek[] = [
	{ week: 1, title: "お知らせや案内を読もう", titleCn: "阅读各种启事和指南", titleEn: "Try to read notices and information!", printedStart: 11 },
	{ week: 2, title: "身のまわりの文書を読もう", titleCn: "阅读日常生活中随处可见的文章", titleEn: "Let's read the language you see on a daily basis!", printedStart: 27 },
	{ week: 3, title: "通信文を読もう", titleCn: "阅读通讯文章", titleEn: "Let's read letters and messages!", printedStart: 43 },
	{ week: 4, title: "新聞を読もう", titleCn: "阅读报纸", titleEn: "Let's read newspapers!", printedStart: 59 },
	{ week: 5, title: "日記や小説を読もう", titleCn: "阅读日记和小说", titleEn: "Let's read diaries and novels!", printedStart: 75 },
	{ week: 6, title: "意見文や説明文を読もう", titleCn: "阅读议论文和说明文", titleEn: "Try to read opinions and explanations!", printedStart: 91 },
];

export const readingN3CatalogDays = makeDays([
	["案内①", "案内②", "案内③", "試験要項", "募集①", "募集②", "実戦問題"],
	["カタログ①", "カタログ②", "お知らせ", "説明書①", "説明書②", "保証書", "実戦問題"],
	["メール①", "メール②", "手紙・はがき①", "手紙・はがき②", "手紙・はがき③", "FAX（ビジネスレター）", "実戦問題"],
	["見出し", "グラフ①", "グラフ②", "広告①", "広告②", "まんが", "実戦問題"],
	["日記①", "日記②", "家族①", "家族②", "小説①", "小説②", "実戦問題"],
	["意見文①", "意見文②", "意見文③", "計算に関する文章", "医学に関する文章", "社会に関する文章", "実戦問題"],
]);

export const readingN2CatalogWeeks: readonly ReadingCatalogWeek[] = [
	{ week: 1, title: "身の回りの文書を読もう", titleCn: "读身边的文章", titleEn: "Let's read the language you see on a daily basis", printedStart: 11 },
	{ week: 2, title: "お知らせや通知を読もう", titleCn: "读启事和通知", titleEn: "Let's learn to read various notices", printedStart: 27 },
	{ week: 3, title: "意見文や説明文を読もう", titleCn: "读评论文章和说明文", titleEn: "Let's read opinions and explanations", printedStart: 43 },
	{ week: 4, title: "エッセイや小説を読もう", titleCn: "读随笔和小说", titleEn: "Let's read essays and novels", printedStart: 59 },
	{ week: 5, title: "新聞を読もう", titleCn: "读报纸", titleEn: "Let's read the newspaper", printedStart: 77 },
	{ week: 6, title: "論説文を読もう", titleCn: "读议论文", titleEn: "Let's read some editorials", printedStart: 95 },
];

export const readingN2CatalogDays = makeDays([
	["割引券・クーポン", "ダイレクトメール", "アルバイト情報", "アパート・マンション情報", "利用案内", "レシピ", "実戦問題"],
	["お知らせ①", "お知らせ②", "お知らせ③", "通知①", "通知②", "通知③", "実戦問題"],
	["意見文①", "意見文②", "意見文③", "意見文④", "説明文①", "説明文②", "実戦問題"],
	["エッセイ①", "エッセイ②", "エッセイ③", "エッセイ④", "小説①", "小説②", "実戦問題"],
	["見出し①", "見出し②", "記事", "グラフ①", "グラフ②", "書評", "実戦問題"],
	["言語に関する文章", "化学に関する文章", "生物に関する文章", "物理に関する文章", "医学に関する文章", "数学に関する文章", "実戦問題"],
]);
