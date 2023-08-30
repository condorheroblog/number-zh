import { describe, test } from "vitest";
import { numberToZhCurrency } from "../src";

describe(numberToZhCurrency.name, () => {
	test("main", async ({ expect }) => {
		expect(numberToZhCurrency("0")).toBe("人民币零圆整");
		expect(numberToZhCurrency(0.1)).toBe("人民币壹角整");
		expect(numberToZhCurrency("0.12")).toBe("人民币壹角贰分");
		expect(numberToZhCurrency("11.00")).toBe("人民币壹拾壹圆整");
		expect(numberToZhCurrency("11.0")).toBe("人民币壹拾壹圆整");
		expect(numberToZhCurrency(11.0)).toBe("人民币壹拾壹圆整");
		expect(numberToZhCurrency(11.23)).toBe("人民币壹拾壹圆贰角叁分");
		expect(numberToZhCurrency(1_6409.02)).toBe("人民币壹万陆仟肆佰零玖圆零贰分");
		expect(numberToZhCurrency(325.04)).toBe("人民币叁佰贰拾伍圆零肆分");
		expect(numberToZhCurrency(-3.2)).toBe("人民币负叁圆贰角整");
	});

	test("NaN", async ({ expect }) => {
		expect(numberToZhCurrency("你好")).toBe(NaN);
	});

	test("language", async ({ expect }) => {
		expect(numberToZhCurrency("12.12", { language: "zh-CN-lowercase" })).toBe("人民币一十二圆一角二分");
		expect(numberToZhCurrency("12.12")).toBe("人民币壹拾贰圆壹角贰分");
	});

	test("CNYUnit", async ({ expect }) => {
		expect(numberToZhCurrency(40, { CNYUnit: "元" })).toBe("人民币肆拾元整");
		expect(numberToZhCurrency(40)).toBe("人民币肆拾圆整");
	});

	test("amountSuffix equal 整", async ({ expect }) => {
		expect(numberToZhCurrency(50)).toBe("人民币伍拾圆整");
	});

	test("amountSuffix equal 正", async ({ expect }) => {
		expect(numberToZhCurrency(20, { amountSuffix: "正" })).toBe("人民币贰拾圆正");
	});

	test("tenCentsSuffix", async ({ expect }) => {
		expect(numberToZhCurrency(30.5)).toBe("人民币叁拾圆伍角整");
		expect(numberToZhCurrency(30.5, { tenCentsSuffix: false })).toBe("人民币叁拾圆伍角");
	});

	test("fractionalCurrencyUnit", async ({ expect }) => {
		expect(numberToZhCurrency(1.234, { fractionalCurrencyUnit: ["角", "分", "厘"] })).toBe("人民币壹圆贰角叁分肆厘");
		expect(numberToZhCurrency(1.234)).toBe("人民币壹圆贰角叁分");
	});

	test("preserveOnesPlaceZero", async ({ expect }) => {
		expect(numberToZhCurrency(0.12, { preserveOnesPlaceZero: true })).toBe("人民币零圆壹角贰分");
		expect(numberToZhCurrency(0.12)).toBe("人民币壹角贰分");
		expect(numberToZhCurrency(1680.32, { preserveOnesPlaceZero: true })).toBe("人民币壹仟陆佰捌拾圆零叁角贰分");
		expect(numberToZhCurrency(1680.32)).toBe("人民币壹仟陆佰捌拾圆叁角贰分");
	});

	test("hangingZerosAfterDigits", async ({ expect }) => {
		expect(numberToZhCurrency(10_7000.53)).toBe("人民币壹拾万零柒仟圆伍角叁分");
		expect(numberToZhCurrency(10_7000.53, { hangingZerosAfterDigits: false })).toBe("人民币壹拾万柒仟圆伍角叁分");
	});

	test("amountPrefix", async ({ expect }) => {
		expect(numberToZhCurrency(253)).toBe("人民币贰佰伍拾叁圆整");
		expect(numberToZhCurrency(253, { amountPrefix: "⊗" })).toBe("⊗贰佰伍拾叁圆整");
	});

	test("角位是 0 分位不是 0 元后面应写零字", async ({ expect }) => {
		expect(numberToZhCurrency(0.01)).toBe("人民币零圆零壹分");
		expect(numberToZhCurrency(1.01)).toBe("人民币壹圆零壹分");
		expect(numberToZhCurrency(1680.01, { preserveOnesPlaceZero: true })).toBe("人民币壹仟陆佰捌拾圆零壹分");
		expect(numberToZhCurrency(1680.11, { preserveOnesPlaceZero: true })).toBe("人民币壹仟陆佰捌拾圆零壹角壹分");
	});

	test("¥", async ({ expect }) => {
		expect(numberToZhCurrency("¥1680.01")).toBe("人民币壹仟陆佰捌拾圆零壹分");
	});

	test("numericUnderscores", async ({ expect }) => {
		expect(numberToZhCurrency("¥1,680.01")).toBe("人民币壹仟陆佰捌拾圆零壹分");
	});
});
