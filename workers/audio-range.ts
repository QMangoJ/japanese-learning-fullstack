type AssetFetcher = {
	fetch(input: Request | URL | string): Promise<Response>;
};

export type AudioByteRange = {
	start: number;
	end: number;
};

export function isAudioAssetRequest(request: Request) {
	if (request.method !== "GET" && request.method !== "HEAD") return false;
	const pathname = new URL(request.url).pathname;
	return pathname.startsWith("/audio/") && pathname.toLowerCase().endsWith(".mp3");
}

export function parseAudioByteRange(value: string, size: number): AudioByteRange | null {
	if (!Number.isSafeInteger(size) || size <= 0) return null;
	const match = /^bytes=(\d*)-(\d*)$/.exec(value.trim());
	if (!match || (!match[1] && !match[2])) return null;

	if (!match[1]) {
		const suffixLength = Number(match[2]);
		if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) return null;
		return { start: Math.max(0, size - suffixLength), end: size - 1 };
	}

	const start = Number(match[1]);
	const requestedEnd = match[2] ? Number(match[2]) : size - 1;
	if (!Number.isSafeInteger(start) || !Number.isSafeInteger(requestedEnd) || start < 0 || start >= size || requestedEnd < start) return null;
	return { start, end: Math.min(requestedEnd, size - 1) };
}

function fullAssetRequest(request: Request, forceGet: boolean) {
	const headers = new Headers(request.headers);
	headers.delete("Range");
	headers.delete("If-Range");
	return new Request(request.url, {
		method: forceGet ? "GET" : request.method,
		headers,
	});
}

function ifRangeMatches(request: Request, asset: Response) {
	const validator = request.headers.get("If-Range");
	if (!validator) return true;
	return validator === asset.headers.get("ETag") || validator === asset.headers.get("Last-Modified");
}

export async function serveAudioAsset(request: Request, assets: AssetFetcher) {
	const rangeHeader = request.headers.get("Range");
	const asset = await assets.fetch(fullAssetRequest(request, Boolean(rangeHeader)));
	if (!asset.ok) return asset;

	const headers = new Headers(asset.headers);
	headers.set("Accept-Ranges", "bytes");

	if (!rangeHeader || !ifRangeMatches(request, asset)) {
		return new Response(request.method === "HEAD" ? null : asset.body, {
			status: asset.status,
			statusText: asset.statusText,
			headers,
		});
	}

	const bytes = await asset.arrayBuffer();
	const range = parseAudioByteRange(rangeHeader, bytes.byteLength);
	if (!range) {
		headers.set("Content-Range", `bytes */${bytes.byteLength}`);
		headers.set("Content-Length", "0");
		return new Response(null, { status: 416, headers });
	}

	const length = range.end - range.start + 1;
	headers.set("Content-Range", `bytes ${range.start}-${range.end}/${bytes.byteLength}`);
	headers.set("Content-Length", String(length));
	return new Response(request.method === "HEAD" ? null : bytes.slice(range.start, range.end + 1), {
		status: 206,
		headers,
	});
}
