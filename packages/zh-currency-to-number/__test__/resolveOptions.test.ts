import { describe, test } from "vitest";
import { resolveOptions } from "../src";

describe(resolveOptions.name, () => {
	test("default", async ({ expect }) => {
		expect(resolveOptions({})).toMatchInlineSnapshot(`
			{
			  "CNYUnit": "圆",
			  "amountPrefix": "人民币",
			  "amountSuffix": "整",
			  "baseNumerals": [
			    "零",
			    "壹",
			    "贰",
			    "叁",
			    "肆",
			    "伍",
			    "陆",
			    "柒",
			    "捌",
			    "玖",
			  ],
			  "decimalPoint": "点",
			  "digitsList": [
			    "",
			    "拾",
			    "佰",
			    "仟",
			  ],
			  "fractionalCurrencyUnit": [
			    "角",
			    "分",
			  ],
			  "magnitudeList": [
			    "",
			    "万",
			    "亿",
			    "兆",
			  ],
			  "minusSign": "负",
			  "positive": "正",
			  "prefixSymbol": "¥",
			  "thousandsSeparator": false,
			}
		`);
	});
});
