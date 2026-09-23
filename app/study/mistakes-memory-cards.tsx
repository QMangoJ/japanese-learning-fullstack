import { MemoryCards, type MemoryCardItem } from "./memory-cards";
import { lx, setMistakeStudy } from "./store";

export const MISTAKE_MASTERY_KEY = "mistake-book-mastery";
export const MISTAKE_DECK_ID = "mistakes";

/** Split a notebook note into front (prompt) and back (answer) sides. */
export function mistakeStudyParts(m: { text?: string }): { jp: string; cn: string } {
	const text = String(m.text || "");
	const correct = text.match(/(?:^|\n)正确答案：\s*([^\n]+)/);
	const cn = correct ? correct[1].trim() : "";
	let jp = text
		.replace(/(?:\n|^)你的答案：[\s\S]*$/, "")
		.replace(/(?:\n|^)正确答案：\s*[^\n]+/g, "")
		.trim();
	if (!jp) jp = text.split("\n")[0] || text;
	return { jp, cn };
}

export function cardsFromMistakes(
	list: { id: string; type?: string; text?: string }[],
): MemoryCardItem[] {
	return list.map((m) => {
		const { jp, cn } = mistakeStudyParts(m);
		return {
			id: m.id,
			jp,
			cn: cn || undefined,
			kind: m.type || "q",
		};
	});
}

export function MistakesMemoryCards({
	list,
}: {
	list: { id: string; type?: string; text?: string }[];
}) {
	const items = cardsFromMistakes(list);
	return (
		<MemoryCards
			deckId={MISTAKE_DECK_ID}
			storageKey={MISTAKE_MASTERY_KEY}
			items={items}
			crumb={
				<div className="crumb">
					<button type="button" className="crumb-home" data-mstudy-back="1" onClick={() => setMistakeStudy(false)}>
						{lx("错题本", "Mistakes")}
					</button>
					<span className="crumb-sep">›</span>
					<span>{lx("背诵", "Recite")}</span>
				</div>
			}
			kindOptions={[
				{ value: "all", label: lx("全部", "All") },
				{ value: "word", label: lx("单词", "Words") },
				{ value: "grammar", label: lx("语法", "Grammar") },
				{ value: "q", label: lx("错题", "Mistakes") },
			]}
			hint={lx("回想读音和意思，点击翻面", "Recall the reading and meaning, then tap to flip")}
			emptyUnknown={lx("这些错题都记住了 🎉", "You've mastered these mistakes 🎉")}
			emptyAll={lx("还没有可刷的错题", "No mistakes to study yet")}
		/>
	);
}
