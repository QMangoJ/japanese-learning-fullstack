export type SwipeGrade = "pass" | "fail" | "fuzzy";

/** Ignore sub-24px jitter so a tap is not graded as a flick. */
const MIN_FLICK = 24;
const DISTANCE = 100;
const SPEED = 0.5;

/** Right = pass, left = fail, up = fuzzy. Down snaps back. */
export function swipeDecision(dx: number, dy: number, dt: number): SwipeGrade | null {
	const ax = Math.abs(dx);
	const ay = Math.abs(dy);
	const travel = Math.hypot(dx, dy);
	const speed = travel / Math.max(dt, 1);
	const crossed = ax >= DISTANCE || ay >= DISTANCE || (speed > SPEED && travel >= MIN_FLICK);
	if (!crossed) return null;
	if (dy < 0 && ay > ax) return "fuzzy";
	if (dx > 0 && ax >= ay) return "pass";
	if (dx < 0 && ax >= ay) return "fail";
	return null;
}
