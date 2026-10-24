import { json } from "./http";

/** Cloudflare KV throws once the daily free-tier write/list budget is spent. */
export function isKvLimitError(error: unknown): boolean {
	const message = error instanceof Error ? error.message : String(error);
	return /limit exceeded|too many requests|\b429\b/i.test(message);
}

export function kvLimitResponse(): Response {
	return json({ error: "storage quota exceeded, try again later" }, { status: 429 });
}

/**
 * Writes `body` under `key` only when it differs from what is stored (reads are 100x cheaper than
 * writes on the free tier). Returns the previous value, or a 429 Response when KV is out of quota.
 */
export async function putIfChanged(
	kv: KVNamespace,
	key: string,
	body: string,
	previous?: string | null,
): Promise<{ previous: string | null; written: boolean } | Response> {
	try {
		const before = previous !== undefined ? previous : await kv.get(key);
		if (before === body) return { previous: before, written: false };
		await kv.put(key, body);
		return { previous: before, written: true };
	} catch (error) {
		if (isKvLimitError(error)) return kvLimitResponse();
		throw error;
	}
}
