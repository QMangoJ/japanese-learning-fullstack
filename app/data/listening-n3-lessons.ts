import { chapter4AnswerText, chapter5AnswerText } from "./listening-n3-answers-ch45";
import { chapter1Lessons } from "./listening-n3-lessons-ch1";
import { chapter2Lessons } from "./listening-n3-lessons-ch2";
import { chapter3Lessons } from "./listening-n3-lessons-ch3";
import type { ListeningLesson, ListeningLessonBlock } from "./listening-n3-lesson-types";
import { chapter4Sections, chapter5Sections } from "./listening-n3-structured-ch45";
import type { ListeningAnswerText, ListeningStructuredSection, ListeningTextBlock } from "./listening-n3-structured-types";
import { findListeningSection } from "./listening-n3-book";

const slogans: Record<string, { jp: string; en?: string; cn?: string }> = {
	"3-1": { jp: "何度も聞くフレーズをきちんと理解しましょう！", en: "Make an effort to understand phrases you often hear in public places!", cn: "应正确理解多次听到的句子！" },
	"3-2": { jp: "数字や固有名詞を聞き取る練習をしましょう！", en: "Practice catching numbers and proper names!", cn: "练习听清数字和专有名词！" },
	"3-3": { jp: "指示や禁止の表現に注意しましょう！", en: "Pay attention to instructions and prohibitions!", cn: "注意指示和禁止的表达！" },
	"3-4": { jp: "職場の敬語を聞き取れるようにしましょう！", en: "Learn to catch workplace keigo!", cn: "应能听懂职场敬语！" },
	"3-5": { jp: "決まった表現を覚えておきましょう！", en: "Remember the set phrases used in shops and hospitals!", cn: "记住医院和各种店里的固定表达！" },
	"3-6": { jp: "今まで習った場所別の聞き取りを復習しましょう。", cn: "复习到目前为止学过的场所听力。" },
	"4-1": { jp: "人や物の特徴を聞き取りましょう！", en: "Listen for descriptions of people and things!", cn: "听清人物和物品的特征！" },
	"4-2": { jp: "場所・方向・位置の言葉に注意しましょう！", en: "Pay attention to words for place, direction and position!", cn: "注意场所、方向和位置的用语！" },
	"4-3": { jp: "数字を聞き逃さないようにしましょう！", en: "Do not miss the numbers!", cn: "不要听漏数字！" },
	"4-4": { jp: "順序や比較のポイントを押さえましょう！", en: "Catch the points of order and comparison!", cn: "抓住顺序和比较的要点！" },
	"4-5": { jp: "人・物・数・順序を総合して聞きましょう。", cn: "综合听人物、物品、数字和顺序。" },
	"5-1": { jp: "質問をよく聞いてから答えましょう。", cn: "先听清提问再作答。" },
	"5-2": { jp: "選択肢を先に読んでおきましょう。", cn: "先读一遍选项。" },
	"5-3": { jp: "話の内容を最後まで聞きましょう。", cn: "把整段内容听到最后。" },
	"5-4": { jp: "場面に合う発話を選びましょう。", cn: "选择符合场面的发话。" },
	"5-5": { jp: "即時応答に慣れましょう。", cn: "熟悉即时应答。" },
};

function convertBlock(block: ListeningTextBlock): ListeningLessonBlock[] {
	switch (block.kind) {
		case "heading":
			return [{ type: "h", jp: block.text }];
		case "tip":
			return [{ type: "tip", jp: block.text }];
		case "paragraph":
		case "note":
			return [{ type: "p", jp: block.text }];
		case "example":
			return [{ type: "example", lines: block.text.split("\n") }];
		case "list":
		case "options":
			return [{ type: "example", lines: block.items.slice() }];
		case "question":
			return [
				{
					type: "q",
					label: block.title,
					tracks: block.tracks,
					options: block.options,
				},
			];
	}
}

function fromStructured(section: ListeningStructuredSection, answers?: ListeningAnswerText, key?: string): ListeningLesson {
	const meta = key ? slogans[key] : undefined;
	const blocks: ListeningLessonBlock[] = [
		{ type: "hero", no: section.number, title: section.title, cn: section.subtitle },
	];
	if (meta) blocks.push({ type: "slogan", jp: meta.jp, en: meta.en, cn: meta.cn });
	for (const page of section.pages) {
		for (const block of page.blocks) blocks.push(...convertBlock(block));
	}
	return {
		blocks,
		answer: answers?.answer ?? "",
		transcript: answers?.transcript ?? "",
	};
}

const chapter4Lessons = chapter4Sections.map((section, index) => fromStructured(section, chapter4AnswerText[index], `4-${section.number}`));
const chapter5Lessons = chapter5Sections.map((section, index) => fromStructured(section, chapter5AnswerText[index], `5-${section.number}`));

const byChapter: Record<number, readonly ListeningLesson[]> = {
	1: chapter1Lessons,
	2: chapter2Lessons,
	3: chapter3Lessons,
	4: chapter4Lessons,
	5: chapter5Lessons,
};

export function getListeningLesson(chapter: number, section: number): ListeningLesson | undefined {
	const found = findListeningSection(chapter, section);
	const lesson = byChapter[chapter]?.[section - 1];
	if (!lesson || !found) return lesson;
	if (lesson.blocks[0]?.type === "hero") return lesson;
	return lesson;
}
