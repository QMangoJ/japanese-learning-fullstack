import { useEffect, useState, useSyncExternalStore } from "react";

import { lx, navTo } from "./store";
import { jstToday } from "./lesson-review";
import {
	ensureVocabWords,
	getVocabQueueVersion,
	subscribeVocabQueue,
	todayPlan,
	vocabQueueData,
	vocabWordsCache,
} from "./vocab-queue";

/**
 * Home-page entry for the unified vocab queue: today's 50 at a glance
 * (due reviews + new words), progress, and a jump into the session.
 * Kept separate from VocabQueuePage so the session page stays lazy.
 */
export function VocabQueueTodayCard() {
	useSyncExternalStore(subscribeVocabQueue, getVocabQueueVersion, () => 0);
	const [, setLoaded] = useState(false);

	useEffect(() => {
		let alive = true;
		void ensureVocabWords().then((words) => {
			if (!alive) return;
			if (words.length) todayPlan(words);
			setLoaded(true);
		});
		return () => {
			alive = false;
		};
	}, []);

	const words = vocabWordsCache();
	const plan = vocabQueueData().plan;
	const today = jstToday();
	if (!words || !plan || plan.date !== today) return null;

	const done = plan.done.length;
	const total = plan.ids.length;
	const remaining = total - done;
	return (
		<section className="vq-today-card">
			<div className="vq-today-main">
				<div className="vq-today-title">📚 {lx("今日背单词", "Today's words")}</div>
				<div className="vq-today-sub">
					{remaining > 0
						? lx(
								`已完成 ${done}/${total} · 到期复习 ${plan.review} + 新词 ${plan.fresh} · 还剩 ${remaining} 个`,
								`${done}/${total} done · ${plan.review} reviews + ${plan.fresh} new · ${remaining} to go`,
							)
						: lx(`今日 ${total} 个已全部完成 🎉`, `All ${total} words done today 🎉`)}
				</div>
				<div className="vq-bar">
					<div className="vq-bar-fill" style={{ width: total ? `${Math.round((done / total) * 100)}%` : "0%" }} />
				</div>
			</div>
			<button type="button" className="vq-today-btn" onClick={() => navTo("#/vocab-queue")}>
				{remaining > 0 ? (done > 0 ? lx("继续", "Continue") : lx("开始", "Start")) : lx("回顾", "Review")}
			</button>
		</section>
	);
}
