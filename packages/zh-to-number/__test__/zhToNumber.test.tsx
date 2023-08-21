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
		expect(zhToNumber("正一千二百三十四万五千六百七十八点八七六五")).toBe("12345678.8765");
		expect(zhToNumber("负一千二百三十四万五千六百七十八点八七六五")).toBe("-12345678.8765");
	});

	test(`${zhToNumber.name} 一十 => 十`, async ({ expect }) => {
		expect(zhToNumber("二十")).toBe("20");
		expect(zhToNumber("十")).toBe("10");
		expect(zhToNumber("十万零一")).toBe("100001");
		expect(zhToNumber("十万零一百零一")).toBe("100101");
		expect(zhToNumber("十万一千零一")).toBe("101001");
		expect(zhToNumber("十万一千零一十")).toBe("101010");
	});
});
