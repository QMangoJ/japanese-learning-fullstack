import { afterEach, describe, expect, it, vi } from "vitest";

import { action } from "../../app/routes/api.mistake-translations";
import { geminiTranslate, translationKey } from "../../app/study/mistake-translations";
import { authedRequest, memoryKv, routeContext, seedUser, testEnv } from "./auth-test-utils";

function geminiResponse(values: string[]) {
	return new Response(
		JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify(values) }] } }] }),
		{ status: 200, headers: { "content-type": "application/json" } },
	);
}

function post(body: unknown) {
	return new Request("http://localhost/api/mistake-translations", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(body),
	});
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("/api/mistake-translations", () => {
	it("returns cached translations to guests without calling Gemini", async () => {
		const kv = memoryKv();
		kv.map.set(await translationKey("気づく"), "注意到；察觉");
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);
		const env = { ...testEnv(kv), GEMINI_API_KEY: "k" };
		const res = await action({ request: post({ texts: ["気づく", "喜ぶ"] }), context: routeContext(env) });
		expect(await res.json()).toEqual({ translations: { 気づく: "注意到；察觉" }, pending: 1 });
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("generates and caches missing translations for signed-in users", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const fetchMock = vi.fn(async () => geminiResponse(["高兴；喜悦"]));
		vi.stubGlobal("fetch", fetchMock);
		const env = { ...testEnv(kv), GEMINI_API_KEY: "k" };
		const request = await authedRequest("http://localhost/api/mistake-translations", "g_1", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ texts: ["喜ぶ\nよろこぶ"] }),
		});
		const res = await action({ request, context: routeContext(env) });
		expect(await res.json()).toEqual({ translations: { "喜ぶ\nよろこぶ": "高兴；喜悦" }, pending: 0 });
		expect(kv.map.get(await translationKey("喜ぶ\nよろこぶ"))).toBe("高兴；喜悦");
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});

	it("rejects bad payloads", async () => {
		const env = testEnv(memoryKv());
		const res = await action({ request: post({ texts: [1] }), context: routeContext(env) });
		expect(res.status).toBe(400);
	});
});

describe("geminiTranslate", () => {
	it("returns nulls when the response shape is wrong", async () => {
		const fetchImpl = vi.fn(async () => geminiResponse(["only one"])) as unknown as typeof fetch;
		expect(await geminiTranslate(["a", "b"], "k", { fetchImpl })).toEqual([null, null]);
	});
});
