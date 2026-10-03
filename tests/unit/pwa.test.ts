import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import vm from "node:vm";
import { describe, expect, it, vi } from "vitest";
import {
	SW_CACHE_VERSION_PATTERN,
	SW_CACHE_VERSION_PLACEHOLDER,
	injectSwCacheVersion,
	resolveSwCacheVersion,
} from "../../sw-cache-version";

const publicDir = resolve(import.meta.dirname, "../../public");
const source = readFileSync(resolve(publicDir, "sw.js"), "utf8");

function serviceWorkerFunction<T>(name: string): T {
	const context = vm.createContext({
		URL,
		Request,
		Response,
		Headers,
		Promise,
		setTimeout,
		caches: {
			open: vi.fn(),
			keys: vi.fn(),
			delete: vi.fn(),
			match: vi.fn(),
		},
		fetch: vi.fn(),
		self: {
			location: { origin: "https://study.example" },
			navigator: { onLine: true },
			addEventListener: vi.fn(),
			skipWaiting: vi.fn(),
			clients: { claim: vi.fn() },
		},
	});
	vm.runInContext(source, context);
	return vm.runInContext(name, context) as T;
}

describe("PWA offline policy", () => {
	it("installs directly into the study area", () => {
		const manifest = JSON.parse(readFileSync(resolve(publicDir, "manifest.webmanifest"), "utf8"));
		expect(manifest.id).toBe("/study");
		expect(manifest.start_url).toBe("/study");
		expect(manifest.icons.every((icon: { purpose?: string }) => icon.purpose?.includes("maskable"))).toBe(true);
	});

	it("never caches account or authentication responses", () => {
		const isPrivatePath = serviceWorkerFunction<(path: string) => boolean>("isPrivatePath");
		expect(isPrivatePath("/api/favorites")).toBe(true);
		expect(isPrivatePath("/auth/google")).toBe(true);
		expect(isPrivatePath("/study/day/1-1")).toBe(false);
	});

	it("serves byte ranges from a previously cached audio file", async () => {
		const responseForRange = serviceWorkerFunction<(request: Request, response: Response) => Promise<Response>>("responseForRange");
		const request = new Request("https://study.example/audio/lesson.mp3", { headers: { range: "bytes=2-5" } });
		const response = await responseForRange(request, new Response(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]), {
			headers: { "content-type": "audio/mpeg" },
		}));
		expect(response.status).toBe(206);
		expect(response.headers.get("content-range")).toBe("bytes 2-5/8");
		expect([...new Uint8Array(await response.arrayBuffer())]).toEqual([2, 3, 4, 5]);
	});

	it("returns a cached navigation immediately when the worker is offline", async () => {
		const cached = new Response("cached study page");
		const match = vi.fn(async () => cached.clone());
		const context = vm.createContext({
			URL,
			Request,
			Response,
			Headers,
			Promise,
			setTimeout,
			caches: { open: vi.fn(), keys: vi.fn(), delete: vi.fn(), match },
			fetch: vi.fn(() => new Promise(() => {})),
			self: {
				location: { origin: "https://study.example" },
				navigator: { onLine: false },
				addEventListener: vi.fn(),
				skipWaiting: vi.fn(),
				clients: { claim: vi.fn() },
			},
		});
		vm.runInContext(source, context);
		const networkFirst = vm.runInContext("networkFirst", context) as (
			event: { request: Request; waitUntil(promise: Promise<unknown>): void },
			fallback?: string,
		) => Promise<Response>;
		const response = await networkFirst({
			request: new Request("https://study.example/study/day/1-1"),
			waitUntil: vi.fn(),
		}, "/study");
		expect(await response.text()).toBe("cached study page");
		expect(match).toHaveBeenCalled();
	});

	it("waits for the network on an online navigation instead of serving stale HTML", async () => {
		const cached = new Response("old study page");
		const match = vi.fn(async () => cached.clone());
		const fetch = vi.fn(async () => new Response("new study page"));
		const put = vi.fn();
		const context = vm.createContext({
			URL, Request, Response, Headers, Promise, setTimeout,
			caches: { open: vi.fn(async () => ({ put })), keys: vi.fn(), delete: vi.fn(), match },
			fetch,
			self: { location: { origin: "https://study.example" }, navigator: { onLine: true }, addEventListener: vi.fn(), skipWaiting: vi.fn(), clients: { claim: vi.fn() } },
		});
		vm.runInContext(source, context);
		const networkFirst = vm.runInContext("networkFirst", context) as (
			event: { request: Request }, fallback?: string,
		) => Promise<Response>;
		const response = await networkFirst({ request: new Request("https://study.example/study") }, "/study");
		expect(await response.text()).toBe("new study page");
		expect(fetch).toHaveBeenCalledOnce();
	});

	it("keeps a build-time placeholder instead of a hand-bumped cache version", () => {
		expect(source).toContain(`const CACHE_VERSION = "${SW_CACHE_VERSION_PLACEHOLDER}";`);
		expect(source.match(/const CACHE_VERSION = /g)).toHaveLength(1);
		expect(source).toContain('url.pathname === "/study.css"');
	});

	it("generates a unique cache version from build time and commit", () => {
		const now = new Date("2026-10-04T07:12:05.123Z");
		const sha = "ABCDEF1234567890abcdef1234567890abcdef12";
		expect(resolveSwCacheVersion({ env: { WORKERS_CI_COMMIT_SHA: sha }, now, gitSha: () => "1111111" })).toBe("20261004T071205Z-abcdef1");
		expect(resolveSwCacheVersion({ env: { GITHUB_SHA: "2222222abc" }, now, gitSha: () => "1111111" })).toBe("20261004T071205Z-2222222");
		expect(resolveSwCacheVersion({ env: { WORKERS_CI_COMMIT_SHA: " " }, now, gitSha: () => "3333333\n" })).toBe("20261004T071205Z-3333333");
		expect(resolveSwCacheVersion({ env: {}, now, gitSha: () => undefined })).toBe("20261004T071205Z-nogit");
		expect(resolveSwCacheVersion()).toMatch(SW_CACHE_VERSION_PATTERN);
		const later = resolveSwCacheVersion({ env: { GITHUB_SHA: sha }, now: new Date("2026-10-04T07:12:06Z") });
		expect(later).not.toBe(resolveSwCacheVersion({ env: { GITHUB_SHA: sha }, now }));
	});

	it("injects the generated version into the built worker", () => {
		const built = injectSwCacheVersion(source, "20261004T071205Z-abcdef1");
		expect(built).toContain('const CACHE_VERSION = "20261004T071205Z-abcdef1";');
		expect(built).not.toContain(SW_CACHE_VERSION_PLACEHOLDER);
		expect(() => injectSwCacheVersion("const CACHE_VERSION = \"v1\";", "x")).toThrow(/placeholder/);
		const context = vm.createContext({ self: { addEventListener: vi.fn(), location: { origin: "https://study.example" } }, caches: {} });
		vm.runInContext(built, context);
		expect(vm.runInContext("SHELL_CACHE", context)).toBe("jl-shell-20261004T071205Z-abcdef1");
	});

	it("matches pre-cached static assets regardless of browser-added Vary headers", async () => {
		const cached = new Response("cached script");
		const match = vi.fn(async () => cached.clone());
		const context = vm.createContext({
			URL,
			Request,
			Response,
			Headers,
			Promise,
			setTimeout,
			caches: { open: vi.fn(), keys: vi.fn(), delete: vi.fn(), match },
			fetch: vi.fn(),
			self: {
				location: { origin: "https://study.example" },
				navigator: { onLine: true },
				addEventListener: vi.fn(),
				skipWaiting: vi.fn(),
				clients: { claim: vi.fn() },
			},
		});
		vm.runInContext(source, context);
		const cacheFirst = vm.runInContext("cacheFirst", context) as (request: Request) => Promise<Response>;
		const response = await cacheFirst(new Request("https://study.example/assets/app.js"));
		expect(await response.text()).toBe("cached script");
		expect(match).toHaveBeenCalledWith(expect.any(Request), { ignoreVary: true });
	});
});
