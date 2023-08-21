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

describe(`${zhToNumber.name} main`, () => {
	test(`${zhToNumber.name} number`, async ({ expect }) => {
		expect(zhToNumber("零")).toBe("0");
		expect(zhToNumber("一")).toBe("1");
		expect(zhToNumber("十")).toBe("10");
		expect(zhToNumber("十一")).toBe("11");
		expect(zhToNumber("一十一")).toBe("11");
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
		expect(zhToNumber("一百万零一")).toBe("1000001");
		expect(zhToNumber("一千万零一")).toBe("10000001");
		expect(zhToNumber("一千零一万一千零一")).toBe("10011001");
		expect(zhToNumber("一千零一万零一")).toBe("10010001");
		expect(zhToNumber("一亿零一")).toBe("100000001");
		expect(zhToNumber("一十亿零一")).toBe("1000000001");
		expect(zhToNumber("一百亿零一")).toBe("10000000001");
		expect(zhToNumber("一千零一亿一千零一万一千零一")).toBe("100110011001");
		expect(zhToNumber("一千亿一千万一千零一")).toBe("100010001001");
		expect(zhToNumber("一千亿零一")).toBe("100000000001");
		expect(zhToNumber("零点零零零零零零零零零零零零零零一")).toBe("0.000000000000001");
		expect(zhToNumber("零点零零零零零零零零零零零零零一")).toBe("0.00000000000001");
		expect(zhToNumber("零点零零零零零零零零零零零零一")).toBe("0.0000000000001");
		expect(zhToNumber("零点零零零零零零零零零零零一")).toBe("0.000000000001");
		expect(zhToNumber("零点零零零零零零零零零零一")).toBe("0.00000000001");
		expect(zhToNumber("零点零零零零零零零零零一")).toBe("0.0000000001");
		expect(zhToNumber("零点零零零零零零零零一")).toBe("0.000000001");
		expect(zhToNumber("零点零零零零零零零一")).toBe("0.00000001");
		expect(zhToNumber("零点零零零零零零一")).toBe("0.0000001");
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

	test(`${zhToNumber.name} 一十 => 十`, async ({ expect }) => {
		expect(zhToNumber("二十")).toBe("20");
		expect(zhToNumber("十")).toBe("10");
		expect(zhToNumber("正十")).toBe("10");
		expect(zhToNumber("负十")).toBe("-10");
		expect(zhToNumber("十万零一")).toBe("100001");
		expect(zhToNumber("十万零一百零一")).toBe("100101");
		expect(zhToNumber("十万一千零一")).toBe("101001");
		expect(zhToNumber("十万一千零一十")).toBe("101010");
	});
});
