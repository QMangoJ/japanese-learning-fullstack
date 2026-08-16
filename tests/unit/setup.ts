import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";

afterEach(() => cleanup());

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
