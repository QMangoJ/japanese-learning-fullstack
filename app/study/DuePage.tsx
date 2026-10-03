import { useEffect, useState, useSyncExternalStore } from "react";

import { markReviewed, selectDailyReview, type ReviewCard } from "./daily-review";
import { addIsoDays, dueEntry, getDueVersion, isDueReady, rememberFail, rememberPass, subscribeDue, type DueKind } from "./due-review";
import { formatReviewMonthDay, jstToday } from "./lesson-review";
import { LANG, lx, navTo } from "./store";

const KIND_LABEL: Record<DueKind, [string, string]> = {
	grammar: ["语法", "Grammar"],
	mistake: ["错题", "Mistake"],
	listening: ["听解", "Listening"],
	topic: ["专题词汇", "Topic vocabulary"],
};

function reasonLabel(card: ReviewCard): [string, string] {
	if (card.reason === "mistake") return ["错题", "Mistake"];
	if (card.reason === "grammar") {
		return card.times > 1
			? [`看过 ${card.times} 次`, `Opened ${card.times} times`]
			: ["看过的语法", "Opened grammar"];
	}
	const kind = KIND_LABEL[card.kind];
	return [`${kind[0]} · 到期`, `${kind[1]} · due`];
}

function sourceLabel(sourceDate: string | null, candidateCount: number, shown: number) {
	const lang = LANG === "en" ? "en" : "cn";
	const portionCn = candidateCount > shown ? `从 ${candidateCount} 项里按权重抽出 ${shown} 项` : "";
	const portionEn = candidateCount > shown ? `${shown} of ${candidateCount}, by weight` : "";
	if (!sourceDate) {
		return lx(portionCn || "这些是到了复习时间的卡片", portionEn || "These cards are due");
	}
	const yesterday = addIsoDays(jstToday(), -1);
	const whenCn = sourceDate === yesterday
		? "昨天看过的语法和做错的题"
		: `${formatReviewMonthDay(sourceDate, lang)}看过的语法和做错的题`;
	const whenEn = sourceDate === yesterday
		? "Yesterday's grammar and mistakes"
		: `Grammar and mistakes from ${formatReviewMonthDay(sourceDate, "en")}`;
	return lx(portionCn ? `${whenCn}，${portionCn}` : whenCn, portionEn ? `${whenEn}. ${portionEn}` : whenEn);
}

export function DuePage() {
	const dueVersion = useSyncExternalStore(subscribeDue, getDueVersion, () => 0);
	const [pile, setPile] = useState<ReviewCard[] | null>(null);
	const [flipped, setFlipped] = useState(false);
	const [total, setTotal] = useState(0);
	const [sourceDate, setSourceDate] = useState<string | null>(null);
	const [candidateCount, setCandidateCount] = useState(0);

	useEffect(() => {
		if (!isDueReady() || pile) return;
		const review = selectDailyReview();
		setPile(review.cards);
		setTotal(review.cards.length);
		setSourceDate(review.sourceDate);
		setCandidateCount(review.candidateCount);
	}, [pile, dueVersion]);

	const card = pile?.[0];

	function grade(pass: boolean) {
		if (!card) return;
		if (pass) {
			const existing = dueEntry(card.id);
			if (existing && !existing.deleted) rememberPass(card.id);
		} else {
			rememberFail({
				id: card.id,
				kind: card.kind,
				jp: card.jp,
				cn: card.cn,
				en: card.en,
				reading: card.reading,
			});
		}
		markReviewed(card.id);
		setPile((list) => (list || []).filter((item) => item.id !== card.id));
		setFlipped(false);
	}

	if (!pile) {
		return <div className="empty">{lx("复习队列加载中…", "Loading today's review…")}</div>;
	}

	if (!card) {
		return (
			<div className="fc-wrap">
				<div className="due-empty">
					{total ? (
						<>
							<b>{lx("今天抽出的复习做完了", "Today's sample is done")}</b>
							<p>{lx("答错的明天优先回来。答对的会隔更久。只是打开过的页面，不会因此每天都出现。", "Misses come back first tomorrow. Correct answers wait longer. A page you only opened does not return every day.")}</p>
						</>
					) : (
						<>
							<b>{lx("今天没有要复习的内容", "Nothing to review today")}</b>
							<p>
								{lx(
									"打开语法课后，第二天会从看过的句型里抽一部分。做错的题权重更高，打开次数越多也越容易被抽到。已经到期的卡片会在空出来的位置里一起复习。",
									"Open a grammar lesson, and the next day a sample of those patterns is ready. Mistakes weigh more, and pages you open more often are more likely to be picked. Cards already due fill any space left.",
								)}
							</p>
						</>
					)}
					<button type="button" onClick={() => navTo("#/")}>
						{lx("回目录", "Back to the catalog")}
					</button>
				</div>
			</div>
		);
	}

	const long = card.jp.length > 80;
	const done = total - pile.length;
	const why = reasonLabel(card);
	return (
		<div className="fc-wrap">
			<p className="due-source">{sourceLabel(sourceDate, candidateCount, total)}</p>
			<div className="due-kind">{lx(...KIND_LABEL[card.kind])}</div>
			<div className="due-why">{lx(...why)}</div>
			<div className="fc-prog">{total ? `${done + 1} / ${total}` : ""}</div>
			<div className={`fcard${long ? " due-long" : ""}`} onClick={() => setFlipped((on) => !on)}>
				{flipped ? (
					<div className="backside">
						<div className="jp" style={{ fontWeight: 700, fontSize: long ? "16px" : "20px", whiteSpace: "pre-wrap" }}>
							{card.jp}
						</div>
						{card.reading ? <div className="reading jp meta">{card.reading}</div> : null}
						{card.cn ? <div className="usage" style={{ whiteSpace: "pre-wrap" }}>{card.cn}</div> : null}
						{card.en ? <div className="meta" style={{ whiteSpace: "pre-wrap" }}>{card.en}</div> : null}
					</div>
				) : (
					<>
						<div className="big jp">{card.jp}</div>
						<div className="hint">{lx("先回忆意思，点击翻面", "Recall the meaning, then tap to flip")}</div>
					</>
				)}
			</div>
			<div className="review-skill">
				<button type="button" onClick={() => grade(false)}>
					{lx("还没记住", "Still learning")}
				</button>
				<button type="button" onClick={() => grade(true)}>
					{lx("已经记住", "Got it")}
				</button>
			</div>
		</div>
	);
}
