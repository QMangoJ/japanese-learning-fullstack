import { isManualMistakeType } from "./mistake-translations";

export type MistakeNotifyNote = { id: string; text: string; type: string };

export type MistakeNotifyEnv = {
	MISTAKE_NOTIFY_WEBHOOK_URL?: string;
	MISTAKE_NOTIFY_WEBHOOK_KEY?: string;
};

type MistakeRow = {
	id?: unknown;
	type?: unknown;
	text?: unknown;
	deleted?: unknown;
};

/** New or re-opened manual notes (word/grammar) that need an assistant translation. */
export function manualNotesNeedingNotify(previousRaw: string | null, nextRaw: string): MistakeNotifyNote[] {
	let previous: MistakeRow[] = [];
	let next: MistakeRow[] = [];
	try {
		const parsed: unknown = JSON.parse(previousRaw || "[]");
		if (Array.isArray(parsed)) previous = parsed as MistakeRow[];
	} catch {
		previous = [];
	}
	try {
		const parsed: unknown = JSON.parse(nextRaw);
		if (Array.isArray(parsed)) next = parsed as MistakeRow[];
	} catch {
		return [];
	}

	const prevById = new Map<string, MistakeRow>();
	for (const row of previous) {
		if (typeof row.id === "string") prevById.set(row.id, row);
	}

	const out: MistakeNotifyNote[] = [];
	for (const row of next) {
		if (row.deleted === true) continue;
		if (typeof row.id !== "string" || typeof row.text !== "string" || typeof row.type !== "string") continue;
		if (!isManualMistakeType(row.type)) continue;
		const text = row.text.trim();
		if (!text) continue;
		const old = prevById.get(row.id);
		const isNew = !old;
		const revived = Boolean(old && old.deleted === true);
		const textChanged = Boolean(old && old.deleted !== true && String(old.text || "") !== row.text);
		if (isNew || revived || textChanged) out.push({ id: row.id, text, type: row.type });
	}
	return out;
}

/**
 * Fire-and-forget webhook. No-op when URL unset. Never throws to the caller.
 * Authorization: Bearer <MISTAKE_NOTIFY_WEBHOOK_KEY> when the key secret is set.
 */
export async function notifyManualMistakesAdded(
	env: MistakeNotifyEnv,
	userId: string,
	notes: MistakeNotifyNote[],
): Promise<void> {
	const url = String(env.MISTAKE_NOTIFY_WEBHOOK_URL || "").trim();
	if (!url || !notes.length) return;
	const key = String(env.MISTAKE_NOTIFY_WEBHOOK_KEY || "").trim();
	const headers: Record<string, string> = { "content-type": "application/json; charset=utf-8" };
	if (key) headers.authorization = `Bearer ${key}`;
	try {
		await fetch(url, {
			method: "POST",
			headers,
			body: JSON.stringify({
				event: "mistake.manual_added",
				userId,
				notes,
			}),
		});
	} catch (error) {
		console.warn(`[mistake-notify] ${String((error as Error)?.message || error).slice(0, 200)}`);
	}
}
