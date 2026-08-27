import { describe, expect, it } from "vitest";

import { selectionPopoverPosition } from "../../app/study/selection-popover-position";

const rect = { left: 90, top: 420, bottom: 446, width: 120 };

describe("selection popover positioning", () => {
	it("leaves room above the selection for the mobile system menu", () => {
		const desktop = selectionPopoverPosition({ rect, viewportWidth: 390, viewportHeight: 844, mobile: false });
		const mobile = selectionPopoverPosition({ rect, viewportWidth: 390, viewportHeight: 844, mobile: true });

		expect(desktop.top).toBe(250);
		expect(mobile.top).toBe(194);
		expect(desktop.top - mobile.top).toBe(56);
	});

	it("keeps the panel inside the viewport when there is not enough room above", () => {
		const position = selectionPopoverPosition({
			rect: { left: 20, top: 120, bottom: 146, width: 80 },
			viewportWidth: 390,
			viewportHeight: 844,
			mobile: true,
		});

		expect(position).toEqual({ left: 12, top: 156 });
	});

	it("keeps the full panel inside the right edge on a narrow screen", () => {
		const position = selectionPopoverPosition({
			rect: { left: 330, top: 420, bottom: 446, width: 50 },
			viewportWidth: 390,
			viewportHeight: 844,
			mobile: true,
		});

		expect(position.left).toBe(92);
	});
});
