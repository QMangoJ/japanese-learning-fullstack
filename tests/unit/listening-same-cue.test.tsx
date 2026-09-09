import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { ListeningN3Content } from "../../app/routes/listening-n3";
import { ListeningN2Content } from "../../app/routes/listening-n2";
import { resetStudyStateForTests } from "../../app/study/store";

beforeEach(() => {
	localStorage.clear(); resetStudyStateForTests();
	vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
});
afterEach(() => vi.restoreAllMocks());

it.each(["N2", "N3"])("%s preserves loaded duration when clicking the current question cue", async (level) => {
	const user = userEvent.setup();
	render(level === "N2" ? <ListeningN2Content chapter={1} section={1} embedded /> : <ListeningN3Content chapter={1} section={5} embedded />);
	const audio = document.querySelector("audio")!;
	const track = Number(audio.getAttribute("src")!.match(/_(\d+)\.mp3/)![1]);
	Object.defineProperty(audio, "duration", { configurable: true, value: 60 });
	fireEvent.loadedMetadata(audio);
	const duration = document.querySelector(".listening-player__timeline")!.lastElementChild!;
	expect(duration).toHaveTextContent("1:00");
	await user.click(screen.getAllByRole("button", { name: new RegExp(`^CD 1 · 0?${track}\\b`) })[0]);
	expect(duration).toHaveTextContent("1:00");
});
