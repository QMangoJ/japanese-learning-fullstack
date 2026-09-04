/* 日本語上手: conservative offline cache for visited study content. */
const CACHE_VERSION = "2026-09-05-v2";
const SHELL_CACHE = `jl-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `jl-runtime-${CACHE_VERSION}`;
const MEDIA_CACHE = `jl-media-${CACHE_VERSION}`;
const CACHE_PREFIX = "jl-";
const CORE_URLS = [
	"/study",
	"/study.css",
	"/manifest.webmanifest",
	"/favicon.svg",
	"/icon-192.png",
	"/icon-512.png",
	"/apple-touch-icon.png",
];

function isPrivatePath(pathname) {
	return pathname.startsWith("/api/") || pathname.startsWith("/auth/");
}

function canCache(response) {
	return response && response.ok && (response.type === "basic" || response.type === "cors");
}

async function put(cacheName, request, response) {
	if (!canCache(response)) return;
	const cache = await caches.open(cacheName);
	await cache.put(request, response.clone());
}

self.addEventListener("install", (event) => {
	self.skipWaiting();
	event.waitUntil((async () => {
		const cache = await caches.open(SHELL_CACHE);
		await Promise.allSettled(CORE_URLS.map((url) => cache.add(url)));
	})());
});

self.addEventListener("activate", (event) => {
	event.waitUntil((async () => {
		const keep = new Set([SHELL_CACHE, RUNTIME_CACHE, MEDIA_CACHE]);
		const names = await caches.keys();
		await Promise.all(names.filter((name) => name.startsWith(CACHE_PREFIX) && !keep.has(name)).map((name) => caches.delete(name)));
		await self.clients.claim();
	})());
});

self.addEventListener("message", (event) => {
	if (event.data?.type !== "CACHE_URLS" || !Array.isArray(event.data.urls)) return;
	event.waitUntil((async () => {
		const cache = await caches.open(RUNTIME_CACHE);
		await Promise.allSettled(event.data.urls.slice(0, 80).map(async (raw) => {
			const url = new URL(raw, self.location.origin);
			if (url.origin !== self.location.origin || isPrivatePath(url.pathname) || url.pathname.startsWith("/audio/")) return;
			const request = new Request(url.href, { credentials: "same-origin" });
			const response = await fetch(request);
			if (canCache(response)) await cache.put(request, response);
		}));
	})());
});

async function networkFirst(event, fallback) {
	const request = event.request;
	const cached = (await caches.match(request)) || (fallback ? await caches.match(fallback) : undefined);
	if (cached && self.navigator?.onLine === false) return cached;

	const network = fetch(request).then(async (response) => {
		await put(RUNTIME_CACHE, request, response);
		return response;
	});
	if (!cached) return network;

	// Browsers can leave a Service Worker fetch pending for a long time after
	// connectivity disappears. Prefer a recent cache after a short grace period,
	// while allowing the network update to finish in the background when online.
	event.waitUntil(network.catch(() => undefined));
	return Promise.race([
		network.catch(() => cached),
		new Promise((resolve) => setTimeout(() => resolve(cached), 600)),
	]);
}

async function cacheFirst(request) {
	// Resources added after registration use a synthetic request. Ignore Vary
	// when matching same-origin static assets so later script/style requests can
	// reuse that response even if browser-added Accept headers differ.
	const cached = await caches.match(request, { ignoreVary: true });
	if (cached) return cached;
	const response = await fetch(request);
	await put(RUNTIME_CACHE, request, response);
	return response;
}

async function trimMediaCache(maxEntries = 24) {
	const cache = await caches.open(MEDIA_CACHE);
	const keys = await cache.keys();
	await Promise.all(keys.slice(0, Math.max(0, keys.length - maxEntries)).map((key) => cache.delete(key)));
}

async function cacheFullAudio(url) {
	try {
		const request = new Request(url, { credentials: "same-origin" });
		const response = await fetch(request);
		if (response.status !== 200) return;
		await put(MEDIA_CACHE, request, response);
		await trimMediaCache();
	} catch {
		/* The current partial response remains usable while online. */
	}
}

async function responseForRange(request, full) {
	const range = request.headers.get("range")?.match(/^bytes=(\d*)-(\d*)$/i);
	if (!range) return full;
	const bytes = await full.arrayBuffer();
	const size = bytes.byteLength;
	let start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2] || 0));
	let end = range[2] && range[1] ? Number(range[2]) : size - 1;
	if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || start >= size || end < start) {
		return new Response(null, { status: 416, headers: { "content-range": `bytes */${size}` } });
	}
	end = Math.min(end, size - 1);
	const headers = new Headers(full.headers);
	headers.set("accept-ranges", "bytes");
	headers.set("content-range", `bytes ${start}-${end}/${size}`);
	headers.set("content-length", String(end - start + 1));
	return new Response(bytes.slice(start, end + 1), { status: 206, statusText: "Partial Content", headers });
}

async function audioResponse(event) {
	const request = event.request;
	const media = await caches.open(MEDIA_CACHE);
	const full = await media.match(request.url);
	if (full) return request.headers.has("range") ? responseForRange(request, full) : full;
	try {
		const response = await fetch(request);
		if (request.headers.has("range") || response.status === 206) event.waitUntil(cacheFullAudio(request.url));
		else event.waitUntil(put(MEDIA_CACHE, request, response).then(() => trimMediaCache()));
		return response;
	} catch (error) {
		const fallback = await media.match(request.url);
		if (fallback) return responseForRange(request, fallback);
		throw error;
	}
}

self.addEventListener("fetch", (event) => {
	const request = event.request;
	if (request.method !== "GET") return;
	const url = new URL(request.url);
	if (url.origin !== self.location.origin || isPrivatePath(url.pathname)) return;

	if (request.mode === "navigate") {
		event.respondWith(networkFirst(event, "/study"));
		return;
	}
	if (url.pathname.startsWith("/audio/")) {
		event.respondWith(audioResponse(event));
		return;
	}
	if (url.pathname.startsWith("/data/")) {
		event.respondWith(networkFirst(event));
		return;
	}
	if (url.pathname.startsWith("/assets/") || /\.(?:css|js|png|jpe?g|svg|webp|woff2?)$/i.test(url.pathname)) {
		event.respondWith(cacheFirst(request));
	}
});
