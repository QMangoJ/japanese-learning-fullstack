export type ListeningDisc = "cd1" | "cd2";

export type ListeningBookPage = {
	readonly page: number;
	readonly tracks: readonly number[];
};

export type ListeningBookSection = {
	readonly number: number;
	readonly title: string;
	readonly subtitle: string;
	readonly title_cn: string;
	readonly title_en: string;
	readonly firstTrack: number;
	readonly pages: readonly ListeningBookPage[];
	readonly answerPages: readonly number[];
	readonly translationPages: readonly number[];
};

export type ListeningBookChapter = {
	readonly number: number;
	readonly title: string;
	readonly title_cn: string;
	readonly title_en: string;
	readonly description: string;
	readonly disc: ListeningDisc;
	readonly sections: readonly ListeningBookSection[];
};

/** JPG index in /listening/n3/pages. Printed footer = file page − 3. */
export function printedPage(filePage: number) {
	return filePage - 3;
}

export function listeningPageSrc(filePage: number) {
	return `/listening/n3/pages/${String(filePage).padStart(3, "0")}.jpg`;
}

export const listeningBookChapters: readonly ListeningBookChapter[] = [
	{
		number: 1,
		title: "準備をしましょう",
		title_cn: "准备训练",
		title_en: "Get ready",
		description: "从发音、语法到会话表达，完成基础听辨训练。",
		disc: "cd1",
		sections: [
			{
				number: 1,
				title: "発音について",
				subtitle: "発音と表記",
				title_cn: "发音与表记",
				title_en: "Pronunciation",
				firstTrack: 2,
				pages: [
					{ page: 15, tracks: [] },
					{ page: 16, tracks: [2, 3, 4] },
				],
				answerPages: [77],
				translationPages: [78],
			},
			{
				number: 2,
				title: "文法について①",
				subtitle: "授受・受身・使役",
				title_cn: "授受・被动・使役",
				title_en: "Giving, passive, causative",
				firstTrack: 5,
				pages: [
					{ page: 17, tracks: [] },
					{ page: 18, tracks: [5, 6] },
				],
				answerPages: [79],
				translationPages: [80],
			},
			{
				number: 3,
				title: "文法について②",
				subtitle: "敬語",
				title_cn: "敬语",
				title_en: "Honorifics",
				firstTrack: 7,
				pages: [
					{ page: 19, tracks: [] },
					{ page: 20, tracks: [7, 8] },
				],
				answerPages: [81],
				translationPages: [82],
			},
			{
				number: 4,
				title: "会話表現",
				subtitle: "会話らしい表現",
				title_cn: "会话表达",
				title_en: "Conversational phrases",
				firstTrack: 9,
				pages: [
					{ page: 21, tracks: [] },
					{ page: 22, tracks: [9, 10, 11] },
				],
				answerPages: [83],
				translationPages: [84],
			},
			{
				number: 5,
				title: "まとめ問題",
				subtitle: "総合練習",
				title_cn: "综合练习",
				title_en: "Review",
				firstTrack: 12,
				pages: [
					{ page: 23, tracks: [12, 13] },
					{ page: 24, tracks: [14, 15] },
					{ page: 25, tracks: [16, 17] },
				],
				answerPages: [85, 87],
				translationPages: [86, 88],
			},
		],
	},
	{
		number: 2,
		title: "問題のパターンに慣れましょう",
		title_cn: "熟悉题目模式",
		title_en: "Question patterns",
		description: "掌握提问方式、选项出现时机与不同题型的作答流程。",
		disc: "cd1",
		sections: [
			{
				number: 1,
				title: "何と言いますか ―発話表現―",
				subtitle: "発話表現",
				title_cn: "发话表达",
				title_en: "What do you say",
				firstTrack: 19,
				pages: [
					{ page: 27, tracks: [19] },
					{ page: 28, tracks: [20, 21] },
				],
				answerPages: [89],
				translationPages: [90],
			},
			{
				number: 2,
				title: "どんな返事をしますか ―即時応答―",
				subtitle: "即時応答",
				title_cn: "即时应答",
				title_en: "Immediate response",
				firstTrack: 22,
				pages: [
					{ page: 29, tracks: [22] },
					{ page: 30, tracks: [23, 24, 25, 26] },
				],
				answerPages: [89],
				translationPages: [90],
			},
			{
				number: 3,
				title: "何をしますか ―課題理解―",
				subtitle: "課題理解",
				title_cn: "课题理解",
				title_en: "Task comprehension",
				firstTrack: 27,
				pages: [
					{ page: 31, tracks: [27] },
					{ page: 32, tracks: [28, 29] },
				],
				answerPages: [91],
				translationPages: [92],
			},
			{
				number: 4,
				title: "どうしてですか ―ポイント理解―",
				subtitle: "ポイント理解",
				title_cn: "要点理解",
				title_en: "Point comprehension",
				firstTrack: 30,
				pages: [
					{ page: 33, tracks: [30, 31] },
					{ page: 34, tracks: [32, 33] },
				],
				answerPages: [93],
				translationPages: [94],
			},
			{
				number: 5,
				title: "どんな内容ですか ―概要理解―",
				subtitle: "概要理解",
				title_cn: "概要理解",
				title_en: "Gist comprehension",
				firstTrack: 34,
				pages: [
					{ page: 35, tracks: [34] },
					{ page: 36, tracks: [35, 36] },
				],
				answerPages: [95],
				translationPages: [96],
			},
			{
				number: 6,
				title: "まとめ問題",
				subtitle: "総合練習",
				title_cn: "综合练习",
				title_en: "Review",
				firstTrack: 37,
				pages: [
					{ page: 37, tracks: [37, 38, 39, 40, 41] },
					{ page: 38, tracks: [42, 43, 44] },
					{ page: 39, tracks: [45, 46, 47, 48] },
				],
				answerPages: [97, 99, 101, 103],
				translationPages: [98, 100, 102, 104],
			},
		],
	},
	{
		number: 3,
		title: "いろいろな場所で聞きましょう",
		title_cn: "在各种场所听",
		title_en: "Listen in different places",
		description: "通过街道、学校、职场等真实场景训练关键信息的捕捉。",
		disc: "cd1",
		sections: [
			{
				number: 1,
				title: "町で",
				subtitle: "駅・店内放送",
				title_cn: "车站・店内广播",
				title_en: "Around town",
				firstTrack: 50,
				pages: [
					{ page: 41, tracks: [] },
					{ page: 42, tracks: [50, 51, 52] },
				],
				answerPages: [105],
				translationPages: [106],
			},
			{
				number: 2,
				title: "天気予報・交通情報",
				subtitle: "情報を聞く",
				title_cn: "听取信息",
				title_en: "Weather and traffic",
				firstTrack: 53,
				pages: [
					{ page: 43, tracks: [] },
					{ page: 44, tracks: [53, 54, 55] },
				],
				answerPages: [107],
				translationPages: [108],
			},
			{
				number: 3,
				title: "学校で",
				subtitle: "指示・禁止",
				title_cn: "指示・禁止",
				title_en: "At school",
				firstTrack: 56,
				pages: [
					{ page: 45, tracks: [] },
					{ page: 46, tracks: [56, 57, 58] },
				],
				answerPages: [109],
				translationPages: [110],
			},
			{
				number: 4,
				title: "職場で",
				subtitle: "敬語表現",
				title_cn: "敬语表达",
				title_en: "At work",
				firstTrack: 59,
				pages: [
					{ page: 47, tracks: [] },
					{ page: 48, tracks: [59, 60, 61] },
				],
				answerPages: [111],
				translationPages: [112],
			},
			{
				number: 5,
				title: "病院・いろいろな店で",
				subtitle: "決まった表現",
				title_cn: "固定表达",
				title_en: "Hospital and shops",
				firstTrack: 62,
				pages: [
					{ page: 49, tracks: [] },
					{ page: 50, tracks: [62, 63, 64] },
				],
				answerPages: [113, 115],
				translationPages: [114, 116],
			},
			{
				number: 6,
				title: "まとめ問題",
				subtitle: "総合練習",
				title_cn: "综合练习",
				title_en: "Review",
				firstTrack: 65,
				pages: [
					{ page: 51, tracks: [65, 66, 67] },
					{ page: 52, tracks: [68, 69, 70] },
					{ page: 53, tracks: [71, 72] },
				],
				answerPages: [117, 119, 121],
				translationPages: [118, 120, 122],
			},
		],
	},
	{
		number: 4,
		title: "いろいろな内容を聞きましょう",
		title_cn: "听各种内容",
		title_en: "Listen to different topics",
		description: "围绕人物、物品、数字与内容主旨进行综合理解。",
		disc: "cd2",
		sections: [
			{
				number: 1,
				title: "人や物のようす",
				subtitle: "人物・物の描写",
				title_cn: "人物・物品描写",
				title_en: "People and things",
				firstTrack: 2,
				pages: [
					{ page: 55, tracks: [] },
					{ page: 56, tracks: [2, 3, 4] },
				],
				answerPages: [123],
				translationPages: [124],
			},
			{
				number: 2,
				title: "場所・方向・位置",
				subtitle: "位置関係",
				title_cn: "位置关系",
				title_en: "Place and direction",
				firstTrack: 5,
				pages: [
					{ page: 57, tracks: [] },
					{ page: 58, tracks: [5, 6, 7] },
				],
				answerPages: [125],
				translationPages: [126],
			},
			{
				number: 3,
				title: "数・数字・計算",
				subtitle: "数値情報",
				title_cn: "数值信息",
				title_en: "Numbers",
				firstTrack: 8,
				pages: [
					{ page: 59, tracks: [] },
					{ page: 60, tracks: [8, 9, 10] },
				],
				answerPages: [127],
				translationPages: [128],
			},
			{
				number: 4,
				title: "順序・比較",
				subtitle: "手順と比較",
				title_cn: "顺序与比较",
				title_en: "Order and comparison",
				firstTrack: 11,
				pages: [
					{ page: 61, tracks: [] },
					{ page: 62, tracks: [11, 12, 13] },
				],
				answerPages: [129],
				translationPages: [130],
			},
			{
				number: 5,
				title: "まとめ問題",
				subtitle: "総合練習",
				title_cn: "综合练习",
				title_en: "Review",
				firstTrack: 14,
				pages: [
					{ page: 63, tracks: [14, 15, 16] },
					{ page: 64, tracks: [17, 18, 19] },
					{ page: 65, tracks: [20, 21] },
				],
				answerPages: [131, 133, 135],
				translationPages: [132, 134, 136],
			},
		],
	},
	{
		number: 5,
		title: "総まとめ問題",
		title_cn: "综合练习",
		title_en: "Final review",
		description: "以综合题回顾全部题型与解题顺序。",
		disc: "cd2",
		sections: [
			{
				number: 1,
				title: "問題 I",
				subtitle: "質問を聞いて答える",
				title_cn: "听提问作答",
				title_en: "Question I",
				firstTrack: 22,
				pages: [
					{ page: 67, tracks: [22] },
					{ page: 68, tracks: [23, 24, 25] },
					{ page: 69, tracks: [26, 27] },
				],
				answerPages: [137, 139],
				translationPages: [138, 140],
			},
			{
				number: 2,
				title: "問題 II",
				subtitle: "選択肢を読んで答える",
				title_cn: "读选项作答",
				title_en: "Question II",
				firstTrack: 28,
				pages: [
					{ page: 70, tracks: [28, 29, 30] },
					{ page: 71, tracks: [31, 32] },
				],
				answerPages: [141, 143],
				translationPages: [142, 144],
			},
			{
				number: 3,
				title: "問題 III",
				subtitle: "内容を聞き取る",
				title_cn: "听取内容",
				title_en: "Question III",
				firstTrack: 33,
				pages: [{ page: 72, tracks: [33, 34, 35] }],
				answerPages: [145, 147],
				translationPages: [146, 148],
			},
			{
				number: 4,
				title: "問題 IV",
				subtitle: "場面に合う発話",
				title_cn: "场面发话",
				title_en: "Question IV",
				firstTrack: 36,
				pages: [{ page: 73, tracks: [36, 37, 38] }],
				answerPages: [147],
				translationPages: [148],
			},
			{
				number: 5,
				title: "問題 V",
				subtitle: "即時応答",
				title_cn: "即时应答",
				title_en: "Question V",
				firstTrack: 39,
				pages: [{ page: 74, tracks: [39, 40, 41, 42, 43, 44, 45] }],
				answerPages: [149],
				translationPages: [150],
			},
		],
	},
];

export function findListeningChapter(chapter: number) {
	return listeningBookChapters.find((item) => item.number === chapter);
}

export function findListeningSection(chapter: number, section: number) {
	const found = findListeningChapter(chapter);
	return found?.sections.find((item) => item.number === section);
}
