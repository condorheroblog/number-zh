import { describe, test } from "vitest";
import { DIGITS_LIST, MAGNITUDE_LIST, MINUS_SIGN, DECIMAL_POINT, LOWERCASE_CHINESE_NUMERALS } from "../src";

describe("constant", () => {
	test("MINUS_SIGN", async ({ expect }) => {
		expect(MINUS_SIGN).toMatchInlineSnapshot('"负"');
	});

	test("DECIMAL_POINT", async ({ expect }) => {
		expect(DECIMAL_POINT).toMatchInlineSnapshot('"点"');
	});

	test("DIGITS_LIST", async ({ expect }) => {
		expect(DIGITS_LIST).toMatchInlineSnapshot(`
			[
			  "",
			  "十",
			  "百",
			  "千",
			]
		`);
	});

	test("MAGNITUDE_LIST", async ({ expect }) => {
		expect(MAGNITUDE_LIST).toMatchInlineSnapshot(`
			[
			  "",
			  "万",
			  "亿",
			]
		`);
	});

	test("LOWERCASE_CHINESE_NUMERALS", async ({ expect }) => {
		expect(LOWERCASE_CHINESE_NUMERALS).toMatchInlineSnapshot(`
			[
			  "零",
			  "一",
			  "二",
			  "三",
			  "四",
			  "五",
			  "六",
			  "七",
			  "八",
			  "九",
			]
		`);
	});
});
