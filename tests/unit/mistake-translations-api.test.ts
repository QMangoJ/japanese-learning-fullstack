import { afterEach, describe, expect, it, vi } from "vitest";

import { action as studyAction } from "../../app/routes/api.mistake-study";
import { action } from "../../app/routes/api.mistake-translations";
import {
	geminiStudyAids,
	geminiTranslate,
	parseJsonArray,
	studyAidKey,
	translationKey,
	workersAiText,
} from "../../app/study/mistake-translations";
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
		expect(await res.json()).toEqual({ translations: { 気づく: "注意到；察觉" }, pending: 1, retry: false });
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("generates and caches missing translations for signed-in users", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);
		const run = vi.fn(async () => ({ response: ["高兴；喜悦"] }));
		// The Gemini key is reserved for news-learning: the route must not use it even when present.
		const env = { ...testEnv(kv), GEMINI_API_KEY: "k", AI: { run } };
		const request = await authedRequest("http://localhost/api/mistake-translations", "g_1", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ texts: ["喜ぶ\nよろこぶ"] }),
		});
		const res = await action({ request, context: routeContext(env) });
		expect(await res.json()).toEqual({ translations: { "喜ぶ\nよろこぶ": "高兴；喜悦" }, pending: 0, retry: false });
		expect(kv.map.get(await translationKey("喜ぶ\nよろこぶ"))).toBe("高兴；喜悦");
		expect(run).toHaveBeenCalledTimes(1);
		expect(fetchMock).not.toHaveBeenCalled();
	});


	it("skips generation when generate is false (manual notes)", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);
		const env = { ...testEnv(kv), GEMINI_API_KEY: "k" };
		const request = await authedRequest("http://localhost/api/mistake-translations", "g_1", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ texts: ["勿体ない"], generate: false }),
		});
		const res = await action({ request, context: routeContext(env) });
		expect(await res.json()).toEqual({ translations: {}, pending: 1, retry: false });
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("returns assistant-marked cache and never overwrites it", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const key = await translationKey("勿体ない");
		kv.map.set(key, JSON.stringify({ cn: "浪费可惜；不舍得", source: "assistant" }));
		const fetchMock = vi.fn(async () => geminiResponse(["错误覆盖"]));
		vi.stubGlobal("fetch", fetchMock);
		const env = { ...testEnv(kv), GEMINI_API_KEY: "k" };
		const request = await authedRequest("http://localhost/api/mistake-translations", "g_1", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ texts: ["勿体ない"] }),
		});
		const res = await action({ request, context: routeContext(env) });
		expect(await res.json()).toEqual({
			translations: { 勿体ない: "浪费可惜；不舍得" },
			pending: 0,
			retry: false,
		});
		expect(kv.map.get(key)).toContain("assistant");
		expect(fetchMock).not.toHaveBeenCalled();
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

describe("/api/mistake-study", () => {
	it("generates and caches a reading and an example for a signed-in user", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);
		const run = vi.fn(async () => ({
			response: [{ reading: "ようがん", cn: "熔岩", example: "溶岩が流れました。", exampleCn: "熔岩流下来了。" }],
		}));
		const env = { ...testEnv(kv), GEMINI_API_KEY: "k", AI: { run } };
		const request = await authedRequest("http://localhost/api/mistake-study", "g_1", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ texts: ["溶岩"] }),
		});
		const res = await studyAction({ request, context: routeContext(env) });
		expect(await res.json()).toEqual({
			aids: { 溶岩: { reading: "ようがん", cn: "熔岩", example: "溶岩が流れました。", exampleCn: "熔岩流下来了。" } },
			pending: 0,
			retry: false,
		});
		expect(kv.map.get(await studyAidKey("溶岩"))).toContain("ようがん");
		expect(fetchMock).not.toHaveBeenCalled();
	});
});

describe("geminiStudyAids", () => {
	it("drops an aid that is not hiragana and not a Japanese example", async () => {
		const fetchImpl = vi.fn(async () =>
			new Response(
				JSON.stringify({
					candidates: [{ content: { parts: [{ text: JSON.stringify([{ reading: "lava", example: "hello", exampleCn: "你好" }]) }] } }],
				}),
				{ status: 200 },
			),
		) as unknown as typeof fetch;
		expect(await geminiStudyAids(["溶岩"], "k", { fetchImpl })).toEqual([null]);
	});
});

describe("self-typed notes when Gemini is out of quota", () => {
	const quota = () =>
		new Response(JSON.stringify({ error: { code: 429, message: "Resource has been exhausted (e.g. check quota)." } }), {
			status: 429,
		});

	it("uses Workers AI only (never Gemini) and caches the result", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const fetchMock = vi.fn(async () => quota());
		vi.stubGlobal("fetch", fetchMock);
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const run = vi.fn(async () => ({
			choices: [{ message: { content: '```json\n["可惜；浪费", "本应该……（结果却没有）", "掌握；学会"]\n```' } }],
		}));
		const env = { ...testEnv(kv), GEMINI_API_KEY: "secret-key", AI: { run } };
		const texts = ["勿体ない", "はずだった", "習得"];
		const request = await authedRequest("http://localhost/api/mistake-translations", "g_1", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ texts }),
		});
		const res = await action({ request, context: routeContext(env) });
		expect(await res.json()).toEqual({
			translations: { 勿体ない: "可惜；浪费", はずだった: "本应该……（结果却没有）", 習得: "掌握；学会" },
			pending: 0,
			retry: false,
		});
		expect(fetchMock).not.toHaveBeenCalled();
		expect(run).toHaveBeenCalledWith("@cf/openai/gpt-oss-120b", expect.objectContaining({ messages: expect.any(Array) }));
		expect(kv.map.get(await translationKey("習得"))).toBe("掌握；学会");
		const logged = warn.mock.calls.map((c) => String(c[0])).join("\n");
		expect(logged).not.toContain("secret-key");
		warn.mockRestore();
	});

	it("asks the client to retry when every provider failed", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		vi.stubGlobal("fetch", vi.fn(async () => quota()));
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const env = { ...testEnv(kv), GEMINI_API_KEY: "k", AI: { run: vi.fn(async () => { throw new Error("3040: capacity"); }) } };
		const request = await authedRequest("http://localhost/api/mistake-translations", "g_1", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ texts: ["勿体ない"] }),
		});
		const res = await action({ request, context: routeContext(env) });
		expect(await res.json()).toEqual({ translations: {}, pending: 1, retry: true });
		expect(kv.map.size).toBe(1); // only the user record, no empty translation cached
		warn.mockRestore();
	});

	it("generates study aids with only Workers AI configured", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const run = vi.fn(async () => ({
			response: [{ reading: "しゅうとく", cn: "掌握；学会", example: "技術を習得した。", exampleCn: "掌握了技术。" }],
		}));
		const env = { ...testEnv(kv), AI: { run } };
		const request = await authedRequest("http://localhost/api/mistake-study", "g_1", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ texts: ["習得"] }),
		});
		const res = await studyAction({ request, context: routeContext(env) });
		expect(await res.json()).toEqual({
			aids: { 習得: { reading: "しゅうとく", cn: "掌握；学会", example: "技術を習得した。", exampleCn: "掌握了技术。" } },
			pending: 0,
			retry: false,
		});
		expect(kv.map.get(await studyAidKey("習得"))).toContain("しゅうとく");
	});
});

describe("model reply parsing", () => {
	it("reads JSON arrays from fenced text and the different Workers AI shapes", () => {
		expect(parseJsonArray('好的：\n```json\n["a","b"]\n```')).toEqual(["a", "b"]);
		expect(parseJsonArray("no json")).toBeNull();
		expect(workersAiText({ response: "[1]" })).toBe("[1]");
		expect(workersAiText({ choices: [{ message: { content: "[2]" } }] })).toBe("[2]");
		expect(
			workersAiText({ output: [{ type: "reasoning", content: [{ text: "think" }] }, { type: "message", content: [{ text: "[3]" }] }] }),
		).toBe("[3]");
	});
});
