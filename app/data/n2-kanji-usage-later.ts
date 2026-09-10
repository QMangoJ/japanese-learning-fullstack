import type { UsageSpec } from "./n2-kanji-usage";
import { N2_KANJI_USAGE_W3 } from "./n2-kanji-usage-w3";
import { N2_KANJI_USAGE_W4 } from "./n2-kanji-usage-w4";
import { N2_KANJI_USAGE_W5 } from "./n2-kanji-usage-w5";
import { N2_KANJI_USAGE_W6 } from "./n2-kanji-usage-w6";
import { N2_KANJI_USAGE_W7 } from "./n2-kanji-usage-w7";
import { N2_KANJI_USAGE_W8 } from "./n2-kanji-usage-w8";

export const N2_KANJI_USAGE_LATER: Record<string, UsageSpec> = {
	...N2_KANJI_USAGE_W3,
	...N2_KANJI_USAGE_W4,
	...N2_KANJI_USAGE_W5,
	...N2_KANJI_USAGE_W6,
	...N2_KANJI_USAGE_W7,
	...N2_KANJI_USAGE_W8,
};
