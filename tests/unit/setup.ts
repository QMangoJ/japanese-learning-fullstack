import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";

afterEach(() => cleanup());

// Node 26 exposes an undefined localStorage shim unless a backing file is
// configured. Tests should use jsdom's storage (or an in-memory fallback)
// instead of depending on that process-level flag.
if (typeof globalThis.localStorage === "undefined") {
	const values = new Map<string, string>();
	const memoryStorage: Storage = {
		get length() { return values.size; },
		clear() { values.clear(); },
		getItem(key) { return values.get(String(key)) ?? null; },
		key(index) { return [...values.keys()][index] ?? null; },
		removeItem(key) { values.delete(String(key)); },
		setItem(key, value) { values.set(String(key), String(value)); },
	};
	let storage = memoryStorage;
	try {
		if (typeof window !== "undefined" && window.localStorage) storage = window.localStorage;
	} catch {
		// An opaque jsdom origin has no storage; the in-memory implementation is enough.
	}
	Object.defineProperty(globalThis, "localStorage", { value: storage, configurable: true, writable: true });
}

if (!globalThis.fetch) {
	globalThis.fetch = async () => new Response("{}", { status: 200 });
} else {
	const original = globalThis.fetch;
	globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
		try {
			return await original(input, init);
		} catch {
			return new Response("{}", { status: 200 });
		}
	};
}

if (typeof window !== "undefined" && !window.scrollTo) {
	window.scrollTo = () => {};
} else if (typeof window !== "undefined") {
	try {
		window.scrollTo = () => {};
	} catch {
		// jsdom may already have a non-writable stub
	}
}

if (!("speechSynthesis" in globalThis)) {
	Object.defineProperty(globalThis, "speechSynthesis", {
		value: {
			cancel() {},
			speak() {},
			getVoices() {
				return [];
			},
		},
		configurable: true,
	});
}
