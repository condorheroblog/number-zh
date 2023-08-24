import { describe, test } from "vitest";
import { zhToNumber } from "../src";

describe(`${zhToNumber.name} irregular character`, () => {
	test("input a object", async ({ expect }) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(() => zhToNumber({})).toThrowErrorMatchingInlineSnapshot('"请提供一个字符串"');
	});
	test("return a NaN", async ({ expect }) => {
		expect(zhToNumber("哈哈哈")).toBe(NaN);
	});
});

describe(`${zhToNumber.name} regular character`, () => {
	test(`main`, async ({ expect }) => {
		expect(zhToNumber("负零")).toBe("0");
		expect(zhToNumber("正零")).toBe("0");
		expect(zhToNumber("零")).toBe("0");
		expect(zhToNumber("零点")).toBe("0");
		expect(zhToNumber("零点")).toBe("0");
		expect(zhToNumber("一")).toBe("1");
		expect(zhToNumber("十")).toBe("10");
		expect(zhToNumber("十一")).toBe("11");
		expect(zhToNumber("一十一")).toBe("11");
		expect(zhToNumber("一十二点一二")).toBe("12.12");
		expect(zhToNumber("二十")).toBe("20");
		expect(zhToNumber("二十一")).toBe("21");
		expect(zhToNumber("一百")).toBe("100");
		expect(zhToNumber("一百零一")).toBe("101");
		expect(zhToNumber("一百一十")).toBe("110");
		expect(zhToNumber("一百一十一")).toBe("111");
		expect(zhToNumber("一千")).toBe("1000");
		expect(zhToNumber("一千一百")).toBe("1100");
		expect(zhToNumber("一千一百一十")).toBe("1110");
		expect(zhToNumber("一千一百一十一")).toBe("1111");
		expect(zhToNumber("一千零一十")).toBe("1010");
		expect(zhToNumber("一千零一十一")).toBe("1011");
		expect(zhToNumber("一千零一")).toBe("1001");
		expect(zhToNumber("一千一百零一")).toBe("1101");
		expect(zhToNumber("二千二百")).toBe("2200");
		expect(zhToNumber("二千二百点零九九")).toBe("2200.099");
		expect(zhToNumber("一千二百三十四")).toBe("1234");
		expect(zhToNumber("一万一千一百一十一")).toBe("11111");
		expect(zhToNumber("一十一万一千一百一十一")).toBe("111111");
		expect(zhToNumber("一百一十一万一千一百一十一")).toBe("1111111");
		expect(zhToNumber("一千一百一十一万一千一百一十一")).toBe("11111111");
		expect(zhToNumber("一亿一千一百一十一万一千一百一十一")).toBe("111111111");
		expect(zhToNumber("一十一亿一千一百一十一万一千一百一十一")).toBe("1111111111");
		expect(zhToNumber("一百一十一亿一千一百一十一万一千一百一十一")).toBe("11111111111");
		expect(zhToNumber("一千一百一十一亿一千一百一十一万一千一百一十一")).toBe("111111111111");
		expect(zhToNumber("十万")).toBe("100000");
		expect(zhToNumber("十万零一")).toBe("100001");
		expect(zhToNumber("一万零一")).toBe("10001");
		expect(zhToNumber("一万零一十一")).toBe("10011");
		expect(zhToNumber("一万零一百一十一")).toBe("10111");
		expect(zhToNumber("一十万零一")).toBe("100001");
		expect(zhToNumber("一十万零一十")).toBe("100010");
		expect(zhToNumber("一十万零一百")).toBe("100100");
		expect(zhToNumber("一十万一千")).toBe("101000");
		expect(zhToNumber("一百万零一")).toBe("1000001");
		expect(zhToNumber("一千万零一")).toBe("10000001");
		expect(zhToNumber("一千零一万一千零一")).toBe("10011001");
		expect(zhToNumber("一千零一万零一")).toBe("10010001");
		expect(zhToNumber("一千二百三十四万五千六百七十八")).toBe("12345678");
		expect(zhToNumber("一千一百万一千零一")).toBe("11001001");
		expect(zhToNumber("一亿零一")).toBe("100000001");
		expect(zhToNumber("一十亿零一")).toBe("1000000001");
		expect(zhToNumber("一十亿零一千")).toBe("1000001000");
		expect(zhToNumber("一十亿零一十万零一")).toBe("1000100001");
		expect(zhToNumber("一十亿一千万一千")).toBe("1010001000");
		expect(zhToNumber("一百亿零一")).toBe("10000000001");
		expect(zhToNumber("一千亿零一")).toBe("100000000001");
		expect(zhToNumber("一千二百亿零一千二百三十四")).toBe("120000001234");
		expect(zhToNumber("一千零一亿一千零一万一千零一")).toBe("100110011001");
		expect(zhToNumber("一千亿一千万一千零一")).toBe("100010001001");
		expect(zhToNumber("零点零零零零零零零零零零零一二三四五六七八九")).toBe("0.00000000000123456789");
		expect(zhToNumber("零点零零零零零零零零零零零零零零一")).toBe("0.000000000000001");
		expect(zhToNumber("零点零零零零零零零零零零零零零一")).toBe("0.00000000000001");
		expect(zhToNumber("零点零零零零零零零零零零零零一")).toBe("0.0000000000001");
		expect(zhToNumber("零点零零零零零零零零零零零一")).toBe("0.000000000001");
		expect(zhToNumber("零点零零零零零零零零零零一")).toBe("0.00000000001");
		expect(zhToNumber("零点零零零零零零零零零一")).toBe("0.0000000001");
		expect(zhToNumber("零点零零零零零零零零一")).toBe("0.000000001");
		expect(zhToNumber("零点零零零零零零零一")).toBe("0.00000001");
		expect(zhToNumber("零点零零零零零零一")).toBe("0.0000001");
		expect(zhToNumber("零点二三四三四三")).toBe("0.234343");
		expect(zhToNumber("零点零零零零零一")).toBe("0.000001");
		expect(zhToNumber("零点零零零零一")).toBe("0.00001");
		expect(zhToNumber("零点零零零一")).toBe("0.0001");
		expect(zhToNumber("零点零零一")).toBe("0.001");
		expect(zhToNumber("零点零一")).toBe("0.01");
		expect(zhToNumber("零点一")).toBe("0.1");
		expect(zhToNumber("负一")).toBe("-1");
		expect(zhToNumber("负二")).toBe("-2");
		expect(zhToNumber("负十")).toBe("-10");
		expect(zhToNumber("负十一")).toBe("-11");
		expect(zhToNumber("负一十一")).toBe("-11");

		expect(zhToNumber("正一千二百三十四万五千六百七十八点八七六五")).toBe("12345678.8765");
		expect(zhToNumber("负一千二百三十四万五千六百七十八点八七六五")).toBe("-12345678.8765");
	});

	test(`language equal HK`, async ({ expect }) => {
		expect(zhToNumber("二千二百點零九九", { language: "zh-HK-lowercase" })).toBe("2200.099");
		expect(zhToNumber("一千零一萬一千零一", { language: "zh-HK-lowercase" })).toBe("10011001");

		expect(zhToNumber("壹仟零壹萬壹仟零壹", { language: "zh-HK-uppercase" })).toBe("10011001");
		expect(zhToNumber("壹兆貳仟參佰肆拾伍億陸仟柒佰捌拾玖萬", { language: "zh-HK-uppercase" })).toBe("1234567890000");
	});

	test(`custom magnitudeList`, async ({ expect }) => {
		const options = {
			language: "zh-CN-lowercase" as const,
			magnitudeList: ["", "万", "亿", "兆", "京"],
		};
		expect(zhToNumber("一京", options)).toBe("10000000000000000");
	});

	test(`一十 => 十`, async ({ expect }) => {
		expect(zhToNumber("二十")).toBe("20");
		expect(zhToNumber("十")).toBe("10");
		expect(zhToNumber("正十")).toBe("10");
		expect(zhToNumber("负十")).toBe("-10");
		expect(zhToNumber("十万零一")).toBe("100001");
		expect(zhToNumber("十万零一百零一")).toBe("100101");
		expect(zhToNumber("十万一千零一")).toBe("101001");
		expect(zhToNumber("十万一千零一十")).toBe("101010");
	});

	test(`Octal system`, async ({ expect }) => {
		expect(zhToNumber("一千一百一十一万一千一百一十一亿一千一百一十一万一千一百一十一")).toBe("1111111111111111");
		expect(zhToNumber("一万亿")).toBe("1000000000000");
		expect(zhToNumber("一万万亿")).toBe(zhToNumber("一亿亿"));
		expect(zhToNumber("一亿亿")).toBe("10000000000000000");
		expect(zhToNumber("一兆")).toBe("1000000000000");
		expect(zhToNumber("一万兆")).toBe("10000000000000000");
		expect(zhToNumber("一亿兆")).toBe("100000000000000000000");
		expect(zhToNumber("一亿兆")).toBe(zhToNumber("一万万兆"));
		expect(zhToNumber("一兆兆")).toBe("1000000000000000000000000");
	});

	test(`Thousands Separator`, async ({ expect }) => {
		expect(zhToNumber("正一千二百三十四万五千六百七十八点八七六五", { thousandsSeparator: true })).toBe(
			"12,345,678.8765",
		);
	});
});
