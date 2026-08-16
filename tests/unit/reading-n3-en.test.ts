import { describe, expect, it } from "vitest";

import { readingDays, type Block, type ReadingDay } from "../../app/data/reading-n3";

function at(day: ReadingDay, extra: string) {
	return `reading w${day.week}d${day.day}: ${extra}`;
}

function blockSlots(block: Block, path: string): string[] {
	const missing: string[] = [];
	const need = (label: string, cn?: string, en?: string) => {
		if (cn && !en?.trim()) missing.push(`${path}.${label}`);
	};
	switch (block.type) {
		case "title":
		case "heading":
		case "paragraph":
		case "line":
		case "note":
		case "source":
			need("en", block.cn, block.en);
			if (block.type === "title" && block.sub) need("sub.en", block.sub.cn, block.sub.en);
			break;
		case "speech":
			need("en", block.cn, block.en);
			need("speakerEn", block.speakerCn, block.speakerEn);
			break;
		case "list":
			block.items.forEach((item, index) => need(`items[${index}].en`, item.cn, item.en));
			break;
		case "table":
			if (block.caption) need("caption.en", block.caption.cn, block.caption.en);
			block.rows.forEach((row, rowIndex) => {
				row.forEach((cell, cellIndex) => need(`rows[${rowIndex}][${cellIndex}].en`, cell.cn, cell.en));
			});
			break;
		case "figure":
			need("en", block.cn, block.en);
			break;
	}
	return missing;
}

function dayGaps(day: ReadingDay): string[] {
	const missing: string[] = [];
	if (!day.labelEn?.trim()) missing.push("labelEn");
	if (day.point) {
		if (!day.point.titleEn?.trim()) missing.push("point.titleEn");
		day.point.tips.forEach((tip, index) => {
			if (tip.cn && !tip.en?.trim()) missing.push(`point.tips[${index}].en`);
		});
		day.point.expressions.forEach((item, index) => {
			if (item.cn && !item.en?.trim()) missing.push(`point.expressions[${index}].en`);
		});
		day.point.notes?.forEach((note, index) => {
			if (note.cn && !note.en?.trim()) missing.push(`point.notes[${index}].en`);
		});
		if (day.point.figure?.cn && !day.point.figure.en?.trim()) missing.push("point.figure.en");
	}
	const walkSection = (name: string, section?: { instructionCn?: string; instructionEn?: string; blocks?: Block[]; footnotes?: { cn?: string; en?: string }[]; pageNotes?: { cn?: string; en?: string }[]; questions?: { cn?: string; en?: string; explanation?: string; explanationEn?: string; choices?: { cn?: string; en?: string }[]; choiceNotes?: string[]; choiceNotesEn?: string[] }[] }) => {
		if (!section) return;
		if (section.instructionCn && !section.instructionEn?.trim()) missing.push(`${name}.instructionEn`);
		section.blocks?.forEach((block, index) => missing.push(...blockSlots(block, `${name}.blocks[${index}]`)));
		section.footnotes?.forEach((note, index) => {
			if (note.cn && !note.en?.trim()) missing.push(`${name}.footnotes[${index}].en`);
		});
		section.pageNotes?.forEach((note, index) => {
			if (note.cn && !note.en?.trim()) missing.push(`${name}.pageNotes[${index}].en`);
		});
		section.questions?.forEach((question, index) => {
			if (question.cn && !question.en?.trim()) missing.push(`${name}.questions[${index}].en`);
			if (question.explanation && !question.explanationEn?.trim()) missing.push(`${name}.questions[${index}].explanationEn`);
			question.choices?.forEach((choice, choiceIndex) => {
				if (choice.cn && !choice.en?.trim()) missing.push(`${name}.questions[${index}].choices[${choiceIndex}].en`);
			});
			if (question.choiceNotes?.length && !question.choiceNotesEn?.length) {
				missing.push(`${name}.questions[${index}].choiceNotesEn`);
			}
		});
	};
	walkSection("renshu", day.renshu);
	walkSection("mondai", day.mondai);
	day.practice?.groups.forEach((group, index) => walkSection(`practice.groups[${index}]`, group));
	day.vocab.forEach((word, index) => {
		if (word.cn && !word.en?.trim()) missing.push(`vocab[${index}].en`);
	});
	day.grammar.forEach((item, index) => {
		if (item.meaning && !item.meaningEn?.trim()) missing.push(`grammar[${index}].meaningEn`);
		if (item.note && !item.noteEn?.trim()) missing.push(`grammar[${index}].noteEn`);
		if (item.example?.cn && !item.example.en?.trim()) missing.push(`grammar[${index}].example.en`);
	});
	return missing;
}

describe("reading-n3 English coverage", () => {
	it("covers all 42 days", () => {
		expect(readingDays).toHaveLength(42);
	});

	it("fills English on every day the renderer can switch to LANG=en", () => {
		const report = readingDays.map((day) => ({ day, gaps: dayGaps(day) }));
		const unfinished = report.filter((row) => row.gaps.length);
		const sample = unfinished
			.slice(0, 8)
			.map((row) => `${at(row.day, row.gaps.slice(0, 6).join(", "))}${row.gaps.length > 6 ? ` (+${row.gaps.length - 6})` : ""}`)
			.join("\n");
		expect(unfinished, `missing English on ${unfinished.length} days:\n${sample}`).toHaveLength(0);
	});
});
