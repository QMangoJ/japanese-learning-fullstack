import { makeSessionCookie } from "../../app/auth/session";
import { userRecordKey, type UserRecord } from "../../app/auth/users";

export const TEST_SECRET = "unit-test-session-secret!!";

export function memoryKv(init: Record<string, string> = {}) {
	const map = new Map(Object.entries(init));
	return {
		async get(key: string, type?: "text" | "json") {
			const value = map.get(key);
			if (value == null) return null;
			if (type === "json") return JSON.parse(value);
			return value;
		},
		async put(key: string, value: string) {
			map.set(key, value);
		},
		async delete(key: string) {
			map.delete(key);
		},
		map,
	};
}

export type MemoryKv = ReturnType<typeof memoryKv>;

export function testEnv(kv: MemoryKv, extra: Record<string, string> = {}) {
	return {
		FAVORITES_KV: kv as unknown as KVNamespace,
		MISTAKES_KV: kv as unknown as KVNamespace,
		GOOGLE_CLIENT_ID: "cid.apps.googleusercontent.com",
		GOOGLE_CLIENT_SECRET: "csecret",
		SESSION_SECRET: TEST_SECRET,
		...extra,
	};
}

export function routeContext(env: ReturnType<typeof testEnv>) {
	return { cloudflare: { env, ctx: {} as ExecutionContext } };
}

export function seedUser(kv: MemoryKv, user: Partial<UserRecord> & { id: string }): UserRecord {
	const record: UserRecord = {
		googleId: user.googleId || user.id.replace(/^g_/, ""),
		email: user.email || "user@example.com",
		name: user.name || "User",
		picture: user.picture || "",
		createdAt: user.createdAt || 1,
		lastLoginAt: user.lastLoginAt || 1,
		...user,
	};
	kv.map.set(userRecordKey(record.id), JSON.stringify(record));
	return record;
}

export async function authedRequest(url: string, userId: string, init: RequestInit = {}) {
	const cookie = await makeSessionCookie(TEST_SECRET, userId, false);
	const headers = new Headers(init.headers);
	headers.set("cookie", cookie);
	return new Request(url, { ...init, headers });
}
