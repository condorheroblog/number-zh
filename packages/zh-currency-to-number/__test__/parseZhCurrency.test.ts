import { describe, test } from "vitest";
import { parseZhCurrency, resolveOptions } from "../src";

describe(parseZhCurrency.name, () => {
	const resolved = resolveOptions({});
	test("main", async ({ expect }) => {
		expect(parseZhCurrency("人民币壹拾壹圆整", resolved)).toStrictEqual({
			sign: "正",
			integerPart: "壹拾壹",
			fractionalPart: "",
		});

		expect(parseZhCurrency("人民币负壹拾壹圆贰角叁分", resolved)).toStrictEqual({
			sign: "负",
			integerPart: "壹拾壹",
			fractionalPart: "贰叁",
		});

		expect(parseZhCurrency("人民币正贰角叁分", resolved)).toStrictEqual({
			sign: "正",
			integerPart: "零",
			fractionalPart: "贰叁",
		});
	});
});
