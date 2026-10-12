import { addIsoDays } from "./due-review";
import { jstToday } from "./lesson-review";

export const ACTIVITY_DAYS = 60;

export type MameMood = "sleepy" | "blink" | "jump";

/** Oldest day first, ending on `today`. `today` is already a JST calendar day. */
export function dayRange(today: string, count: number): string[] {
	const days: string[] = [];
	for (let ago = count - 1; ago >= 0; ago -= 1) days.push(addIsoDays(today, -ago));
	return days;
}

/** Count real timestamps on each day. `0` and non-finite values are not study events. */
export function countsForDays(stamps: readonly number[], days: readonly string[]): number[] {
	const counts = days.map(() => 0);
	const index = new Map(days.map((day, i) => [day, i]));
	for (const ts of stamps) {
		if (!Number.isFinite(ts) || ts <= 0) continue;
		const at = index.get(jstToday(ts));
		if (at != null) counts[at] += 1;
	}
	return counts;
}

export function streakEndingToday(counts: readonly number[]): number {
	let streak = 0;
	for (let i = counts.length - 1; i >= 0; i -= 1) {
		if (counts[i] <= 0) break;
		streak += 1;
	}
	return streak;
}

export function mameMood(counts: readonly number[]): MameMood {
	const today = counts[counts.length - 1] ?? 0;
	if (today <= 0) return "sleepy";
	if (streakEndingToday(counts) >= 2) return "jump";
	return "blink";
}
