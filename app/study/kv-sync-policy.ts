/**
 * Cloud-sync budget for the KV-backed endpoints (usage, mastery, favorites, mistakes, due review).
 * Workers Free allows 1,000 KV writes per day, so progress is saved locally during a session and pushed to the
 * server at most once per page open. A failed attempt (429/5xx/network) is not retried in that page, and the
 * next attempt waits at least an hour even if the page is reopened sooner. Local data is never cleared.
 */
export const SYNC_FAILURE_COOLDOWN_MS = 60 * 60_000;

const FAILURE_PREFIX = "kv-sync-failed:";
const memoryFailures = new Map<string, number>();

function storedFailure(endpoint: string): number {
	if (typeof localStorage === "undefined") return 0;
	try {
		const value = Number(localStorage.getItem(FAILURE_PREFIX + endpoint) || 0);
		return Number.isFinite(value) ? value : 0;
	} catch {
		return 0;
	}
}

function lastFailure(endpoint: string): number {
	return Math.max(memoryFailures.get(endpoint) || 0, storedFailure(endpoint));
}

/** False while a recent failure for this endpoint is still cooling down. */
export function canAttemptSync(endpoint: string, now = Date.now()): boolean {
	const failedAt = lastFailure(endpoint);
	return !failedAt || now - failedAt >= SYNC_FAILURE_COOLDOWN_MS || failedAt > now;
}

/** Record an attempt: `status` 0 means a network error. Any non-2xx starts the cooldown. */
export function noteSyncResult(endpoint: string, status: number, now = Date.now()) {
	const ok = status >= 200 && status < 300;
	if (ok) memoryFailures.delete(endpoint);
	else memoryFailures.set(endpoint, now);
	if (typeof localStorage === "undefined") return;
	try {
		if (ok) localStorage.removeItem(FAILURE_PREFIX + endpoint);
		else localStorage.setItem(FAILURE_PREFIX + endpoint, String(now));
	} catch {
		/* private mode: the in-memory record still blocks retries in this page */
	}
}

export function resetSyncPolicyForTests() {
	memoryFailures.clear();
	if (typeof localStorage === "undefined") return;
	try {
		for (const key of Object.keys(localStorage)) if (key.startsWith(FAILURE_PREFIX)) localStorage.removeItem(key);
	} catch {
		/* ignore */
	}
}
