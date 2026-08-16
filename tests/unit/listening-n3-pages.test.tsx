import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { ListeningN3Content } from "../../app/routes/listening-n3";
import { resetStudyStateForTests } from "../../app/study/store";

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
});

describe("ListeningN3Content", () => {
	it("reconstructs the book lesson instead of showing a PDF page scan", async () => {
		const user = userEvent.setup();
		render(<ListeningN3Content chapter={2} section={1} embedded />);

		expect(screen.getByRole("heading", { level: 1, name: /何と言いますか/ })).toBeInTheDocument();
		expect(screen.getByText("出题结构")).toBeInTheDocument();
		expect(screen.getByText(/イラストから場面を想像し/)).toBeInTheDocument();
		expect(screen.getByText(/通过插图想像场景/)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /CD 1 · 19/ })).toBeInTheDocument();
		expect(screen.queryByAltText(/原书第 24 页/)).not.toBeInTheDocument();

		await user.click(screen.getByText("答え"));
		expect(screen.getByText(/1番：2/)).toBeInTheDocument();
	});
});
