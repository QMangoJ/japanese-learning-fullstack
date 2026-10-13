import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { QuizOpts } from "../../app/study/days";
import { OptButton } from "../../app/study/opt-button";
import { setLang } from "../../app/study/store";

const studyCss = readFileSync(resolve("public/study.css"), "utf8");
const motionCss = readFileSync(resolve("app/styles/motion.css"), "utf8");
const kanjiCss = readFileSync(resolve("app/routes/kanji-exam.css"), "utf8");

function cssRules(css: string) {
	const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, "");
	const rules: { selector: string; body: string }[] = [];
	const walk = (source: string) => {
		let i = 0;
		while (i < source.length) {
			while (i < source.length && /\s/.test(source[i])) i += 1;
			if (i >= source.length) break;
			const open = source.indexOf("{", i);
			if (open < 0) break;
			const selector = source.slice(i, open).trim();
			let depth = 1;
			let j = open + 1;
			while (j < source.length && depth > 0) {
				if (source[j] === "{") depth += 1;
				else if (source[j] === "}") depth -= 1;
				j += 1;
			}
			const inner = source.slice(open + 1, j - 1);
			if (selector.startsWith("@keyframes") || selector.startsWith("@font-face")) {
				// Keyframe steps are not element selectors.
			} else if (selector.startsWith("@")) walk(inner);
			else if (inner.includes("{")) walk(inner);
			else rules.push({ selector, body: inner });
			i = j;
		}
	};
	walk(cleaned);
	return rules;
}

function matches(element: Element, selector: string) {
	try {
		return element.matches(selector);
	} catch {
		return false;
	}
}

describe("OptButton labels", () => {
	it("keeps each option's text in the button and in .opt-label", async () => {
		setLang("cn");
		const user = userEvent.setup();
		render(
			<div className="opts qz">
				<OptButton className="opt-btn jp" idx={1} pressed={false} onPick={() => {}}>
					実戦
				</OptButton>
			</div>,
		);
		const alone = screen.getByRole("button", { name: "実戦" });
		expect(alone.querySelector(".opt-label")).toHaveTextContent("実戦");
		expect(alone.querySelector(".opt-ripples")).toHaveTextContent("");
		expect(alone.querySelector(".opt-ripples .opt-label")).toBeNull();

		render(
			<div className="q">
				<QuizOpts
					questionId="n2-kanji-d1"
					item={{ n: 1, q: "実戦問題", opts: ["実", "戦", "問", "題"] }}
					correct={1}
				/>
			</div>,
		);
		for (const [index, text] of ["実", "戦", "問", "題"].entries()) {
			const button = screen.getByRole("button", { name: `${index + 1} ${text}` });
			const label = button.querySelector(".opt-label");
			expect(label).toHaveTextContent(`${index + 1} ${text}`);
			expect(button.querySelector(".opt-ripples")).toHaveTextContent("");
			expect(button.contains(label)).toBe(true);
			expect(button.querySelector(".opt-ripples")?.contains(label)).toBe(false);
		}

		await user.click(screen.getByRole("button", { name: "2 戦" }));
		const wrong = screen.getByRole("button", { name: "2 戦" });
		const correct = screen.getByRole("button", { name: "1 実" });
		expect(wrong).toHaveClass("wrong");
		expect(correct).toHaveClass("correct");
		expect(wrong.querySelector(".opt-label")).toHaveTextContent("2 戦");
		expect(correct.querySelector(".opt-label")).toHaveTextContent("1 実");
		expect(correct.querySelector(".opt-label .hanamaru")).not.toBeNull();
		expect(correct.querySelector(".opt-ripples .hanamaru")).toBeNull();
		expect(document.querySelector(".qz-result .tick-text")).toHaveTextContent("答错了");
	});
});

describe("option label CSS", () => {
	it("keeps the legacy .opts span box rule off the ripple host and the label", () => {
		const host = document.createElement("div");
		host.innerHTML = `
			<div class="opts qz answered">
				<button class="opt-btn correct">
					<span class="opt-ripples"><span class="opt-ripple"></span></span>
					<span class="opt-label">1 実</span>
				</button>
			</div>
			<div class="opts"><span class="jp">1 食べ</span></div>
			<div class="fc-prog"><span class="tick-text">2 / 9</span></div>
			<div class="q"><span class="meta"><span class="tick-text">3</span></span></div>
			<div class="kreads"><span class="kread">音読み</span></div>
			<div class="vrow"><span class="gloss-anchor"><span class="gloss-pop"></span></span></div>
			<div class="kanji-exam-toolbar"><em><span class="tick-text">1/4</span></em><span>读音 · 4题</span></div>
			<div class="kanji-exam-result"><div><strong><span class="tick-text">80</span></strong><span>/ 100</span></div></div>
		`;
		const ripples = host.querySelector(".opt-ripples")!;
		const label = host.querySelector(".opt-label")!;
		const ripple = host.querySelector(".opt-ripple")!;
		const chip = host.querySelector(".opts:not(.qz) > span.jp")!;
		const studyRules = cssRules(studyCss);
		const motionRules = cssRules(motionCss);
		const kanjiRules = cssRules(kanjiCss);

		const spanRules = studyRules.filter((rule) =>
			rule.selector.split(",").some((part) => part.includes(".opts") && /\bspan\b/.test(part)),
		);
		expect(spanRules.length).toBeGreaterThan(0);
		const boxRules = spanRules.filter((rule) => /background\s*:/.test(rule.body) && /border\s*:/.test(rule.body) && /padding\s*:/.test(rule.body));
		expect(boxRules.length).toBeGreaterThan(0);

		for (const rule of spanRules) {
			for (const part of rule.selector.split(",")) {
				const selector = part.trim();
				if (!selector.includes(".opts") || !/\bspan\b/.test(selector)) continue;
				expect(selector).toContain(":not(.opt-ripples)");
				expect(selector).toContain(":not(.opt-label)");
				expect(matches(ripples, selector)).toBe(false);
				expect(matches(label, selector)).toBe(false);
				expect(matches(ripple, selector)).toBe(false);
				expect(matches(chip, selector)).toBe(true);
			}
		}

		const rippleHost = motionRules.filter((rule) => rule.selector.split(",").some((part) => part.trim() === ".opt-ripples"));
		expect(rippleHost.some((rule) => /background\s*:\s*(none|transparent)\b/.test(rule.body))).toBe(true);
		expect(rippleHost.some((rule) => /z-index\s*:\s*0\b/.test(rule.body))).toBe(true);
		expect(motionRules.some((rule) => rule.selector.includes(".opt-label") && /z-index\s*:\s*1\b/.test(rule.body))).toBe(true);
		expect(motionRules.find((rule) => rule.selector.trim() === ".opt-btn")?.body).toMatch(/isolation\s*:\s*isolate/);
		expect(motionRules.find((rule) => rule.selector.includes(".opt-btn.correct::before"))?.body).toMatch(/z-index\s*:\s*-1\b/);

		const correct = studyRules.find((rule) => rule.selector.trim() === ".qz.answered .opt-btn.correct");
		const wrong = studyRules.find((rule) => rule.selector.trim() === ".qz.answered .opt-btn.wrong");
		expect(correct?.body).toContain("color:var(--green)");
		expect(correct?.body).toContain("background:var(--green-soft)");
		expect(wrong?.body).toContain("color:var(--red)");
		expect(wrong?.body).toContain("background:var(--red-soft)");
		expect(studyCss).toMatch(/html\.theme-dark\{[^}]*--ink:/);
		expect(studyCss).toMatch(/html\.theme-dark\{[^}]*--green:/);
		expect(studyCss).toMatch(/html\.theme-dark\{[^}]*--red:/);

		for (const rule of motionRules) {
			if (!/opacity\s*:\s*0\s*!important/.test(rule.body)) continue;
			expect(rule.selector).not.toMatch(/\.opt-label\b/);
			expect(rule.selector).not.toMatch(/\.tick-text\b/);
			expect(rule.selector).not.toMatch(/\.gloss-pop__(read|mean|ex)\b/);
			expect(rule.selector).not.toMatch(/\.vjp-text\b/);
			expect(rule.selector).not.toMatch(/\.kread\b/);
		}

		const toolbar = host.querySelector(".kanji-exam-toolbar")!;
		const result = host.querySelector(".kanji-exam-result")!;
		const toolbarRule = kanjiRules.find((rule) => rule.selector.includes(".kanji-exam-toolbar") && rule.selector.includes("span"));
		const resultRule = kanjiRules.find((rule) => rule.selector.includes(".kanji-exam-result>div span"));
		expect(toolbarRule?.selector).toContain(":not(.tick-text)");
		expect(resultRule?.selector).toContain(":not(.tick-text)");
		expect(matches(toolbar.querySelector(".tick-text")!, toolbarRule!.selector)).toBe(false);
		expect(matches(toolbar.querySelector("span:not(.tick-text)")!, toolbarRule!.selector)).toBe(true);
		expect(matches(result.querySelector(".tick-text")!, resultRule!.selector)).toBe(false);
		expect(matches(result.querySelector("span:not(.tick-text)")!, resultRule!.selector)).toBe(true);
	});
});
