import { kanjiExamTargetIndex, type KanjiExamQuestion } from "../data/kanji-exam";

/** The prompt with its target highlighted — at `targetIndex` when the target repeats. */
export function MarkedPrompt({ question }: { question: Pick<KanjiExamQuestion, "prompt" | "target" | "targetIndex"> }) {
	const index = kanjiExamTargetIndex(question);
	if (index < 0) return <>{question.prompt}</>;
	return (
		<>
			{question.prompt.slice(0, index)}
			<mark>{question.target}</mark>
			{question.prompt.slice(index + question.target.length)}
		</>
	);
}
