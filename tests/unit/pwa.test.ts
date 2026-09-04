import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import vm from "node:vm";
import { describe, expect, it, vi } from "vitest";

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
