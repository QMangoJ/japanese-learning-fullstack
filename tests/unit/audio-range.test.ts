import { describe, expect, it, vi } from "vitest";

import { isAudioAssetRequest, parseAudioByteRange, serveAudioAsset } from "../../workers/audio-range";

function fakeAssets(body = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7])) {
	return {
		fetch: vi.fn(async () =>
			new Response(body, {
				status: 200,
				headers: {
					"Content-Length": String(body.byteLength),
					"Content-Type": "audio/mpeg",
					ETag: '"audio-v1"',
				},
			})),
	};
}

describe("audio byte ranges", () => {
	it("recognizes only GET and HEAD MP3 asset requests", () => {
		expect(isAudioAssetRequest(new Request("https://example.test/audio/n3/cd1/CD01_14.mp3"))).toBe(true);
		expect(isAudioAssetRequest(new Request("https://example.test/audio/n3/cd1/CD01_14.mp3", { method: "HEAD" }))).toBe(true);
		expect(isAudioAssetRequest(new Request("https://example.test/data/example.mp3"))).toBe(false);
		expect(isAudioAssetRequest(new Request("https://example.test/audio/example.jpg"))).toBe(false);
	});

	it("parses fixed, open-ended, and suffix ranges", () => {
		expect(parseAudioByteRange("bytes=2-5", 8)).toEqual({ start: 2, end: 5 });
		expect(parseAudioByteRange("bytes=5-", 8)).toEqual({ start: 5, end: 7 });
		expect(parseAudioByteRange("bytes=-3", 8)).toEqual({ start: 5, end: 7 });
		expect(parseAudioByteRange("bytes=20-30", 8)).toBeNull();
		expect(parseAudioByteRange("bytes=0-1,4-5", 8)).toBeNull();
	});

	it("returns a standards-compliant partial audio response", async () => {
		const assets = fakeAssets();
		const response = await serveAudioAsset(
			new Request("https://example.test/audio/n3/cd1/CD01_14.mp3", { headers: { Range: "bytes=2-5" } }),
			assets,
		);

		expect(response.status).toBe(206);
		expect(response.headers.get("Accept-Ranges")).toBe("bytes");
		expect(response.headers.get("Content-Range")).toBe("bytes 2-5/8");
		expect(response.headers.get("Content-Length")).toBe("4");
		expect([...new Uint8Array(await response.arrayBuffer())]).toEqual([2, 3, 4, 5]);
		expect(assets.fetch).toHaveBeenCalledOnce();
		const forwarded = assets.fetch.mock.calls[0][0] as Request;
		expect(forwarded.headers.has("Range")).toBe(false);
	});

	it("returns 416 for an unsatisfiable range", async () => {
		const response = await serveAudioAsset(
			new Request("https://example.test/audio/n3/cd1/CD01_14.mp3", { headers: { Range: "bytes=99-" } }),
			fakeAssets(),
		);

		expect(response.status).toBe(416);
		expect(response.headers.get("Content-Range")).toBe("bytes */8");
	});
});
