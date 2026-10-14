import { useSyncExternalStore } from "react";

import { lx } from "./store";
import { jstDayKey, subscribeUsage, usageSnapshot, type UsageSnapshot } from "./usage-time";

const SERVER_SNAPSHOT: UsageSnapshot = { days: {}, signedIn: false, synced: false, kind: "account" };

function durationLabel(seconds: number): string {
	const total = Math.max(0, Math.floor(seconds));
	const hours = Math.floor(total / 3600);
	const minutes = Math.floor((total % 3600) / 60);
	if (hours && minutes) return lx(`${hours} 小时 ${minutes} 分`, `${hours}h ${minutes}m`);
	if (hours) return lx(`${hours} 小时`, `${hours}h`);
	if (minutes) return lx(`${minutes} 分`, `${minutes}m`);
	return lx(`${total} 秒`, `${total}s`);
}

function dayLabel(day: string): string {
	const [year, month, date] = day.split("-");
	return lx(`${year}年${Number(month)}月${Number(date)}日`, day);
}

export function UsagePage() {
	const snap = useSyncExternalStore(subscribeUsage, usageSnapshot, () => SERVER_SNAPSHOT);
	const today = jstDayKey(Date.now());
	const days = Object.entries(snap.days).sort((a, b) => (a[0] < b[0] ? 1 : -1));
	const total = days.reduce((sum, [, sec]) => sum + sec, 0);
	const status = !snap.signedIn
		? lx("先记在这台设备上。登录后写入账号，换一台设备也能看到。", "Stored on this device until you sign in.")
		: snap.synced
			? lx("已记在账号里，按天永久保存。", "Saved to your account. Days are kept permanently.")
			: lx("已登录。网络恢复后会补传到账号。", "Signed in. Time will upload when the network is back.");
	return (
		<section className="usage-page">
			<p className="usage-lead">
				{lx(
					"页面在前台，并且 3 分钟内有点击、按键或滚动时计时。切到别的窗口或锁屏会暂停。一天最多记 16 小时，按日本时间切天。",
					"Time counts while this tab is visible and you click, type, or scroll within 3 minutes. It pauses when the page is hidden. A day caps at 16 hours and resets at midnight JST.",
				)}
			</p>
			<p className="usage-lead">{status}</p>
			<div className="usage-stats">
				<div className="usage-stat">
					<span>{lx("今天", "Today")}</span>
					<b>{durationLabel(snap.days[today] || 0)}</b>
				</div>
				<div className="usage-stat">
					<span>{lx("累计", "Total")}</span>
					<b>{durationLabel(total)}</b>
				</div>
			</div>
			{days.length ? (
				<div className="usage-days">
					{days.map(([day, sec]) => (
						<div className={day === today ? "usage-day today" : "usage-day"} key={day}>
							<span>{dayLabel(day)}</span>
							<b>{durationLabel(sec)}</b>
						</div>
					))}
				</div>
			) : (
				<p className="usage-lead">{lx("今天还没有记录。留下并操作页面后，这里会按天累加。", "No time yet. Stay on the page and it will start adding up.")}</p>
			)}
		</section>
	);
}
