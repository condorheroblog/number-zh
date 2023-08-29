import { describe, test } from "vitest";
import { zhCurrencyToNumber } from "../src";

describe(zhCurrencyToNumber.name, () => {
	test("main", async ({ expect }) => {
		expect(zhCurrencyToNumber("人民币零圆整")).toBe("¥0");
		expect(zhCurrencyToNumber("人民币壹角整")).toBe("¥0.1");
		expect(zhCurrencyToNumber("人民币壹角贰分")).toBe("¥0.12");
		expect(zhCurrencyToNumber("人民币壹拾壹圆整")).toBe("¥11");
		expect(zhCurrencyToNumber("壹拾壹圆贰角叁分")).toBe("¥11.23");
		expect(zhCurrencyToNumber("人民币壹万陆仟肆佰零玖圆零贰分")).toBe("¥16409.02");
		expect(zhCurrencyToNumber("人民币壹万陆仟肆佰零玖圆零贰分", { thousandsSeparator: true })).toBe("¥16,409.02");
		expect(zhCurrencyToNumber("人民币叁佰贰拾伍圆零肆分")).toBe("¥325.04");
		expect(zhCurrencyToNumber("人民币负叁圆贰角整")).toBe("¥-3.2");
	});

	test("NaN", async ({ expect }) => {
		expect(zhCurrencyToNumber("123")).toBe(NaN);
		expect(zhCurrencyToNumber("人民币壹圆贰角叁分肆厘")).toBe(NaN);
	});

	test("language", async ({ expect }) => {
		expect(zhCurrencyToNumber("人民币一十二圆一角二分", { language: "zh-CN-lowercase" })).toBe("¥12.12");
		expect(zhCurrencyToNumber("人民币壹拾贰圆壹角贰分")).toBe("¥12.12");
	});

	test("CNYUnit", async ({ expect }) => {
		expect(zhCurrencyToNumber("人民币肆拾元整", { CNYUnit: "元" })).toBe("¥40");
		expect(zhCurrencyToNumber("人民币肆拾圆整")).toBe("¥40");
	});

	test("amountSuffix equal 正", async ({ expect }) => {
		expect(zhCurrencyToNumber("人民币贰拾圆正", { amountSuffix: "正" })).toBe("¥20");
	});

	test("tenCentsSuffix", async ({ expect }) => {
		expect(zhCurrencyToNumber("人民币叁拾圆伍角整")).toBe("¥30.5");
		expect(zhCurrencyToNumber("人民币叁拾圆伍角")).toBe("¥30.5");
	});

	test("fractionalCurrencyUnit", async ({ expect }) => {
		expect(zhCurrencyToNumber("人民币壹圆贰角叁分肆厘", { fractionalCurrencyUnit: ["角", "分", "厘"] })).toBe("¥1.234");
	});

	test("preserveOnesPlaceZero", async ({ expect }) => {
		expect(zhCurrencyToNumber("人民币零圆壹角贰分")).toBe("¥0.12");
		expect(zhCurrencyToNumber("人民币壹角贰分")).toBe("¥0.12");
		expect(zhCurrencyToNumber("人民币壹仟陆佰捌拾圆零叁角贰分")).toBe("¥1680.32");
		expect(zhCurrencyToNumber("人民币壹仟陆佰捌拾圆叁角贰分")).toBe("¥1680.32");
	});

	test("hangingZerosAfterDigits", async ({ expect }) => {
		expect(zhCurrencyToNumber("人民币壹拾万零柒仟圆伍角叁分")).toBe("¥107000.53");
		expect(zhCurrencyToNumber("人民币壹拾万柒仟圆伍角叁分")).toBe("¥107000.53");
	});

	test("amountPrefix", async ({ expect }) => {
		expect(zhCurrencyToNumber("人民币贰佰伍拾叁圆整")).toBe("¥253");
		expect(zhCurrencyToNumber("⊗贰佰伍拾叁圆整", { amountPrefix: "⊗" })).toBe("¥253");
	});

	test("角位是 0 分位不是 0 元后面应写零字", async ({ expect }) => {
		expect(zhCurrencyToNumber("人民币零圆零壹分")).toBe("¥0.01");
		expect(zhCurrencyToNumber("人民币壹圆零壹分")).toBe("¥1.01");
		expect(zhCurrencyToNumber("人民币壹仟陆佰捌拾圆零壹分")).toBe("¥1680.01");
		expect(zhCurrencyToNumber("人民币壹仟陆佰捌拾圆零壹角壹分")).toBe("¥1680.11");
	});
});
