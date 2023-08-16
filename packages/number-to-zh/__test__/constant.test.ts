import { describe, test } from "vitest";
import { RESOURCES } from "../src";

describe("constant", () => {
	test("RESOURCES", async ({ expect }) => {
		expect(RESOURCES).toMatchInlineSnapshot(`
			{
			  "zh-CN-lowercase": {
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
			    ],
			    "minusSign": "负",
			  },
			  "zh-CN-uppercase": {
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
			    "magnitudeList": [
			      "",
			      "万",
			      "亿",
			    ],
			    "minusSign": "负",
			  },
			  "zh-HK-lowercase": {
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
			    "decimalPoint": "點",
			    "digitsList": [
			      "",
			      "十",
			      "百",
			      "千",
			    ],
			    "magnitudeList": [
			      "",
			      "萬",
			      "億",
			      "兆",
			    ],
			    "minusSign": "負",
			  },
			  "zh-HK-uppercase": {
			    "baseNumerals": [
			      "零",
			      "壹",
			      "貳",
			      "參",
			      "肆",
			      "伍",
			      "陸",
			      "柒",
			      "捌",
			      "玖",
			    ],
			    "decimalPoint": "點",
			    "digitsList": [
			      "",
			      "拾",
			      "佰",
			      "仟",
			    ],
			    "magnitudeList": [
			      "",
			      "萬",
			      "億",
			      "兆",
			    ],
			    "minusSign": "負",
			  },
			  "zh-TW-lowercase": {
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
			    "decimalPoint": "點",
			    "digitsList": [
			      "",
			      "十",
			      "百",
			      "千",
			    ],
			    "magnitudeList": [
			      "",
			      "萬",
			      "億",
			      "兆",
			    ],
			    "minusSign": "負",
			  },
			  "zh-TW-uppercase": {
			    "baseNumerals": [
			      "零",
			      "壹",
			      "貳",
			      "參",
			      "肆",
			      "伍",
			      "陸",
			      "柒",
			      "捌",
			      "玖",
			    ],
			    "decimalPoint": "點",
			    "digitsList": [
			      "",
			      "拾",
			      "佰",
			      "仟",
			    ],
			    "magnitudeList": [
			      "",
			      "萬",
			      "億",
			      "兆",
			    ],
			    "minusSign": "負",
			  },
			}
		`);
	});
});
