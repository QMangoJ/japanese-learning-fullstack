/** @vitest-environment node */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("usage time live timer", () => {
	let startUsageTracker: typeof import("../../app/study/usage-time").startUsageTracker;
	let usageSnapshot: typeof import("../../app/study/usage-time").usageSnapshot;
	let jstDayKey: typeof import("../../app/study/usage-time").jstDayKey;
	let stop: (() => void) | undefined;

	beforeEach(async () => {
		vi.useFakeTimers({ now: Date.parse("2026-10-14T03:00:00.000Z") });
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response(JSON.stringify({}), { status: 200 })),
		);
		vi.stubGlobal("addEventListener", vi.fn());
		vi.stubGlobal("removeEventListener", vi.fn());
		vi.stubGlobal("document", {
			hidden: false,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		});
		vi.stubGlobal("window", globalThis);
		localStorage.clear();
		vi.resetModules();
		({ startUsageTracker, usageSnapshot, jstDayKey } = await import("../../app/study/usage-time"));
	});

	afterEach(() => {
		stop?.();
		stop = undefined;
		vi.useRealTimers();
		vi.unstubAllGlobals();
		vi.resetModules();
	});

	function todaySeconds(): number {
		return usageSnapshot().days[jstDayKey(Date.now())] || 0;
	}

	function assertAdvancesOnePerSecond(seconds: number) {
		expect(todaySeconds()).toBe(0);
		for (let i = 1; i <= seconds; i++) {
			vi.advanceTimersByTime(1000);
			expect(todaySeconds()).toBe(i);
		}
		expect(todaySeconds()).toBe(seconds);
	}

	it("starts at 0 on a fresh day and advances exactly 1 second per real second", () => {
		stop = startUsageTracker("account");
		assertAdvancesOnePerSecond(12);
	});

	it("does not speed up after start/cleanup/start (StrictMode)", () => {
		const first = startUsageTracker("account");
		expect(todaySeconds()).toBe(0);
		first();
		const again = startUsageTracker("account");
		const extra = startUsageTracker("account");
		stop = () => {
			extra();
			again();
		};
		assertAdvancesOnePerSecond(12);
	});
});
