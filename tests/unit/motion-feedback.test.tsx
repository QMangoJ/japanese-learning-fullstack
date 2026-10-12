import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AnswerFeedback } from "../../app/study/answer-feedback";
import { StudyFlip } from "../../app/study/study-flip";
import { swipeDecision } from "../../app/study/swipe-grade";
import { getToasts, pushToast, resetToastsForTests } from "../../app/study/toast";
import { ToastStack } from "../../app/study/toast-stack";

afterEach(() => {
	resetToastsForTests();
	vi.useRealTimers();
});

describe("swipeDecision", () => {
	it("grades a long right, left, and up drag", () => {
		expect(swipeDecision(140, 10, 200)).toBe("pass");
		expect(swipeDecision(-140, 12, 200)).toBe("fail");
		expect(swipeDecision(10, -140, 200)).toBe("fuzzy");
	});

	it("snaps back when the drag is short or downward", () => {
		expect(swipeDecision(20, 0, 200)).toBeNull();
		expect(swipeDecision(8, 130, 80)).toBeNull();
	});

	it("treats a quick flick as a grade", () => {
		expect(swipeDecision(36, 4, 40)).toBe("pass");
	});
});

describe("StudyFlip", () => {
	it("keeps the back face out of the document until flipped", () => {
		const onFlip = vi.fn();
		const { rerender } = render(
			<StudyFlip flipped={false} onFlip={onFlip} front={<div>表面</div>} back={<div className="review-reading">かな</div>} />,
		);
		expect(document.querySelector(".review-reading")).toBeNull();
		fireEvent.click(screen.getByText("表面"));
		expect(onFlip).toHaveBeenCalledOnce();
		rerender(<StudyFlip flipped onFlip={onFlip} front={<div>表面</div>} back={<div className="review-reading">かな</div>} />);
		expect(document.querySelector(".review-reading")?.textContent).toBe("かな");
	});

	it("grades a right swipe and ignores a short drag click", () => {
		vi.useFakeTimers();
		const onFlip = vi.fn();
		const onGrade = vi.fn();
		const onSwipe = vi.fn();
		render(
			<StudyFlip
				flipped={false}
				onFlip={onFlip}
				onGrade={onGrade}
				onSwipe={onSwipe}
				front={<div>表面</div>}
				back={<div>背面</div>}
			/>,
		);
		const card = document.querySelector(".fcard")!;
		fireEvent.pointerDown(card, { pointerId: 1, clientX: 0, clientY: 0, button: 0 });
		fireEvent.pointerMove(card, { pointerId: 1, clientX: 20, clientY: 0 });
		fireEvent.pointerUp(card, { pointerId: 1, clientX: 20, clientY: 0 });
		fireEvent.click(card);
		expect(onSwipe).not.toHaveBeenCalled();
		expect(onFlip).not.toHaveBeenCalled();

		fireEvent.pointerDown(card, { pointerId: 2, clientX: 0, clientY: 0, button: 0 });
		fireEvent.pointerMove(card, { pointerId: 2, clientX: 140, clientY: 8 });
		fireEvent.pointerUp(card, { pointerId: 2, clientX: 140, clientY: 8 });
		expect(onSwipe).not.toHaveBeenCalled();
		vi.advanceTimersByTime(250);
		expect(onSwipe).toHaveBeenCalledWith("pass");
		expect(onGrade).not.toHaveBeenCalled();
	});

	it("uses 1 2 3 as the button grades", () => {
		const onGrade = vi.fn();
		const onSwipe = vi.fn();
		render(
			<StudyFlip flipped={false} onFlip={() => {}} onGrade={onGrade} onSwipe={onSwipe} front={<div>表面</div>} back={<div>背面</div>} />,
		);
		fireEvent.keyDown(window, { key: "2" });
		expect(onGrade).toHaveBeenCalledWith("fuzzy");
		expect(onSwipe).not.toHaveBeenCalled();
	});
});

describe("AnswerFeedback", () => {
	it("stamps a correct answer with a hanamaru and leaves a wrong answer bare", () => {
		const { rerender } = render(
			<AnswerFeedback verdict="correct">
				<span>对</span>
			</AnswerFeedback>,
		);
		expect(document.querySelector(".hanamaru")).not.toBeNull();
		rerender(
			<AnswerFeedback verdict="wrong">
				<span>错</span>
			</AnswerFeedback>,
		);
		expect(document.querySelector(".hanamaru")).toBeNull();
		expect(screen.getByText("错")).toBeInTheDocument();
	});
});

describe("ToastStack", () => {
	it("keeps at most three toasts", () => {
		render(<ToastStack />);
		act(() => {
			pushToast("一");
			pushToast("二");
			pushToast("三");
			pushToast("四");
		});
		expect(getToasts().map((toast) => toast.text)).toEqual(["二", "三", "四"]);
		expect(screen.getByText("四")).toBeInTheDocument();
		expect(screen.queryByText("一")).not.toBeInTheDocument();
	});
});
