import { chapter1Lessons } from "./listening-n3-lessons-ch1";
import { chapter2Lessons } from "./listening-n3-lessons-ch2";
import { chapter3Lessons } from "./listening-n3-lessons-ch3";
import { chapter4Lessons } from "./listening-n3-lessons-ch4";
import { chapter5Lessons } from "./listening-n3-lessons-ch5";
import type { ListeningLesson, ListeningLessonBlock } from "./listening-n3-lesson-types";
import { findListeningSection } from "./listening-n3-book";
import { listeningTranscriptCn } from "./listening-n3-transcripts-cn";
import { listeningTranscriptCnCh45 } from "./listening-n3-transcripts-cn-ch45";
import { listeningTranscriptEn } from "./listening-n3-transcripts-en";
import { chapter1AnswerText } from "./listening-n3-answers-ch1";
import { chapter2AnswerText } from "./listening-n3-answers-ch2";
import { chapter3AnswerText } from "./listening-n3-answers-ch3";
import { chapter4AnswerText, chapter5AnswerText } from "./listening-n3-answers-ch45";
import { chapter2Sections } from "./listening-n3-structured-ch2";
import { chapter3Sections } from "./listening-n3-structured-ch3";
import { chapter4Sections, chapter5Sections } from "./listening-n3-structured-ch45";
import type { ListeningStructuredSection, ListeningTextBlock } from "./listening-n3-structured-types";

const byChapter: Record<number, readonly ListeningLesson[]> = {
	1: chapter1Lessons,
	2: chapter2Lessons,
	3: chapter3Lessons,
	4: chapter4Lessons,
	5: chapter5Lessons,
};

const answerTextByChapter = {
	1: chapter1AnswerText,
	2: chapter2AnswerText,
	3: chapter3AnswerText,
	4: chapter4AnswerText,
	5: chapter5AnswerText,
} as const;

const structuredByChapter: Record<number, readonly ListeningStructuredSection[]> = {
	2: chapter2Sections,
	3: chapter3Sections,
	4: chapter4Sections,
	5: chapter5Sections,
};

function sameTracks(a?: readonly number[], b?: readonly number[]) {
	return !!a?.length && !!b?.length && a.length === b.length && a.every((track, index) => track === b[index]);
}

function structuredBlockToLessonBlock(
	block: ListeningTextBlock,
	currentQuestions: readonly Extract<ListeningLessonBlock, { type: "q" }>[],
): ListeningLessonBlock {
	switch (block.kind) {
		case "heading":
			return { type: "h", jp: block.text };
		case "tip":
			return { type: "tip", jp: block.text };
		case "paragraph":
			return { type: "p", jp: block.text };
		case "note":
			return { type: "note", text: block.text };
		case "example":
			return { type: "example", lines: block.text.split("\n") };
		case "list":
		case "options":
			return { type: "example", lines: block.items };
		case "question": {
			const current = currentQuestions.find((question) => sameTracks(question.tracks, block.tracks));
			const structuredOptionsAreLabels = block.options?.every((option) => /^[①②③④⑤⑥⑦⑧⑨⑩]$/.test(option.trim()));
			return {
				type: "q",
				label: block.title,
				tracks: block.tracks,
				prompt: current?.prompt,
				options: structuredOptionsAreLabels && current?.options?.length ? current.options : block.options,
				figure: current?.figure,
				figureAlt: current?.figureAlt,
				note: current?.note || (current?.figure ? current.figureAlt : undefined),
			};
		}
	}
}

/**
 * 第2〜5章は、各ページを校正済みの構造化本文から組み立てる。
 * 旧データに残っていた要約・訳文だけの段落で、本文後半が欠けることを防ぐ。
 */
function completeBlocks(lesson: ListeningLesson, section?: ListeningStructuredSection): readonly ListeningLessonBlock[] {
	if (!section) return lesson.blocks;
	const hero = lesson.blocks.find((block) => block.type === "hero");
	const slogan = lesson.blocks.find((block) => block.type === "slogan");
	const figures = lesson.blocks.filter((block) => block.type === "figure");
	const questions = lesson.blocks.filter((block): block is Extract<ListeningLessonBlock, { type: "q" }> => block.type === "q");
	const normalize = (text: string) => text.normalize("NFKC").replace(/[\s　]+/g, "").replace(/[―—-]/g, "");
	const used = new Set<ListeningLessonBlock>([...(hero ? [hero] : []), ...(slogan ? [slogan] : []), ...figures]);
	const lessonText = (block: ListeningLessonBlock) => {
		switch (block.type) {
			case "hero":
				return block.title;
			case "slogan":
			case "h":
			case "p":
			case "tip":
				return block.jp;
			case "note":
				return block.text;
			case "example":
				return block.lines.join("\n");
			case "steps":
				return [block.label, ...block.items].join("\n");
			case "table":
				return [block.title || "", ...block.rows.flat()].join("\n");
			case "kv":
				return [block.title || "", ...block.rows.flatMap((row) => [row.k, row.v, row.extra || ""])].join("\n");
			case "box":
				return [
					block.title || "",
					...block.items.flatMap((item) => [item.title, ...item.lines, item.note || ""]),
				].join("\n");
			case "aside":
				return `${block.title}\n${block.text}`;
			default:
				return "";
		}
	};
	const structuredText = (block: ListeningTextBlock) => {
		switch (block.kind) {
			case "heading":
			case "tip":
			case "paragraph":
			case "note":
			case "example":
				return block.text;
			case "list":
			case "options":
				return block.items.join("\n");
			case "question":
				return "";
		}
	};
	const body = section.pages.flatMap((page) =>
		page.blocks.flatMap((block) => {
			if ((block.kind === "heading" && hero && normalize(block.text).includes(normalize(hero.title))) ||
				(block.kind === "tip" && slogan && normalize(block.text) === normalize(slogan.jp))) {
				return [];
			}
			if (block.kind === "question") {
				const match = questions.find((question) => sameTracks(question.tracks, block.tracks));
				if (match) used.add(match);
				return [structuredBlockToLessonBlock(block, questions)];
			}
			const text = normalize(structuredText(block));
			const parts = structuredText(block)
				.split("\n")
				.map(normalize)
				.filter(Boolean);
			const match = lesson.blocks.find((candidate) => {
				if (used.has(candidate) || !text) return false;
				const candidateText = normalize(lessonText(candidate));
				return candidateText === text || candidateText.includes(text) || (parts.length > 1 && parts.every((part) => candidateText.includes(part)));
			});
			if (match) {
				used.add(match);
				return [match];
			}
			return [structuredBlockToLessonBlock(block, questions)];
		}),
	);
	const supplements = lesson.blocks.filter((block) => !used.has(block));
	return [...(hero ? [hero] : []), ...(slogan ? [slogan] : []), ...figures, ...body, ...supplements];
}

export function getListeningLesson(chapter: number, section: number): ListeningLesson | undefined {
	const found = findListeningSection(chapter, section);
	const lesson = byChapter[chapter]?.[section - 1];
	if (!lesson || !found) return lesson;
	const key = `${chapter}-${section}`;
	const answerText = answerTextByChapter[chapter as keyof typeof answerTextByChapter]?.[section - 1];
	const structured = structuredByChapter[chapter]?.[section - 1];
	const transcript_en = lesson.transcript_en || listeningTranscriptEn[key];
	const transcript_cn = listeningTranscriptCn[key] || listeningTranscriptCnCh45[key] || lesson.transcript_cn;
	return {
		...lesson,
		blocks: completeBlocks(lesson, structured),
		answer: answerText?.answer || lesson.answer,
		transcript: answerText?.transcript || lesson.transcript,
		transcript_en,
		transcript_cn,
	};
}
