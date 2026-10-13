import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { GlossPopover, rubyReading } from "../../app/study/gloss-popover";
import { OptButton } from "../../app/study/opt-button";
import { bindPointerTilt } from "../../app/study/pointer-tilt";
import { CountPair, TickText } from "../../app/study/tick-text";

const rect = {
	x: 0,
	y: 0,
	left: 0,
	top: 0,
	right: 200,
	bottom: 80,
	width: 200,
	height: 80,
	toJSON() {
		return {};
	},
} as DOMRect;

function installMedia(reduced: boolean, fine: boolean) {
	Object.defineProperty(window, "matchMedia", {
		configurable: true,
		writable: true,
		value: (query: string) => ({
			matches: query.includes("prefers-reduced-motion") ? reduced : query.includes("hover: hover") ? fine : false,
			media: query,
			onchange: null,
			addEventListener() {},
			removeEventListener() {},
			addListener() {},
			removeListener() {},
			dispatchEvent() {
				return false;
			},
		}),
	});
}

function RippleButton({ answered = false }: { answered?: boolean }) {
	const button = (
		<OptButton className="opt-btn" idx={1} pressed={false} onPick={() => {}}>
			選択肢
		</OptButton>
	);
	return answered ? <div className="qz answered">{button}</div> : button;
}

afterEach(() => {
	vi.restoreAllMocks();
});

describe("rubyReading", () => {
	it("replaces each kanji run with the reading stored in rt", () => {
		expect(rubyReading("<ruby>静<rt>しず</rt></ruby>まる")).toBe("しずまる");
		expect(rubyReading("アパート")).toBe("");
	});
});

describe("pointer tilt", () => {
	it("writes clamped tilt variables for a fine pointer", () => {
		installMedia(false, true);
		vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(rect);
		vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
			callback(0);
			return 1;
		});
		const stop = bindPointerTilt(document);
		render(<div className="tilt-card">文法</div>);
		const card = document.querySelector(".tilt-card") as HTMLElement;
		fireEvent.pointerMove(card, { clientX: 1000, clientY: 10, pointerType: "mouse" });
		expect(card.style.getPropertyValue("--mx")).not.toBe("");
		expect(Math.abs(parseFloat(card.style.getPropertyValue("--tilt-x")))).toBeLessThanOrEqual(3);
		expect(card.style.getPropertyValue("--tilt-y")).toBe("3.00deg");
		stop();
	});

	it("disables tilt and tap lift when reduced motion is on", () => {
		installMedia(true, false);
		const stop = bindPointerTilt(document);
		render(<div className="tilt-card">文法</div>);
		const card = document.querySelector(".tilt-card") as HTMLElement;
		fireEvent.pointerMove(card, { clientX: 40, clientY: 20, pointerType: "mouse" });
		fireEvent.pointerDown(card, { pointerId: 1, clientX: 10, clientY: 10, pointerType: "touch" });
		fireEvent.pointerUp(card, { pointerId: 1, clientX: 12, clientY: 10, pointerType: "touch" });
		expect(card.style.getPropertyValue("--tilt-y")).toBe("");
		expect(card.classList.contains("is-lit")).toBe(false);
		stop();
	});

	it("lifts a card on tap and ignores a scroll", () => {
		installMedia(false, false);
		const stop = bindPointerTilt(document);
		render(<div className="tilt-card">単語</div>);
		const card = document.querySelector(".tilt-card") as HTMLElement;
		fireEvent.pointerDown(card, { pointerId: 1, clientX: 8, clientY: 8, pointerType: "touch" });
		fireEvent.pointerUp(card, { pointerId: 1, clientX: 40, clientY: 8, pointerType: "touch" });
		expect(card.classList.contains("is-lit")).toBe(false);
		fireEvent.pointerDown(card, { pointerId: 2, clientX: 8, clientY: 8, pointerType: "touch" });
		fireEvent.pointerUp(card, { pointerId: 2, clientX: 10, clientY: 9, pointerType: "touch" });
		expect(card).toHaveClass("is-lit");
		stop();
	});
});

describe("GlossPopover", () => {
	it("opens on tap and closes on Esc", () => {
		installMedia(false, false);
		render(
			<GlossPopover reading="よみ" meaning="意思" example="例文です">
				<span>単語</span>
			</GlossPopover>,
		);
		expect(screen.queryByRole("tooltip")).toBeNull();
		fireEvent.pointerDown(screen.getByText("単語"), { pointerType: "touch", pointerId: 1, button: 0 });
		fireEvent.click(screen.getByText("単語"));
		const tip = screen.getByRole("tooltip");
		expect(tip).toHaveTextContent("よみ");
		expect(tip).toHaveTextContent("意思");
		expect(tip).toHaveTextContent("例文です");
		fireEvent.keyDown(document, { key: "Escape" });
		expect(screen.queryByRole("tooltip")).toBeNull();
	});

	it("closes on an outside press and still lets the other control receive the click", () => {
		installMedia(false, false);
		const onOther = vi.fn();
		render(
			<div>
				<GlossPopover reading="よみ" meaning="意思">
					<span>単語</span>
				</GlossPopover>
				<button type="button" onClick={onOther}>
					朗读
				</button>
			</div>,
		);
		fireEvent.click(screen.getByText("単語"));
		expect(screen.getByRole("tooltip")).toHaveClass("gloss-pop");
		fireEvent.click(screen.getByRole("button", { name: "朗读" }));
		expect(onOther).toHaveBeenCalledOnce();
		fireEvent.pointerDown(screen.getByRole("button", { name: "朗读" }));
		expect(screen.queryByRole("tooltip")).toBeNull();
	});

	it("stays closed when the item has no reading, meaning, or example", () => {
		render(
			<GlossPopover>
				<span>だけ</span>
			</GlossPopover>,
		);
		fireEvent.click(screen.getByText("だけ"));
		expect(screen.queryByRole("tooltip")).toBeNull();
		expect(document.querySelector(".gloss-anchor")).toBeNull();
	});

	it("opens on keyboard focus and closes when focus leaves", () => {
		installMedia(false, true);
		render(
			<GlossPopover reading="よみ" meaning="意思">
				<span>単語</span>
			</GlossPopover>,
		);
		const anchor = document.querySelector(".gloss-anchor") as HTMLElement;
		act(() => anchor.focus());
		expect(screen.getByRole("tooltip")).toHaveTextContent("意思");
		act(() => anchor.blur());
		expect(screen.queryByRole("tooltip")).toBeNull();
	});

	it("still opens when reduced motion is on", () => {
		installMedia(true, false);
		render(
			<GlossPopover meaning="意思">
				<span>単語</span>
			</GlossPopover>,
		);
		fireEvent.click(screen.getByText("単語"));
		expect(screen.getByRole("tooltip")).toHaveTextContent("意思");
	});
});

describe("TickText", () => {
	it("renders the new value when the number changes", () => {
		const { rerender } = render(<TickText value={1} />);
		expect(screen.getByText("1")).toHaveClass("tick-text");
		rerender(<TickText value={4} />);
		expect(screen.getByText("4")).toBeInTheDocument();
		expect(screen.queryByText("1")).not.toBeInTheDocument();
		rerender(<CountPair current={2} total={9} />);
		expect(screen.getByText("2 / 9")).toHaveClass("tick-text");
	});
});

describe("option ripple", () => {
	it("places a ripple from the pointer and skips it for reduced motion or an answered quiz", () => {
		installMedia(false, true);
		vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(rect);
		vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
			callback(0);
			return 1;
		});
		const { rerender } = render(<RippleButton />);
		const button = screen.getByRole("button", { name: "選択肢" });
		fireEvent.pointerDown(button, { button: 0, clientX: 30, clientY: 12, pointerId: 1 });
		const ripple = button.querySelector(".opt-ripple") as HTMLElement;
		expect(ripple).not.toBeNull();
		expect(ripple.style.getPropertyValue("--rx")).toBe("30px");
		expect(ripple.style.getPropertyValue("--ry")).toBe("12px");
		expect(ripple.classList.contains("is-on")).toBe(true);

		installMedia(true, true);
		rerender(<RippleButton />);
		const again = screen.getByRole("button", { name: "選択肢" });
		again.querySelector(".opt-ripple")?.remove();
		fireEvent.pointerDown(again, { button: 0, clientX: 30, clientY: 12, pointerId: 1 });
		expect(again.querySelector(".opt-ripple")).toBeNull();

		installMedia(false, true);
		rerender(<RippleButton answered />);
		const answered = screen.getByRole("button", { name: "選択肢" });
		fireEvent.pointerDown(answered, { button: 0, clientX: 30, clientY: 12, pointerId: 1 });
		expect(answered.querySelector(".opt-ripple")).toBeNull();
	});
});
