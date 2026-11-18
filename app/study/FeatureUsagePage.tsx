import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { Theme } from "@astryxdesign/core/theme";
import { Card } from "@astryxdesign/core/Card";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";

import { lx, THEME } from "./store";
import "./astryx.css";
import {
	featureUsageSnapshot,
	subscribeFeatureUsage,
	syncFeatureUsage,
	type FeatureUsageSnapshot,
} from "./feature-usage";
import { jstDayKey } from "./usage-time";

const SERVER_SNAPSHOT: FeatureUsageSnapshot = { days: {}, signedIn: false, synced: false, persisted: true };

const FEATURE_META: Record<string, { icon: string; cn: string; en: string }> = {
	home: { icon: "🏠", cn: "首页", en: "Home" },
	"vocab-queue": { icon: "📚", cn: "单词队列", en: "Vocab queue" },
	"it-listening": { icon: "💻", cn: "IT 精听", en: "IT listening" },
	"en-listening": { icon: "🎧", cn: "英语听力", en: "English listening" },
	reading: { icon: "📖", cn: "阅读", en: "Reading" },
	listening: { icon: "🎵", cn: "听力课", en: "Listening lessons" },
	grammar: { icon: "📘", cn: "语法", en: "Grammar" },
	vocab: { icon: "📗", cn: "词汇课", en: "Vocab lessons" },
	kanji: { icon: "📙", cn: "汉字词表", en: "Kanji words" },
	cards: { icon: "🗂️", cn: "记忆卡", en: "Flashcards" },
	"kanji-exam": { icon: "🈶", cn: "汉字自测", en: "Kanji self-test" },
	"itl-mistakes": { icon: "📕", cn: "错词本", en: "Mistake words" },
	mistakes: { icon: "📝", cn: "错题本", en: "Mistakes" },
	topics: { icon: "🧩", cn: "专题词汇", en: "Topics" },
	memorize: { icon: "🎯", cn: "背诵清单", en: "Memorize list" },
	review: { icon: "🗓️", cn: "课堂复习", en: "Lesson review" },
	search: { icon: "🔍", cn: "搜索", en: "Search" },
	favs: { icon: "⭐", cn: "收藏", en: "Favorites" },
	keigo: { icon: "🙏", cn: "敬语总结", en: "Keigo summary" },
	reference: { icon: "📐", cn: "通用参考", en: "Reference" },
	lookup: { icon: "🔎", cn: "查词弹窗", en: "Word lookup" },
};

const ACTION_LABEL: Record<string, [string, string]> = {
	open: ["打开", "opens"],
	article: ["打开文章", "articles"],
	play: ["播放", "plays"],
	seek: ["点句定位", "sentence jumps"],
	start: ["开始复习", "sessions"],
	grade: ["评分", "grades"],
	extra: ["加学一批", "extra batches"],
	today: ["今日卡开始", "today-card starts"],
	topic: ["打开专题", "topics"],
	minna: ["打开课文", "lessons"],
	query: ["搜索", "searches"],
	result: ["打开结果", "result opens"],
	lesson: ["打开复习课", "lessons"],
};

function shiftDay(day: string, days: number): string {
	const [year, month, date] = day.split("-").map(Number);
	return new Date(Date.UTC(year, month - 1, date + days)).toISOString().slice(0, 10);
}

type Period = 7 | 30 | 0;

export function FeatureUsagePage() {
	const snap = useSyncExternalStore(subscribeFeatureUsage, featureUsageSnapshot, () => SERVER_SNAPSHOT);
	const [period, setPeriod] = useState<Period>(30);

	useEffect(() => {
		void syncFeatureUsage(true);
	}, []);

	const today = jstDayKey(Date.now());
	const { rows, periodTotal, todayTotal } = useMemo(() => {
		const cutoff = period === 0 ? "" : shiftDay(today, -(period - 1));
		const perFeature = new Map<string, { total: number; actions: Map<string, number> }>();
		let periodSum = 0;
		let todaySum = 0;
		for (const [day, counts] of Object.entries(snap.days)) {
			for (const [key, count] of Object.entries(counts)) {
				if (day === today) todaySum += count;
				if (cutoff && day < cutoff) continue;
				periodSum += count;
				const [feature, action] = key.split(":");
				const entry = perFeature.get(feature) || { total: 0, actions: new Map<string, number>() };
				entry.total += count;
				entry.actions.set(action, (entry.actions.get(action) || 0) + count);
				perFeature.set(feature, entry);
			}
		}
		const list = [...perFeature.entries()]
			.map(([feature, entry]) => ({
				feature,
				total: entry.total,
				actions: [...entry.actions.entries()].sort((a, b) => b[1] - a[1]),
			}))
			.sort((a, b) => b.total - a.total);
		return { rows: list, periodTotal: periodSum, todayTotal: todaySum };
	}, [snap.days, period, today]);

	const max = rows.length ? rows[0].total : 0;
	const status = !snap.persisted
		? lx("这台设备无法把记录存到本地，已改为联网时直接记到账号；离线时请尽量保持页面打开。", "This device can't store records locally, so they are saved to your account while online. Keep the page open when offline.")
		: !snap.signedIn
			? lx("先记在这台设备上。登录后写入账号，换一台设备也能看到汇总。", "Stored on this device until you sign in; then totals merge across devices.")
			: snap.synced
				? lx("已记在账号里，多台设备自动合并。", "Saved to your account and merged across devices.")
				: lx("已登录。网络恢复后会补传到账号。", "Signed in. Records will upload when the network is back.");
	const periods: { key: Period; cn: string; en: string }[] = [
		{ key: 7, cn: "近 7 天", en: "7 days" },
		{ key: 30, cn: "近 30 天", en: "30 days" },
		{ key: 0, cn: "全部", en: "All" },
	];

	return (
		<section className="usage-page">
			<p className="usage-lead">
				{lx(
					"每个功能被打开、播放、评分等关键动作都会记一次数，按天汇总到账号。这里看的是次数排行，不是时长（时长在「使用时间」里）。",
					"Key actions (opens, plays, grades…) are counted once each and summed per day into your account. This page ranks counts; durations live under Study time.",
				)}
			</p>
			<p className="usage-lead">{status}</p>
			<Theme theme={neutralTheme} mode={THEME === "dark" ? "dark" : "light"}>
				<div className="astryx-scope usage-stats">
					<Card padding={3}>
						<VStack gap={1}>
							<Text type="supporting" color="secondary">
								{lx("今天总使用", "Uses today")}
							</Text>
							<Text type="body" size="xl" weight="bold">
								{todayTotal} {lx("次", "")}
							</Text>
						</VStack>
					</Card>
					<Card padding={3}>
						<VStack gap={1}>
							<Text type="supporting" color="secondary">
								{period === 0 ? lx("累计总使用", "Total uses") : lx("这段时间总使用", "Uses in period")}
							</Text>
							<Text type="body" size="xl" weight="bold">
								{periodTotal} {lx("次", "")}
							</Text>
						</VStack>
					</Card>
				</div>
			</Theme>
			<div className="fu-seg" role="group" aria-label={lx("统计周期", "Period")}>
				{periods.map((p) => (
					<button key={p.key} type="button" className={period === p.key ? "on" : ""} aria-pressed={period === p.key} onClick={() => setPeriod(p.key)}>
						{lx(p.cn, p.en)}
					</button>
				))}
			</div>
			{rows.length ? (
				<div className="fu-list">
					{rows.map((row) => {
						const meta = FEATURE_META[row.feature] || { icon: "•", cn: row.feature, en: row.feature };
						return (
							<div className="fu-row" key={row.feature}>
								<div className="fu-row-head">
									<span className="fu-name">
										<span className="fu-ic">{meta.icon}</span>
										{lx(meta.cn, meta.en)}
									</span>
									<b>
										{row.total} {lx("次", "")}
									</b>
								</div>
								<div className="fu-bar">
									<div className="fu-bar-fill" style={{ width: max ? `${Math.max(4, Math.round((row.total / max) * 100))}%` : "0%" }} />
								</div>
								<div className="fu-actions">
									{row.actions.map(([action, count]) => {
										const label = ACTION_LABEL[action];
										return (
											<span className="fu-chip" key={action}>
												{label ? lx(label[0], label[1]) : action} ×{count}
											</span>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<p className="usage-lead">
					{lx("这段时间还没有记录。去用一用各个功能，回来这里就能看到排行了。", "Nothing recorded in this period yet. Use a few features and the ranking will appear here.")}
				</p>
			)}
		</section>
	);
}
