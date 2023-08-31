import { describe, test } from "vitest";
import { NumberZh } from "../src";

describe(NumberZh.name, () => {
	test("numberZh", async ({ expect }) => {
		const numberZh = new NumberZh();
		expect(numberZh.numberToZh(66999)).toBe("六万六千九百九十九");
		expect(numberZh.zhToNumber("六万六千九百九十九")).toBe("66999");
		expect(numberZh.zhCurrencyToNumber("人民币陆万陆仟玖佰玖拾玖圆整")).toBe("¥66999");
		expect(numberZh.numberToZhCurrency("66999")).toBe("人民币陆万陆仟玖佰玖拾玖圆整");
	});

	test("numberZh - comprehensiveOptions", async ({ expect }) => {
		const numberZh = new NumberZh({ baseNumerals: ["〇"] });
		expect(numberZh.numberToZh(0)).toBe("〇");
	});

	test("zhToNumber - options", async ({ expect }) => {
		const numberZh = new NumberZh();
		expect(numberZh.zhToNumber("六万六千九百九十九", { thousandsSeparator: true })).toBe("66,999");
	});
});
