import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { ListeningN2Content } from "../../app/routes/listening-n2";
import { resetStudyStateForTests, setLang } from "../../app/study/store";

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
	setLang("cn");
});

describe("ListeningN2Content", () => {
	it("shows original book scans instead of reconstructed lesson text", () => {
		render(<ListeningN2Content chapter={1} section={1} embedded />);

		expect(screen.getByRole("heading", { level: 1, name: /発音に関する聞き取り/ })).toBeInTheDocument();
		expect(screen.getByRole("img", { name: "N2 听解 p.12" })).toHaveAttribute("src", "/listening/n2/pages/012.jpg");
		expect(screen.getByRole("img", { name: "N2 听解 p.13" })).toHaveAttribute("src", "/listening/n2/pages/013.jpg");
		expect(screen.queryByText(/出题结构/)).not.toBeInTheDocument();
		expect(document.querySelector(".listening-lesson")).toBeNull();
		expect(screen.getByRole("button", { name: /CD 1 · 02/ })).toBeInTheDocument();
	});

	it("opens the Japanese スクリプト scan, not a typed transcript", async () => {
		const user = userEvent.setup();
		render(<ListeningN2Content chapter={1} section={1} embedded />);

		await user.click(screen.getByRole("button", { name: "答案・原文" }));
		expect(screen.getByRole("img", { name: "N2 听解 p.72" })).toHaveAttribute("src", "/listening/n2/pages/072.jpg");
		expect(screen.queryByRole("img", { name: "N2 听解 p.12" })).not.toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "译文" }));
		expect(screen.getByRole("img", { name: "N2 听解 p.73" })).toHaveAttribute("src", "/listening/n2/pages/073.jpg");
	});

	it("plays chapter 3 section 5 from CD 2", () => {
		render(<ListeningN2Content chapter={3} section={5} embedded />);
		expect(screen.getByRole("button", { name: /CD 2 · 01/ })).toBeInTheDocument();
		expect(document.querySelector("audio")).toHaveAttribute("src", "/audio/n2/cd2/CD02_01.mp3");
	});

	it("keeps 総まとめ 問題 V on the actual スクリプト pages starting at p.170", async () => {
		const user = userEvent.setup();
		render(<ListeningN2Content chapter={5} section={5} embedded />);

		await user.click(screen.getByRole("button", { name: "答案・原文" }));
		expect(screen.getByRole("img", { name: "N2 听解 p.170" })).toHaveAttribute("src", "/listening/n2/pages/170.jpg");
		expect(screen.getByRole("img", { name: "N2 听解 p.174" })).toBeInTheDocument();
		expect(screen.queryByRole("img", { name: "N2 听解 p.168" })).not.toBeInTheDocument();
	});
});
