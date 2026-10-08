/**
 * Answer keys for interactive quizzes, and the note a wrong pick writes into
 * the 错题本. Shared by the quiz pages and the 错题本 translation tests.
 */

export const CIRCLED_NUMS = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟";
export const N3_KANJI_EXAM_KEYS: Record<number, number[]> = {
	1: [2, 1, 2, 4, 3, 4, 1, 2, 2, 4, 3, 1, 4, 2, 3, 4, 2, 3, 4, 1],
	2: [2, 2, 2, 3, 1, 1, 4, 4, 3, 1, 2, 1, 4, 3, 1, 3, 4, 1, 3, 4],
	3: [1, 3, 1, 4, 4, 2, 3, 1, 2, 1, 4, 1, 4, 2, 4, 2, 1, 3, 2, 3],
	4: [3, 3, 4, 1, 3, 2, 4, 4, 3, 1, 4, 2, 3, 3, 1, 1, 3, 1, 2, 3],
};

export function parseCircledAnswers(str?: string) {
	const map: Record<number, number> = {};
	if (!str) return map;
	let i = 0;
	while (i < str.length) {
		const ci = CIRCLED_NUMS.indexOf(str[i]);
		if (ci >= 0) {
			let j = i + 1;
			let num = "";
			while (j < str.length && /[0-9]/.test(str[j])) {
				num += str[j];
				j++;
			}
			if (num) map[ci + 1] = +num;
			i = j;
		} else i++;
	}
	return map;
}
export function parseExamAnswerDetails(str?: string) {
	const map: Record<number, { ans?: number; order?: string; text?: string }> = {};
	if (!str) return map;
	const re = new RegExp("([" + CIRCLED_NUMS + "])([^" + CIRCLED_NUMS + "]*)", "g");
	for (const match of str.matchAll(re)) {
		const n = CIRCLED_NUMS.indexOf(match[1]) + 1;
		const raw = match[2].trim();
		const star = raw.match(/★\s*([1-4])/);
		const direct = raw.match(/^\s*([1-4])(?:\s|$|→)/);
		const ans = star ? +star[1] : direct ? +direct[1] : null;
		if (ans != null) map[n] = { ans, order: star ? raw : "" };
		else if (raw) map[n] = { text: raw };
	}
	return map;
}
export function numericExamAnswers(details: Record<number, { ans?: number }>) {
	const map: Record<number, number> = {};
	for (const [n, a] of Object.entries(details || {})) if (a.ans != null) map[+n] = a.ans;
	return map;
}
export function answerMapFromKeys(keys?: number[]) {
	const map: Record<number, number> = {};
	(keys || []).forEach((answer, i) => {
		map[i + 1] = answer;
	});
	return map;
}

/** The 错题本 note for a wrong pick: question, the learner's answer, the correct answer. */
export function wrongAnswerNote(
	item: { q?: string; opts?: string[] },
	picked: number,
	correct: number | null | undefined,
	lang: string = "cn",
): string {
	const en = lang === "en";
	const pickedText = (item.opts || [])[picked - 1] || "";
	const correctText = correct != null ? (item.opts || [])[correct - 1] || "" : "";
	return `${String(item.q || "").trim()}\n${en ? "Your answer" : "你的答案"}：${String(pickedText).trim()}\n${en ? "Correct answer" : "正确答案"}：${String(correctText).trim()}`;
}

/** The 错题本 note for a wrong pick in the N3 / N2 reading books. */
export function readingWrongNote(
	question: { label: string; jp: string; answer: number; choices: { jp: string }[] },
	picked: number,
): string {
	const pickedText = question.choices[picked - 1]?.jp || String(picked);
	const rightText = question.choices[question.answer - 1]?.jp || String(question.answer);
	return `${question.label} ${question.jp}\n你的答案：${pickedText}\n正确答案：${rightText}`;
}

/**
 * A passage cloze item (問題3) has no question text of its own. Its prompt is
 * the passage sentence that holds the blank【n】(or【n-a】…【n-b】).
 */
export function passageBlankPrompt(passage: string | undefined, n: number | string): string | undefined {
	const text = String(passage || "");
	const marker = new RegExp(`【${n}(?:-[a-zａ-ｚ])?】`);
	const hit = marker.exec(text);
	if (!hit) return undefined;
	const before = text.slice(0, hit.index);
	const start = Math.max(before.lastIndexOf("。"), before.lastIndexOf("！"), before.lastIndexOf("？"), before.lastIndexOf("\n")) + 1;
	const rest = text.slice(hit.index);
	const end = rest.search(/[。！？](?![」』）])|\n/);
	const sentence = text.slice(start, end < 0 ? text.length : hit.index + end + (rest[end] === "\n" ? 0 : 1)).trim();
	return sentence.replace(/^[」』）]+/, "").trim() || undefined;
}
