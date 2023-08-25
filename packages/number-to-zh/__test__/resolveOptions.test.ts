import { describe, test } from "vitest";
import { resolveOptions } from "../src";

describe(resolveOptions.name, () => {
	test("default", async ({ expect }) => {
		expect(resolveOptions({})).toMatchInlineSnapshot(`
			{
			  "baseNumerals": [
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
			  ],
			  "decimalPoint": "点",
			  "digitsAboveTenThousand": 8,
			  "digitsList": [
			    "",
			    "十",
			    "百",
			    "千",
			  ],
			  "magnitudeList": [
			    "",
			    "万",
			    "亿",
			    "兆",
			  ],
			  "minusSign": "负",
			  "repeatChar": "WW",
			  "skipOneBeforeTen": false,
			}
		`);
	});
});
