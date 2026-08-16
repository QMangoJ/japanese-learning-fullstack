export type UserRecord = {
	id: string;
	googleId: string;
	email: string;
	name: string;
	picture: string;
	createdAt: number;
	lastLoginAt: number;
};

export type PublicUser = {
	id: string;
	email: string;
	name: string;
	picture: string;
};

export type GoogleProfile = {
	sub: string;
	email?: string;
	name?: string;
	picture?: string;
};

export function userRecordKey(id: string): string {
	return `user:${id}`;
}

export function googleIndexKey(googleId: string): string {
	return `google:${googleId}`;
}

export function favsKey(userId: string): string {
	return `favs:${userId}`;
}

export function mistakesKey(userId: string): string {
	return `mistakes:${userId}`;
}

export function toPublicUser(user: UserRecord): PublicUser {
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		picture: user.picture,
	};
}

export async function getUser(kv: KVNamespace, id: string): Promise<UserRecord | null> {
	const raw = await kv.get(userRecordKey(id), "json");
	if (!raw || typeof raw !== "object") return null;
	const user = raw as UserRecord;
	if (typeof user.id !== "string" || !user.id) return null;
	return user;
}

export async function upsertGoogleUser(kv: KVNamespace, profile: GoogleProfile): Promise<UserRecord> {
	const googleId = profile.sub;
	const existingId = await kv.get(googleIndexKey(googleId));
	const now = Date.now();
	const id = existingId || `g_${googleId}`;
	const prev = existingId ? await getUser(kv, id) : null;
	const user: UserRecord = {
		id,
		googleId,
		email: profile.email || prev?.email || "",
		name: profile.name || prev?.name || "",
		picture: profile.picture || prev?.picture || "",
		createdAt: prev?.createdAt || now,
		lastLoginAt: now,
	};
	await kv.put(userRecordKey(id), JSON.stringify(user));
	if (!existingId) await kv.put(googleIndexKey(googleId), id);
	return user;
}
