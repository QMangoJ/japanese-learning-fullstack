import { useEffect, useState, useSyncExternalStore } from "react";

import { dueToday, getDueVersion, isDueReady, rememberFail, rememberPass, subscribeDue, type DueEntry, type DueKind } from "./due-review";
import { lx, navTo } from "./store";

const KIND_LABEL: Record<DueKind, [string, string]> = {
	grammar: ["语法", "Grammar"],
	mistake: ["错题", "Mistake"],
	listening: ["听解", "Listening"],
};

export function DuePage() {
	const version = useSyncExternalStore(subscribeDue, getDueVersion, () => 0);
	const [pile, setPile] = useState<DueEntry[] | null>(null);
	const [flipped, setFlipped] = useState(false);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		if (!isDueReady() || pile) return;
		const today = dueToday();
		setPile(today);
		setTotal(today.length);
	}, [pile, version]);

	const card = pile?.[0];

	function grade(pass: boolean) {
		if (!card) return;
		if (pass) rememberPass(card.id);
		else rememberFail(card);
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
							<b>{lx("今天的复习做完了", "Today's review is done")}</b>
							<p>{lx("答错的会在明天回来，答对的会隔更久。", "Misses come back tomorrow. Correct answers wait longer.")}</p>
						</>
					) : (
						<>
							<b>{lx("今天没有到期的卡片", "Nothing is due today")}</b>
							<p>
								{lx(
									"在语法记忆卡上点「还没记住」、做题答错，或在听解原文下点「没听清」，就会排进这里。答对之后隔 1 天、3 天、7 天、14 天、30 天再出现。",
									"Mark a grammar card as still learning, miss a question, or tap “didn't catch it” under a listening transcript. Correct answers then wait 1, 3, 7, 14, and 30 days.",
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
	return (
		<div className="fc-wrap">
			<div className="due-kind">{lx(...KIND_LABEL[card.kind])}</div>
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
