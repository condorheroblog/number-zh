import { describe, test } from "vitest";
import { numberToMoney } from "../src";

describe(numberToMoney.name, () => {
	test("main", async ({ expect }) => {
		expect(numberToMoney("0")).toBe("人民币零圆整");
		expect(numberToMoney(0.1)).toBe("人民币壹角整");
		expect(numberToMoney("0.12")).toBe("人民币壹角贰分");
		expect(numberToMoney("11.00")).toBe("人民币壹拾壹圆整");
		expect(numberToMoney("11.0")).toBe("人民币壹拾壹圆整");
		expect(numberToMoney(11.0)).toBe("人民币壹拾壹圆整");
		expect(numberToMoney(11.23)).toBe("人民币壹拾壹圆贰角叁分");
		expect(numberToMoney(1_6409.02)).toBe("人民币壹万陆仟肆佰零玖圆零贰分");
		expect(numberToMoney(325.04)).toBe("人民币叁佰贰拾伍圆零肆分");
		expect(numberToMoney(-3.2)).toBe("人民币负叁圆贰角整");
	});

	test("language", async ({ expect }) => {
		expect(numberToMoney("12.12", { language: "zh-CN-lowercase" })).toBe("人民币一十二圆一角二分");
		expect(numberToMoney("12.12")).toBe("人民币壹拾贰圆壹角贰分");
	});

	test("CNYUnit", async ({ expect }) => {
		expect(numberToMoney(40, { CNYUnit: "元" })).toBe("人民币肆拾元整");
		expect(numberToMoney(40)).toBe("人民币肆拾圆整");
	});

	test("amountSuffix equal 整", async ({ expect }) => {
		expect(numberToMoney(50)).toBe("人民币伍拾圆整");
	});

	test("amountSuffix equal 正", async ({ expect }) => {
		expect(numberToMoney(20, { amountSuffix: "正" })).toBe("人民币贰拾圆正");
	});

	test("tenCentsSuffix", async ({ expect }) => {
		expect(numberToMoney(30.5)).toBe("人民币叁拾圆伍角整");
		expect(numberToMoney(30.5, { tenCentsSuffix: false })).toBe("人民币叁拾圆伍角");
	});

	test("fractionalCurrencyUnit", async ({ expect }) => {
		expect(numberToMoney(1.234, { fractionalCurrencyUnit: ["角", "分", "厘"] })).toBe("人民币壹圆贰角叁分肆厘");
		expect(numberToMoney(1.234)).toBe("人民币壹圆贰角叁分");
	});

	test("preserveOnesPlaceZero", async ({ expect }) => {
		expect(numberToMoney(0.12, { preserveOnesPlaceZero: true })).toBe("人民币零圆壹角贰分");
		expect(numberToMoney(0.12)).toBe("人民币壹角贰分");
		expect(numberToMoney(1680.32, { preserveOnesPlaceZero: true })).toBe("人民币壹仟陆佰捌拾圆零叁角贰分");
		expect(numberToMoney(1680.32)).toBe("人民币壹仟陆佰捌拾圆叁角贰分");
	});

	test("preserveTenThousandsPlaceZero", async ({ expect }) => {
		expect(numberToMoney(10_7000.53)).toBe("人民币壹拾万零柒仟圆伍角叁分");
		expect(numberToMoney(10_7000.53, { preserveTenThousandsPlaceZero: false })).toBe("人民币壹拾万柒仟圆伍角叁分");
	});

	test("amountPrefix", async ({ expect }) => {
		expect(numberToMoney(253)).toBe("人民币贰佰伍拾叁圆整");
		expect(numberToMoney(253, { amountPrefix: "⊗" })).toBe("⊗贰佰伍拾叁圆整");
	});
});
