import { describe, test } from "vitest";
import { numberToZh, RESOURCES } from "../src";

const languages = Object.keys(RESOURCES) as Array<keyof typeof RESOURCES>;

describe(`${numberToZh.name} - CN`, () => {
	test(`${languages[0]}`, async ({ expect }) => {
		expect(numberToZh("0")).toBe("零");
		expect(numberToZh("+0")).toBe("零");
		expect(numberToZh("-0")).toBe("零");
		expect(numberToZh(0)).toBe("零");
		expect(numberToZh(+0)).toBe("零");
		expect(numberToZh(-0)).toBe("零");

		expect(numberToZh(-0)).toBe("零");

		expect(numberToZh(1)).toBe("一");
		expect(numberToZh(10)).toBe("一十");
		expect(numberToZh(20)).toBe("二十");
		expect(numberToZh(2200)).toBe("二千二百");
		expect(numberToZh(2200.099)).toBe("二千二百点零九九");
		expect(numberToZh(10_0001)).toBe("一十万零一");
		expect(numberToZh(10_0010_0001)).toBe("一十亿零一十万零一");
		expect(numberToZh(1234)).toBe("一千二百三十四");
		expect(numberToZh(1234_5678)).toBe("一千二百三十四万五千六百七十八");
		expect(numberToZh(1000_0001)).toBe("一千万零一");
		expect(numberToZh(1001_0001)).toBe("一千零一万零一");
		expect(numberToZh(1001_1001)).toBe("一千零一万一千零一");
		expect(numberToZh(1100_1001)).toBe("一千一百万一千零一");
		expect(numberToZh(1200_0000_1234)).toBe("一千二百亿一千二百三十四");

		expect(numberToZh(-0.1)).toBe("负零点一");
		expect(numberToZh(+0.1)).toBe("零点一");
		expect(numberToZh("-0.1")).toBe("负零点一");
		expect(numberToZh("-0.100000")).toBe("负零点一");
		expect(numberToZh(0.234343)).toBe("零点二三四三四三");
		expect(numberToZh(12.12)).toBe("一十二点一二");

		expect(numberToZh(-1e-3)).toBe("负零点零零一");
		expect(numberToZh(1.23456789e-12)).toBe("零点零零零零零零零零零零零一二三四五六七八九");
	});

	test(`${languages[1]}`, async ({ expect }) => {
		const options = { language: languages[1] };
		expect(numberToZh("0", options)).toBe("零");
		expect(numberToZh("+0", options)).toBe("零");
		expect(numberToZh("-0", options)).toBe("零");
		expect(numberToZh(0, options)).toBe("零");
		expect(numberToZh(+0, options)).toBe("零");
		expect(numberToZh(-0, options)).toBe("零");

		expect(numberToZh(1, options)).toBe("壹");
		expect(numberToZh(10, options)).toBe("壹拾");
		expect(numberToZh(20, options)).toBe("贰拾");
		expect(numberToZh(2200, options)).toBe("贰仟贰佰");
		expect(numberToZh(2200.099, options)).toBe("贰仟贰佰点零玖玖");
		expect(numberToZh(1234, options)).toBe("壹仟贰佰叁拾肆");
		expect(numberToZh(1234_5678, options)).toBe("壹仟贰佰叁拾肆万伍仟陆佰柒拾捌");
		expect(numberToZh(1000_0001, options)).toBe("壹仟万零壹");
		expect(numberToZh(1001_0001, options)).toBe("壹仟零壹万零壹");
		expect(numberToZh(1001_1001, options)).toBe("壹仟零壹万壹仟零壹");

		expect(numberToZh(-0.1, options)).toBe("负零点壹");
		expect(numberToZh(+0.1, options)).toBe("零点壹");
		expect(numberToZh("-0.1", options)).toBe("负零点壹");
		expect(numberToZh(0.234343, options)).toBe("零点贰叁肆叁肆叁");
		expect(numberToZh(12.12, options)).toBe("壹拾贰点壹贰");

		expect(numberToZh(-1e-3, options)).toBe("负零点零零壹");
		expect(numberToZh(1.23456789e-12, options)).toBe("零点零零零零零零零零零零零壹贰叁肆伍陆柒捌玖");
	});

	test(`resources`, async ({ expect }) => {
		const options = { language: languages[1], resources: RESOURCES };
		expect(numberToZh("0", options)).toBe("零");
		expect(numberToZh(1234, options)).toBe("壹仟贰佰叁拾肆");
		expect(numberToZh(1234_5678, options)).toBe("壹仟贰佰叁拾肆万伍仟陆佰柒拾捌");
		expect(numberToZh(1000_0001, options)).toBe("壹仟万零壹");
		expect(numberToZh(1001_0001, options)).toBe("壹仟零壹万零壹");
		expect(numberToZh(1001_1001, options)).toBe("壹仟零壹万壹仟零壹");
		expect(numberToZh(1.23456789e-12, options)).toBe("零点零零零零零零零零零零零壹贰叁肆伍陆柒捌玖");
	});

	test(`mismatch`, async ({ expect }) => {
		const options = { language: languages[1], resources: {} };
		expect(() => numberToZh("0", options)).toThrowErrorMatchingInlineSnapshot(
			'"language does not appear in resources"',
		);
	});
});

describe(`${numberToZh.name} - TW(HK)`, () => {
	test(`${numberToZh.name} - ${languages[2]}`, async ({ expect }) => {
		const options = { language: languages[2] };
		expect(numberToZh("0", options)).toBe("零");
		expect(numberToZh(10, options)).toBe("一十");
		expect(numberToZh(20, options)).toBe("二十");
		expect(numberToZh(2200, options)).toBe("二千二百");
		expect(numberToZh(2200.099, options)).toBe("二千二百點零九九");
		expect(numberToZh(1234, options)).toBe("一千二百三十四");
		expect(numberToZh(1234_5678, options)).toBe("一千二百三十四萬五千六百七十八");
		expect(numberToZh(1001_1001, options)).toBe("一千零一萬一千零一");
		expect(numberToZh(1.23456789e-12, options)).toBe("零點零零零零零零零零零零零一二三四五六七八九");
		expect(numberToZh(9000_0000_0001, options)).toBe("九千億零一");
		expect(numberToZh(5000_0000_0000_0001, options)).toBe("五千兆零一");
	});

	test(`${numberToZh.name} - ${languages[3]}`, async ({ expect }) => {
		const options = { language: languages[3] };
		expect(numberToZh("0", options)).toBe("零");
		expect(numberToZh(10, options)).toBe("壹拾");
		expect(numberToZh(20, options)).toBe("貳拾");
		expect(numberToZh(2200, options)).toBe("貳仟貳佰");
		expect(numberToZh(2200.099, options)).toBe("貳仟貳佰點零玖玖");
		expect(numberToZh(1234, options)).toBe("壹仟貳佰參拾肆");
		expect(numberToZh(1234_5678, options)).toBe("壹仟貳佰參拾肆萬伍仟陸佰柒拾捌");
		expect(numberToZh(1001_1001, options)).toBe("壹仟零壹萬壹仟零壹");
		expect(numberToZh(1.23456789e-12, options)).toBe("零點零零零零零零零零零零零壹貳參肆伍陸柒捌玖");
		expect(numberToZh(1.23456789e12, options)).toBe("壹兆貳仟參佰肆拾伍億陸仟柒佰捌拾玖萬");
	});
});

describe(`${numberToZh.name} - count unit exceeded`, () => {
	test(`need a larger magnitude`, async ({ expect }) => {
		expect(() => numberToZh(1.23456789e20)).toThrowErrorMatchingInlineSnapshot(
			'"整数部分超出能表示的最大计数单位，请设置更大的数级（magnitude）"',
		);
	});
	test(`provide a larger magnitude`, async ({ expect }) => {
		RESOURCES[languages[2]].magnitudeList.push("京");
		const options = {
			language: languages[2],
			resources: {
				[languages[2]]: RESOURCES[languages[2]],
			},
		};
		expect(numberToZh(1.23456789e16, options)).toBe("一京二千三百四十五兆六千七百八十九億");
	});
});

describe(`${numberToZh.name} - skipOneBeforeTen`, () => {
	test(`skipOneBeforeTen is false`, async ({ expect }) => {
		expect(numberToZh(10)).toBe("一十");
		expect(numberToZh(20)).toBe("二十");
		expect(numberToZh(10_0001)).toBe("一十万零一");
		expect(numberToZh(10_0101)).toBe("一十万零一百零一");
		expect(numberToZh(10_1001)).toBe("一十万一千零一");
		expect(numberToZh(10_1010)).toBe("一十万一千零一十");
	});

	test(`skipOneBeforeTen is true`, async ({ expect }) => {
		const options = { skipOneBeforeTen: true };
		expect(numberToZh(10, options)).toBe("十");
		expect(numberToZh(20, options)).toBe("二十");
		expect(numberToZh(10_0001, options)).toBe("十万零一");
		expect(numberToZh(10_0101, options)).toBe("十万零一百零一");
		expect(numberToZh(10_1001, options)).toBe("十万一千零一");
		expect(numberToZh(10_1010, options)).toBe("十万一千零一十");
	});
});
