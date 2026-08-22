import type { ListeningLesson, ListeningLessonBlock } from "./listening-n3-lesson-types";

export type ListeningQuestionSupport = {
	readonly answer?: string;
	readonly transcript?: string;
	readonly transcript_cn?: string;
	readonly transcript_en?: string;
};

const GROUP_NAME = "(?:問題|问题)[ⅠⅡⅢⅣⅤⅥIVX]+";
const NUMBERED_LABEL = /(?:問題|问题)?[ⅠⅡⅢⅣⅤⅥIVX]*\s*[・･]?\s*\d+\s*番/u;
const GROUP_ONLY_LABEL = /^(?:問題|问题)[ⅠⅡⅢⅣⅤⅥIVX]+$/u;

function isQuestionBlock(block: ListeningLessonBlock): block is Extract<ListeningLessonBlock, { type: "q" }> {
	return block.type === "q";
}

function isAnswerableQuestion(block: Extract<ListeningLessonBlock, { type: "q" }>) {
	const label = block.label.normalize("NFKC").trim();
	return NUMBERED_LABEL.test(label) || GROUP_ONLY_LABEL.test(label);
}

function transcriptParts(text?: string): readonly string[] {
	if (!text?.trim()) return [];
	const lines = text.replace(/\r\n?/g, "\n").split("\n");
	const offsets: number[] = [];
	let offset = 0;
	for (const line of lines) {
		offsets.push(offset);
		offset += line.length + 1;
	}

	const starts: number[] = [];
	let pendingGroupStart: number | undefined;
	for (let index = 0; index < lines.length; index += 1) {
		const line = lines[index].trim();
		if (!line) continue;
		const bracketed = line.match(/^【([^】]+)】/u)?.[1]?.normalize("NFKC") || "";
		if (NUMBERED_LABEL.test(bracketed)) {
			starts.push(offsets[index]);
			pendingGroupStart = undefined;
			continue;
		}

		const normalized = line.normalize("NFKC");
		if (new RegExp(`^${GROUP_NAME}$`, "u").test(normalized)) {
			const nextLine = lines.slice(index + 1).find((candidate) => candidate.trim())?.trim().normalize("NFKC") || "";
			if (/^\d+\s*番(?:\s|$)/u.test(nextLine)) pendingGroupStart = offsets[index];
			else starts.push(offsets[index]);
			continue;
		}
		if (new RegExp(`^${GROUP_NAME}\\s*[・･:：]?\\s*\\d+\\s*番(?:\\s|$)`, "u").test(normalized)) {
			starts.push(pendingGroupStart ?? offsets[index]);
			pendingGroupStart = undefined;
			continue;
		}
		if (/^\d+\s*番(?:\s|$)/u.test(normalized)) {
			starts.push(pendingGroupStart ?? offsets[index]);
			pendingGroupStart = undefined;
		}
	}

	const uniqueStarts = [...new Set(starts)].sort((a, b) => a - b);
	return uniqueStarts.map((start, index) => text.slice(start, uniqueStarts[index + 1] ?? text.length).trim()).filter(Boolean);
}

function answerParts(text?: string): readonly string[] {
	if (!text?.trim()) return [];
	const normalized = text.replace(/\r\n?/g, "\n");
	const marker = new RegExp(`${GROUP_NAME}(?:\\s*[・･:：]?\\s*\\d+\\s*番)?|\\d+\\s*番`, "gu");
	const matches = [...normalized.matchAll(marker)];
	const starts: number[] = [];
	for (const [index, match] of matches.entries()) {
		const start = match.index ?? 0;
		const label = match[0].normalize("NFKC").trim();
		if (GROUP_ONLY_LABEL.test(label)) {
			const untilNext = normalized.slice(start + match[0].length, matches[index + 1]?.index ?? normalized.length);
			if (!untilNext.replace(/[\s　／/]+/g, "")) continue;
		}
		starts.push(start);
	}
	return starts.map((start, index) => normalized.slice(start, starts[index + 1] ?? normalized.length).replace(/^[\s　／/]+|[\s　／/]+$/g, "").trim()).filter(Boolean);
}

/**
 * 答え・原文・訳文を、画面に並ぶ正式な設問へ順番どおりに割り当てる。
 * 第2章の導入例題（文章ラベル）と「例」ブロックは採点対象に含めない。
 */
export function listeningQuestionSupport(lesson: ListeningLesson): ReadonlyMap<number, ListeningQuestionSupport> {
	const questionIndexes = lesson.blocks
		.map((block, index) => ({ block, index }))
		.filter((entry): entry is { block: Extract<ListeningLessonBlock, { type: "q" }>; index: number } => isQuestionBlock(entry.block))
		.filter(({ block }) => isAnswerableQuestion(block))
		.map(({ index }) => index);
	const answers = answerParts(lesson.answer);
	const transcripts = transcriptParts(lesson.transcript);
	const translationsCn = transcriptParts(lesson.transcript_cn);
	const translationsEn = transcriptParts(lesson.transcript_en);
	const support = new Map<number, ListeningQuestionSupport>();

	questionIndexes.forEach((blockIndex, index) => {
		support.set(blockIndex, {
			answer: answers[index],
			transcript: transcripts[index],
			transcript_cn: translationsCn[index],
			transcript_en: translationsEn[index],
		});
	});
	return support;
}
