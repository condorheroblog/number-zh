import { describe, test } from "vitest";
import { RESOURCES, NumeralsConverter } from "../src";

describe(NumeralsConverter.name, () => {
	const baseNumerals = [...RESOURCES["zh-CN-lowercase"].baseNumerals];
	baseNumerals.shift();
	baseNumerals.unshift("〇");
	const converter = new NumeralsConverter(baseNumerals);

	test("getValueFromIndex", async ({ expect }) => {
		expect(converter.getValueFromIndex(1)).toBe("一");
		expect(converter.getValueFromIndex(10_0001)).toBe("一〇〇〇〇一");
		expect(converter.getValueFromIndex(10_0101)).toBe("一〇〇一〇一");
		expect(converter.getValueFromIndex(10_1001)).toBe("一〇一〇〇一");
		expect(converter.getValueFromIndex(10_1010)).toBe("一〇一〇一〇");
	});

	test("getIndexFromValue", async ({ expect }) => {
		expect(converter.getIndexFromValue("三")).toBe("3");
		expect(converter.getIndexFromValue("一〇〇〇〇一")).toBe("100001");
		expect(converter.getIndexFromValue("一〇〇一〇一")).toBe("100101");
		expect(converter.getIndexFromValue("一〇一〇〇一")).toBe("101001");
		expect(converter.getIndexFromValue("一〇一〇一〇")).toBe("101010");
	});
});
