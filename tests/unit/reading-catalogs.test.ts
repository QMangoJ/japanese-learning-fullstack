import { describe, expect, it } from "vitest";

import {
	readingN1CatalogDays,
	readingN1CatalogWeeks,
	readingN2CatalogDays,
	readingN2CatalogWeeks,
	readingN3CatalogDays,
	readingN3CatalogWeeks,
} from "../../app/data/reading-catalogs";
import { dayOutline as n1Days, weekOutline as n1Weeks } from "../../app/data/reading-n1";
import { dayOutline as n2Days, weekOutline as n2Weeks } from "../../app/data/reading-n2";
import { dayOutline as n3Days, weekOutline as n3Weeks } from "../../app/data/reading-n3";

const weekShape = (weeks: readonly { week: number; title: string; titleCn: string; titleEn: string; printedStart: number }[]) =>
	weeks.map(({ week, title, titleCn, titleEn, printedStart }) => ({ week, title, titleCn, titleEn, printedStart }));

describe("lightweight reading catalogs", () => {
	it("stay aligned with the full N3 reading source", () => {
		expect(readingN3CatalogDays).toEqual(n3Days);
		expect(readingN3CatalogWeeks).toEqual(weekShape(n3Weeks));
	});

	it("stay aligned with the full N2 reading source", () => {
		expect(readingN2CatalogDays).toEqual(n2Days);
		expect(readingN2CatalogWeeks).toEqual(weekShape(n2Weeks));
	});

	it("stay aligned with the full N1 reading source", () => {
		expect(readingN1CatalogDays).toEqual(n1Days);
		expect(readingN1CatalogWeeks).toEqual(weekShape(n1Weeks));
	});
});
