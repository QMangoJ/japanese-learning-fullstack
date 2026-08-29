export type ListeningDisc = "cd1" | "cd2";

export type ListeningN2Page = {
	readonly page: number;
	readonly tracks: readonly number[];
};

export type ListeningN2Question = {
	readonly label: string;
	readonly tracks: readonly number[];
};

export type ListeningN2Section = {
	readonly number: number;
	readonly title: string;
	readonly subtitle: string;
	readonly title_cn: string;
	readonly title_en: string;
	readonly firstTrack: number;
	readonly pages: readonly ListeningN2Page[];
	readonly questions: readonly ListeningN2Question[];
	readonly answerPages: readonly number[];
	readonly translationPages: readonly number[];
};

export type ListeningN2Chapter = {
	readonly number: number;
	readonly title: string;
	readonly title_cn: string;
	readonly title_en: string;
	readonly description: string;
	readonly disc: ListeningDisc;
	readonly sections: readonly ListeningN2Section[];
};

/**
 * Source of truth is the original book scans + official MP3s (no reconstructed transcripts).
 * JPG index in /listening/n2/pages equals the printed footer page number.
 * Unused chapter-title tracks: CD1 1/18/52, CD2 9.
 */
export function listeningN2PageSrc(page: number) {
	return `/listening/n2/pages/${String(page).padStart(3, "0")}.jpg`;
}

export function listeningN2TrackSrc(disc: ListeningDisc, track: number) {
	const prefix = disc === "cd1" ? "CD01" : "CD02";
	return `/audio/n2/${disc}/${prefix}_${String(track).padStart(2, "0")}.mp3`;
}

function section(
	number: number,
	title: string,
	subtitle: string,
	title_cn: string,
	title_en: string,
	pages: readonly ListeningN2Page[],
	questions: readonly ListeningN2Question[],
	answerPages: readonly number[],
	translationPages: readonly number[],
): ListeningN2Section {
	const firstTrack = questions[0]?.tracks[0] ?? pages.flatMap((item) => item.tracks)[0] ?? 1;
	return { number, title, subtitle, title_cn, title_en, firstTrack, pages, questions, answerPages, translationPages };
}

export const listeningN2Chapters: readonly ListeningN2Chapter[] = [
	{
		number: 1,
		title: "準備しよう",
		title_cn: "做好基础准备",
		title_en: "Mastering the Basics",
		description: "从发音、语法到会话表达，完成基础听辨训练。",
		disc: "cd1",
		sections: [
			section(1, "発音に関する聞き取り", "発音と表記", "听清楚发音", "Correctly Understanding Pronunciation", [{ page: 12, tracks: [] }, { page: 13, tracks: [2, 3, 4] }], [{ label: "1番", tracks: [2] }, { label: "2番", tracks: [3] }, { label: "3番", tracks: [4] }], [72], [73]),
			section(2, "文法に関する聞き取り①", "授受・受身・使役", "听清楚语法①", "Grammar ①", [{ page: 14, tracks: [] }, { page: 15, tracks: [5, 6] }], [{ label: "1番", tracks: [5] }, { label: "2番", tracks: [6] }], [74], [75]),
			section(3, "文法に関する聞き取り②", "敬語", "听清楚语法②", "Grammar ②", [{ page: 16, tracks: [] }, { page: 17, tracks: [7, 8] }], [{ label: "1番", tracks: [7] }, { label: "2番", tracks: [8] }], [76], [77]),
			section(4, "会話表現", "会話らしい表現", "会话表达", "Conversational phrases", [{ page: 18, tracks: [] }, { page: 19, tracks: [9, 10, 11] }], [{ label: "1番", tracks: [9] }, { label: "2番", tracks: [10] }, { label: "3番", tracks: [11] }], [78], [79]),
			section(5, "まとめ問題", "総合練習", "综合练习", "Review", [{ page: 20, tracks: [12, 13] }, { page: 21, tracks: [14, 15] }, { page: 22, tracks: [16, 17] }], [{ label: "問題I", tracks: [12] }, { label: "問題II 1番", tracks: [13] }, { label: "問題II 2番", tracks: [14] }, { label: "問題II 3番", tracks: [15] }, { label: "問題II 4番", tracks: [16] }, { label: "問題II 5番", tracks: [17] }], [80, 82, 84], [81, 83, 85]),
		],
	},
	{
		number: 2,
		title: "問題のパターンに慣れよう",
		title_cn: "熟悉题型",
		title_en: "Recognizing the Question Patterns",
		description: "针对 N2 全部听力题型，边练边熟悉作答流程。",
		disc: "cd1",
		sections: [
			section(1, "どんな返事をしますか ―即時応答―", "即時応答", "即时应答", "Immediate response", [{ page: 24, tracks: [19] }, { page: 25, tracks: [20, 21, 22, 23] }], [{ label: "例", tracks: [19] }, { label: "1番", tracks: [20] }, { label: "2番", tracks: [21] }, { label: "3番", tracks: [22] }, { label: "4番", tracks: [23] }], [86], [87]),
			section(2, "これから何をしますか ―問題理解―", "問題理解", "课题理解", "Task comprehension", [{ page: 26, tracks: [24] }, { page: 27, tracks: [25, 26] }], [{ label: "例", tracks: [24] }, { label: "1番", tracks: [25] }, { label: "2番", tracks: [26] }], [88], [89]),
			section(3, "どうしてですか ―重点理解―", "重点理解", "要点理解", "Point comprehension", [{ page: 28, tracks: [27, 28] }, { page: 29, tracks: [29, 30] }], [{ label: "例", tracks: [27, 28] }, { label: "1番", tracks: [29] }, { label: "2番", tracks: [30] }], [90], [91]),
			section(4, "どんな内容ですか ―概要理解―", "概要理解", "概要理解", "Gist comprehension", [{ page: 30, tracks: [31] }, { page: 31, tracks: [32, 33] }], [{ label: "例", tracks: [31] }, { label: "1番", tracks: [32] }, { label: "2番", tracks: [33] }], [92], [93]),
			section(5, "どうすることにしますか ―総合理解①―", "総合理解①", "综合理解①", "Integrated comprehension ①", [{ page: 32, tracks: [34] }, { page: 33, tracks: [35, 36] }], [{ label: "例", tracks: [34] }, { label: "1番", tracks: [35] }, { label: "2番", tracks: [36] }], [94, 96], [95, 97]),
			section(6, "どれにしますか ―総合理解②―", "総合理解②", "综合理解②", "Integrated comprehension ②", [{ page: 34, tracks: [37] }, { page: 35, tracks: [38] }], [{ label: "例", tracks: [37] }, { label: "れんしゅう", tracks: [38] }], [98], [99]),
			section(7, "まとめ問題", "総合練習", "综合练习", "Review", [{ page: 36, tracks: [39, 40, 41, 42, 43, 44, 45] }, { page: 37, tracks: [46, 47, 48, 49] }, { page: 38, tracks: [50, 51] }], [{ label: "問題I 1番", tracks: [39] }, { label: "問題I 2番", tracks: [40] }, { label: "問題I 3番", tracks: [41] }, { label: "問題I 4番", tracks: [42] }, { label: "問題I 5番", tracks: [43] }, { label: "問題II 1番", tracks: [44] }, { label: "問題II 2番", tracks: [45] }, { label: "問題III 1番", tracks: [46] }, { label: "問題III 2番", tracks: [47] }, { label: "問題IV 1番", tracks: [48] }, { label: "問題IV 2番", tracks: [49] }, { label: "問題V 1番", tracks: [50] }, { label: "問題V 2番", tracks: [51] }], [100, 102, 104, 106, 108, 110], [101, 103, 105, 107, 109, 111]),
		],
	},
	{
		number: 3,
		title: "いろいろなタイプの話を聞こう",
		title_cn: "听懂各种类型的会话",
		title_en: "Understanding Different Types of Conversation",
		description: "掌握听懂指示、会话、电话留言和意见感想的要点。",
		disc: "cd1",
		sections: [
			section(1, "指示や説明を聞こう", "指示・説明", "听懂指示和说明", "Following Instructions and Explanations", [{ page: 40, tracks: [] }, { page: 41, tracks: [53, 54, 55] }], [{ label: "1番", tracks: [53] }, { label: "2番", tracks: [54] }, { label: "3番", tracks: [55] }], [112], [113]),
			section(2, "会話を聞こう", "会話", "听会话", "Conversations", [{ page: 42, tracks: [] }, { page: 43, tracks: [56, 57, 58] }], [{ label: "1番", tracks: [56] }, { label: "2番", tracks: [57] }, { label: "3番", tracks: [58] }], [114, 116], [115, 117]),
			section(3, "電話の会話やメッセージを聞こう", "電話・伝言", "听电话会话和留言", "Calls and messages", [{ page: 44, tracks: [] }, { page: 45, tracks: [59, 60, 61] }], [{ label: "1番", tracks: [59] }, { label: "2番", tracks: [60] }, { label: "3番", tracks: [61] }], [118, 120], [119, 121]),
			section(4, "意見や感想を聞こう", "意見・感想", "听意见和感想", "Opinions and impressions", [{ page: 46, tracks: [] }, { page: 47, tracks: [62, 63, 64] }], [{ label: "1番", tracks: [62] }, { label: "2番", tracks: [63] }, { label: "3番", tracks: [64] }], [122, 124], [123, 125]),
		],
	},
	{
		number: 3,
		title: "いろいろなタイプの話を聞こう",
		title_cn: "听懂各种类型的会话",
		title_en: "Understanding Different Types of Conversation",
		description: "掌握听懂指示、会话、电话留言和意见感想的要点。",
		disc: "cd2",
		sections: [
			section(5, "まとめ問題", "総合練習", "综合练习", "Review", [{ page: 48, tracks: [1, 2, 3] }, { page: 49, tracks: [4, 5, 6] }, { page: 50, tracks: [7, 8] }], [{ label: "問題I 1番", tracks: [1] }, { label: "問題I 2番", tracks: [2] }, { label: "問題I 3番", tracks: [3] }, { label: "問題II 1番", tracks: [4] }, { label: "問題II 2番", tracks: [5] }, { label: "問題II 3番", tracks: [6] }, { label: "問題III 1番", tracks: [7] }, { label: "問題III 2番", tracks: [8] }], [126, 128, 130, 132, 134], [127, 129, 131, 133, 135]),
		],
	},
	{
		number: 4,
		title: "いろいろな場所で聞こう",
		title_cn: "习惯各种场景的会话",
		title_en: "Understanding the Language Around You",
		description: "通过街道、气象交通、校园和各种场面训练关键信息。",
		disc: "cd2",
		sections: [
			section(1, "町で", "駅・店内放送", "在街上", "Around town", [{ page: 52, tracks: [] }, { page: 53, tracks: [10, 11, 12] }], [{ label: "1番", tracks: [10] }, { label: "2番", tracks: [11] }, { label: "3番", tracks: [12] }], [136], [137]),
			section(2, "気象情報・交通情報", "情報を聞く", "气象・交通信息", "Weather and traffic", [{ page: 54, tracks: [] }, { page: 55, tracks: [13, 14, 15] }], [{ label: "1番", tracks: [13] }, { label: "2番", tracks: [14] }, { label: "3番", tracks: [15] }], [138], [139]),
			section(3, "キャンパスで", "学校", "在校园", "On campus", [{ page: 56, tracks: [] }, { page: 57, tracks: [16, 17, 18] }], [{ label: "1番", tracks: [16] }, { label: "2番", tracks: [17] }, { label: "3番", tracks: [18] }], [140, 142], [141, 143]),
			section(4, "いろいろな場面で", "場面", "各种场面", "Various situations", [{ page: 58, tracks: [] }, { page: 59, tracks: [19, 20, 21] }], [{ label: "1番", tracks: [19] }, { label: "2番", tracks: [20] }, { label: "3番", tracks: [21] }], [144, 146], [145, 147]),
			section(5, "まとめ問題", "総合練習", "综合练习", "Review", [{ page: 60, tracks: [22, 23, 24] }, { page: 61, tracks: [25, 26, 27] }, { page: 62, tracks: [28, 29] }], [{ label: "問題I 1番", tracks: [22] }, { label: "問題I 2番", tracks: [23] }, { label: "問題I 3番", tracks: [24] }, { label: "問題II 1番", tracks: [25] }, { label: "問題II 2番", tracks: [26] }, { label: "問題II 3番", tracks: [27] }, { label: "問題III 1番", tracks: [28] }, { label: "問題III 2番", tracks: [29] }], [148, 150, 152, 154], [149, 151, 153, 155]),
		],
	},
	{
		number: 5,
		title: "総まとめ問題",
		title_cn: "综合练习",
		title_en: "Comprehensive Review",
		description: "以模拟试题回顾全部题型。",
		disc: "cd2",
		sections: [
			// 答えは p.156〜174 undercounts the last CN page. スクリプト also straddles 問題 I/II (p.158) and starts 問題 V on p.170, not p.172.
			section(1, "問題 I", "質問を聞いて答える", "听提问作答", "Question I", [{ page: 64, tracks: [30, 31] }, { page: 65, tracks: [32, 33] }], [{ label: "1番", tracks: [30] }, { label: "2番", tracks: [31] }, { label: "3番", tracks: [32] }, { label: "4番", tracks: [33] }], [156, 158], [157, 159]),
			section(2, "問題 II", "選択肢を読んで答える", "读选项作答", "Question II", [{ page: 66, tracks: [34, 35, 36] }, { page: 67, tracks: [37, 38] }], [{ label: "1番", tracks: [34] }, { label: "2番", tracks: [35] }, { label: "3番", tracks: [36] }, { label: "4番", tracks: [37] }, { label: "5番", tracks: [38] }], [158, 160, 162], [159, 161, 163]),
			section(3, "問題 III", "内容を聞き取る", "听取内容", "Question III", [{ page: 68, tracks: [39, 40, 41, 42] }], [{ label: "1番", tracks: [39] }, { label: "2番", tracks: [40] }, { label: "3番", tracks: [41] }, { label: "4番", tracks: [42] }], [164, 166], [165, 167]),
			section(4, "問題 IV", "即時応答", "即时应答", "Question IV", [{ page: 69, tracks: [43, 44, 45, 46, 47, 48, 49] }], [{ label: "1番", tracks: [43] }, { label: "2番", tracks: [44] }, { label: "3番", tracks: [45] }, { label: "4番", tracks: [46] }, { label: "5番", tracks: [47] }, { label: "6番", tracks: [48] }, { label: "7番", tracks: [49] }], [168], [169]),
			section(5, "問題 V", "長い話", "长对话", "Question V", [{ page: 70, tracks: [50, 51, 52] }], [{ label: "1番", tracks: [50] }, { label: "2番", tracks: [51] }, { label: "3番", tracks: [52] }], [170, 172, 174], [171, 173, 175]),
		],
	},
];

/** Flatten consecutive same-number chapters (ch.3 is split across CD1/CD2). */
export function listeningN2BookChapters(): readonly ListeningN2Chapter[] {
	const merged: ListeningN2Chapter[] = [];
	for (const chapter of listeningN2Chapters) {
		const last = merged[merged.length - 1];
		if (last && last.number === chapter.number) {
			merged[merged.length - 1] = { ...last, sections: [...last.sections, ...chapter.sections] };
		} else merged.push(chapter);
	}
	return merged;
}

export function findListeningN2Chapter(chapter: number) {
	return listeningN2BookChapters().find((item) => item.number === chapter);
}

export function findListeningN2Section(chapter: number, section: number) {
	return findListeningN2Chapter(chapter)?.sections.find((item) => item.number === section);
}

export function listeningN2SectionDisc(chapter: number, section: number): ListeningDisc {
	const raw = listeningN2Chapters.find((item) => item.number === chapter && item.sections.some((entry) => entry.number === section));
	return raw?.disc ?? "cd1";
}
