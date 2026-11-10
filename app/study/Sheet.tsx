import * as stylex from "@stylexjs/stylex";
import { Theme } from "@astryxdesign/core/theme";
import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { SelectableCard } from "@astryxdesign/core/SelectableCard";
import { Grid } from "@astryxdesign/core/Grid";
import { VStack } from "@astryxdesign/core/VStack";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";
import "./astryx.css";
import {
	LEVEL,
	LEVEL_LIST,
	MODULE,
	THEME,
	hasContrast,
	isGram,
	lx,
	modLabel,
	navTo,
	type LevelKey,
} from "./store";

/* Astryx: the Sheet shell (mask / panel / grip) has no Astryx equivalent
 * that preserves this app's instant mount-unmount behavior (Astryx BottomSheet
 * animates), so the shell is hand-written in StyleX with the exact geometry of
 * the retired public/study.css .sheet-* rules. Everything inside the panel —
 * headings, tile grids, tiles — is Astryx components. The legacy class names
 * (sheet, sheet-item, sheet-sub, ...) stay on the elements as test hooks only;
 * they no longer carry any styles. */
const sheetStyles = stylex.create({
	mask: {
		position: "fixed",
		inset: 0,
		zIndex: 40,
		backgroundColor: "rgba(0,0,0,.42)",
	},
	panel: {
		position: "fixed",
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 41,
		backgroundColor: "var(--card)",
		borderTopWidth: 1,
		borderTopStyle: "solid",
		borderTopColor: "var(--line)",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		boxShadow: "0 -6px 24px rgba(0,0,0,.18)",
		paddingTop: 8,
		paddingBottom: "calc(14px + env(safe-area-inset-bottom))",
		paddingLeft: 14,
		paddingRight: 14,
		maxHeight: "76vh",
		overflowY: "auto",
	},
	grip: {
		width: 36,
		height: 4,
		borderRadius: 3,
		backgroundColor: "var(--line)",
		marginTop: 2,
		marginBottom: 10,
		marginLeft: "auto",
		marginRight: "auto",
	},
	sectionHead: {
		display: "flex",
		alignItems: "baseline",
		gap: 8,
		marginBottom: 10,
	},
	subHead: {
		marginTop: 14,
		marginBottom: 6,
	},
	grid: {
		marginBottom: 8,
	},
	tile: {
		height: "100%",
		minHeight: 60,
	},
	tileFeature: {
		minHeight: 72,
	},
	tileScoped: {
		borderStyle: "dashed",
	},
	icon: {
		fontSize: 24,
		lineHeight: 1,
	},
	iconFeature: {
		fontSize: 26,
		lineHeight: 1,
	},
});

/** stylex.props() plus a legacy hook class on plain elements. */
function sxProps(hook: string, st: stylex.StyleXStyles) {
	const p = stylex.props(st);
	return { ...p, className: p.className ? `${hook} ${p.className}` : hook };
}

function SheetSectionHead({ title, sub }: { title: string; sub?: string }) {
	return (
		<div {...sxProps("sheet-h", sheetStyles.sectionHead)}>
			<Heading level={3}>{title}</Heading>
			{sub ? <Text type="supporting">{sub}</Text> : null}
		</div>
	);
}

function SheetSubHead({ label }: { label: string }) {
	return (
		<div {...sxProps("sheet-sub", sheetStyles.subHead)}>
			<Text type="label" weight="semibold" color="secondary" display="block">
				{label}
			</Text>
		</div>
	);
}

function SheetTile({
	icon,
	label,
	onGo,
	feature,
	scoped,
	dataSheet,
}: {
	icon: string;
	label: string;
	onGo: () => void;
	feature?: boolean;
	scoped?: boolean;
	dataSheet?: string;
}) {
	return (
		<ClickableCard
			label={label}
			onClick={onGo}
			padding={2}
			className={feature ? "sheet-item sheet-item--feature" : "sheet-item"}
			xstyle={[sheetStyles.tile, feature ? sheetStyles.tileFeature : null, scoped ? sheetStyles.tileScoped : null]}
			data-sheet={dataSheet}
		>
			<VStack gap={1} hAlign="center">
				<span {...stylex.props(feature ? sheetStyles.iconFeature : sheetStyles.icon)}>{icon}</span>
				<Text type="body" size={feature ? "lg" : undefined} weight={feature ? "bold" : "normal"}>
					{label}
				</Text>
			</VStack>
		</ClickableCard>
	);
}

export function Sheet({
	kind,
	onClose,
	onLevel,
}: {
	kind: "level" | "common" | null;
	onClose: () => void;
	onLevel: (lv: LevelKey) => void;
}) {
	if (!kind) return null;
	const levelSubs: Record<string, [string, string]> = { 基础: ["基础", "Foundation"], 进阶: ["进阶", "Intermediate"], 高阶: ["高阶", "Advanced"], 顶级: ["顶级", "Expert"] };
	const go = (hash: string) => () => {
		onClose();
		navTo(hash);
	};
	return (
		<Theme theme={neutralTheme} mode={THEME === "dark" ? "dark" : "light"}>
			<div className="astryx-scope">
				<div id="sheetMask" onClick={onClose} {...sxProps("sheet-mask", sheetStyles.mask)} />
				<div id="sheet" role="dialog" aria-modal="true" {...sxProps("sheet", sheetStyles.panel)}>
					<div {...sxProps("sheet-grip", sheetStyles.grip)} />
					{kind === "level" ? (
						<>
							<SheetSectionHead title={lx("选择级别", "Choose a level")} sub={`${lx("当前", "Current")} · ${modLabel()}`} />
							<Grid columns={4} gap={2} xstyle={sheetStyles.grid}>
								{LEVEL_LIST.map(([lv, name, sub]) => (
									<SelectableCard
										key={lv}
										label={name}
										isSelected={lv === LEVEL}
										onChange={() => onLevel(lv)}
										padding={3}
										className={`sheet-item ${lv === LEVEL ? "on" : ""}`}
										xstyle={sheetStyles.tile}
									>
										<VStack gap={1} hAlign="center">
											<Text type="body" size="xl" weight="bold">
												{name}
											</Text>
											<Text type="supporting">{lx(...levelSubs[sub])}</Text>
										</VStack>
									</SelectableCard>
								))}
							</Grid>
						</>
					) : (
						<>
							<SheetSectionHead title={lx("基础知识", "Foundations")} sub={lx("按级别", "By level")} />
							<Grid columns={3} gap={2} xstyle={sheetStyles.grid}>
								<SheetTile feature icon="🗓️" label={lx("课堂复习", "Lesson review")} onGo={go("#/review")} />
								<SheetTile feature icon="🈶" label={lx("汉字自测", "Kanji Self-test")} onGo={go("#/kanji-exam")} />
								<SheetTile feature icon="⏱️" label={lx("使用时间", "Study time")} onGo={go("#/usage")} dataSheet="usage" />
							</Grid>
							<SheetSectionHead title={lx("专题知识", "Topics")} sub={lx("不分级别", "All levels")} />
							<SheetSubHead label={lx("工作面试", "Work & interviews")} />
							<Grid columns={3} gap={2} xstyle={sheetStyles.grid}>
								<SheetTile icon="💻" label={lx("IT 听力", "IT Listening")} onGo={go("#/it-listening")} />
								<SheetTile icon="🎤" label={lx("日语面试", "Job interview")} onGo={go("#/topics/job-interview")} />
								<SheetTile icon="🖥️" label={lx("前端工程师", "Frontend engineer")} onGo={go("#/topics/frontend")} />
								<SheetTile icon="🙏" label={lx("敬语总结", "Keigo summary")} onGo={go("#/keigo")} />
							</Grid>
							<SheetSubHead label={lx("生活", "Daily life")} />
							<Grid columns={3} gap={2} xstyle={sheetStyles.grid}>
								<SheetTile icon="🏧" label={lx("银行 ATM", "Bank ATM")} onGo={go("#/topics/bank-atm")} />
								<SheetTile icon="🛍️" label={lx("逛街买衣服", "Clothes shopping")} onGo={go("#/topics/clothes-shopping")} />
								<SheetTile icon="☕" label={lx("咖啡店菜单", "Cafe menu")} onGo={go("#/topics/cafe-menu")} />
								<SheetTile icon="👕" label={lx("穿衣穿戴", "Wearing")} onGo={go("#/wearing")} />
							</Grid>
							<SheetSubHead label={lx("投资理财", "Investing & finance")} />
							<Grid columns={3} gap={2} xstyle={sheetStyles.grid}>
								<SheetTile icon="📈" label={lx("日本投资理财", "Investing in Japan")} onGo={go("#/topics/japan-investing")} />
							</Grid>
							<SheetSubHead label={lx("通用", "General")} />
							<Grid columns={3} gap={2} xstyle={sheetStyles.grid}>
								<SheetTile icon="📖" label={lx("接续表", "Connections")} onGo={go("#/ref")} />
								<SheetTile icon="🔄" label={lx("活用", "Conjugation")} onGo={go("#/katsuyou")} />
								<SheetTile icon="✍️" label={lx("变形口诀", "Verb mnemonics")} onGo={go("#/henkei")} />
								<SheetTile icon="🔤" label={lx("变形总结", "Verb summary")} onGo={go("#/verb-summary")} />
								<SheetTile icon="↔️" label={lx("自他动词", "Verb pairs")} onGo={go("#/jita")} />
								<SheetTile icon="🔢" label={lx("数字", "Numbers")} onGo={go("#/numbers")} />
								<SheetTile icon="💬" label={lx("口语", "Casual")} onGo={go("#/kougo")} />
							</Grid>
							<SheetSectionHead title={lx("本模块", "This module")} sub={modLabel()} />
							<Grid columns={3} gap={2} xstyle={sheetStyles.grid}>
								<SheetTile scoped icon="🗂️" label={lx("记忆卡", "Flashcards")} onGo={go("#/cards")} />
								{isGram() && hasContrast(MODULE) ? (
									<SheetTile scoped icon="🔀" label={`${LEVEL.toUpperCase()} ${lx("辨析", "Contrast")}`} onGo={go("#/contrast")} />
								) : null}
							</Grid>
						</>
					)}
				</div>
			</div>
		</Theme>
	);
}
