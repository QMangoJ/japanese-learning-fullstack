import { describe, expect, it } from "vitest";

import { favsKey, googleIndexKey, mistakesKey, toPublicUser, upsertGoogleUser, userRecordKey } from "../../app/auth/users";
import { memoryKv } from "./auth-test-utils";

describe("user records", () => {
	it("namespaces kv keys by user", () => {
		expect(userRecordKey("g_1")).toBe("user:g_1");
		expect(googleIndexKey("sub")).toBe("google:sub");
		expect(favsKey("g_1")).toBe("favs:g_1");
		expect(mistakesKey("g_1")).toBe("mistakes:g_1");
		expect(favsKey("g_1")).not.toBe("favorites");
		expect(mistakesKey("g_1")).not.toBe("mistakes");
	});

	it("creates a user from a google profile and reuses the same id", async () => {
		const kv = memoryKv();
		const first = await upsertGoogleUser(kv, {
			sub: "abc",
			email: "a@example.com",
			name: "Ada",
			picture: "https://example.com/a.png",
		});
		expect(first.id).toBe("g_abc");
		expect(first.email).toBe("a@example.com");
		expect(kv.map.get(googleIndexKey("abc"))).toBe("g_abc");

		const second = await upsertGoogleUser(kv, {
			sub: "abc",
			email: "ada@example.com",
			name: "Ada Lovelace",
			picture: "https://example.com/b.png",
		});
		expect(second.id).toBe(first.id);
		expect(second.createdAt).toBe(first.createdAt);
		expect(second.email).toBe("ada@example.com");
		expect(second.name).toBe("Ada Lovelace");
		expect(toPublicUser(second)).toEqual({
			id: "g_abc",
			email: "ada@example.com",
			name: "Ada Lovelace",
			picture: "https://example.com/b.png",
		});
	});
});
