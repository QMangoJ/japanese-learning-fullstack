import { describe, expect, it } from "vitest";
import { isNuOverridesPayload } from "../../app/auth/study-payloads";
import { cleanNuOverrides, mergeNuOverrides, type NuOverrideRow } from "../../app/study/nu-overrides";

const row = (id: string, code: string, ts: number): NuOverrideRow => ({ id, code, ts });

describe("nu-overrides payload validation", () => {
	it("accepts well-formed rows including reset tombstones", () => {
		expect(isNuOverridesPayload([row("1-1-0", "e", 100), row("8-6-3", "", 200)])).toBe(true);
		expect(isNuOverridesPayload([])).toBe(true);
	});

	it("rejects malformed rows", () => {
		expect(isNuOverridesPayload([row("1-1", "e", 100)])).toBe(false);
		expect(isNuOverridesPayload([row("1-1-0", "x", 100)])).toBe(false);
		expect(isNuOverridesPayload([row("1-1-0", "e", Number.NaN)])).toBe(false);
		expect(isNuOverridesPayload({ "1-1-0": "e" })).toBe(false);
		expect(isNuOverridesPayload(Array.from({ length: 401 }, (_, i) => row("1-1-0", "e", i)))).toBe(false);
	});
});

describe("cleanNuOverrides", () => {
	it("drops invalid rows and keeps the newest per id", () => {
		const cleaned = cleanNuOverrides([
			row("1-1-0", "f", 100),
			row("1-1-0", "e", 300),
			row("bad id", "e", 400),
			row("2-3-1", "x", 500),
			{ id: "2-3-1", code: "c" },
			row("2-3-1", "c", 200),
		]);
		expect(cleaned).toEqual([row("1-1-0", "e", 300), row("2-3-1", "c", 200)]);
	});
});

describe("mergeNuOverrides", () => {
	it("on the same device the newer local edit wins, including resets", () => {
		const server = [row("1-1-0", "f", 100), row("1-1-1", "c", 100)];
		const local = [row("1-1-0", "", 200), row("1-1-2", "e", 50)];
		const merged = mergeNuOverrides(local, server, true);
		expect(merged).toContainEqual(row("1-1-0", "", 200));
		expect(merged).toContainEqual(row("1-1-1", "c", 100));
		expect(merged).toContainEqual(row("1-1-2", "e", 50));
	});

	it("on a different device the server copy is authoritative", () => {
		const server = [row("1-1-0", "f", 100)];
		const local = [row("1-1-0", "e", 999), row("3-3-3", "e", 999)];
		expect(mergeNuOverrides(local, server, false)).toEqual(server);
	});
});
