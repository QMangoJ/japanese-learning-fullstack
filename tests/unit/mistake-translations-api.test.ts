import { afterEach, describe, expect, it, vi } from "vitest";

import { action as studyAction } from "../../app/routes/api.mistake-study";
import { action } from "../../app/routes/api.mistake-translations";
import { studyAidKey, translationKey } from "../../app/study/mistake-translations";
import { authedRequest, memoryKv, routeContext, seedUser, testEnv } from "./auth-test-utils";

function post(body: unknown) {
	return new Request("http://localhost/api/mistake-translations", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(body),
	});
}

/** Env with model credentials/bindings present: the routes must still never use them. */
function envWithModels(kv: ReturnType<typeof memoryKv>) {
	const run = vi.fn(async () => ({ response: ["不该调用"] }));
	return { env: { ...testEnv(kv), GEMINI_API_KEY: "k", AI: { run } }, run };
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("/api/mistake-translations (cache lookup only)", () => {
	it("returns cached translations to guests", async () => {
		const kv = memoryKv();
		kv.map.set(await translationKey("気づく"), "注意到；察觉");
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);
		const { env, run } = envWithModels(kv);
		const res = await action({ request: post({ texts: ["気づく", "喜ぶ"] }), context: routeContext(env) });
		expect(await res.json()).toEqual({ translations: { 気づく: "注意到；察觉" }, pending: 1, retry: false });
		expect(fetchMock).not.toHaveBeenCalled();
		expect(run).not.toHaveBeenCalled();
	});

	it("never calls Gemini or Workers AI for signed-in users, even with generate: true", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);
		const { env, run } = envWithModels(kv);
		const request = await authedRequest("http://localhost/api/mistake-translations", "g_1", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ texts: ["喜ぶ\nよろこぶ"], generate: true }),
		});
		const res = await action({ request, context: routeContext(env) });
		expect(await res.json()).toEqual({ translations: {}, pending: 1, retry: false });
		expect(fetchMock).not.toHaveBeenCalled();
		expect(run).not.toHaveBeenCalled();
		expect(kv.map.size).toBe(1); // only the user record
	});

	it("returns assistant-written translations", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const key = await translationKey("勿体ない");
		kv.map.set(key, JSON.stringify({ cn: "浪费可惜；不舍得", source: "assistant" }));
		const { env, run } = envWithModels(kv);
		const request = await authedRequest("http://localhost/api/mistake-translations", "g_1", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ texts: ["勿体ない"], generate: false }),
		});
		const res = await action({ request, context: routeContext(env) });
		expect(await res.json()).toEqual({ translations: { 勿体ない: "浪费可惜；不舍得" }, pending: 0, retry: false });
		expect(kv.map.get(key)).toContain("assistant");
		expect(run).not.toHaveBeenCalled();
	});

	it("rejects bad payloads", async () => {
		const env = testEnv(memoryKv());
		const res = await action({ request: post({ texts: [1] }), context: routeContext(env) });
		expect(res.status).toBe(400);
	});
});

describe("/api/mistake-study (cache lookup only)", () => {
	it("returns cached aids and never generates missing ones", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		kv.map.set(
			await studyAidKey("習得"),
			JSON.stringify({ reading: "しゅうとく", cn: "掌握；学会", example: "技術を習得した。", exampleCn: "掌握了技术。", source: "assistant" }),
		);
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);
		const { env, run } = envWithModels(kv);
		const request = await authedRequest("http://localhost/api/mistake-study", "g_1", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ texts: ["習得", "溶岩"] }),
		});
		const res = await studyAction({ request, context: routeContext(env) });
		const data = (await res.json()) as { aids: Record<string, { reading?: string; cn?: string }>; pending: number; retry: boolean };
		expect(data.aids["習得"]).toMatchObject({ reading: "しゅうとく", cn: "掌握；学会" });
		expect(data.aids["溶岩"]).toBeUndefined();
		expect(data.pending).toBe(1);
		expect(data.retry).toBe(false);
		expect(fetchMock).not.toHaveBeenCalled();
		expect(run).not.toHaveBeenCalled();
	});
});
