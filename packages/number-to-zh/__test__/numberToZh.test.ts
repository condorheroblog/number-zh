import { describe, test } from "vitest";
import { numberToZh } from "../src";

describe(numberToZh.name, () => {
	test(`The first parameter of the ${numberToZh.name}`, async ({ expect }) => {
		expect(numberToZh("0")).toBe("零");
		expect(numberToZh("+0")).toBe("零");
		expect(numberToZh("-0")).toBe("零");
		expect(numberToZh(0)).toBe("零");
		expect(numberToZh(+0)).toBe("零");
		expect(numberToZh(-0)).toBe("零");
		// eslint-disable-next-line prettier/prettier
		expect(numberToZh(-0)).toBe("零");

		expect(numberToZh(1)).toBe("一");
		expect(numberToZh(1234)).toBe("一千二百三十四");
		expect(numberToZh(1234_5678)).toBe("一千二百三十四万五千六百七十八");
		expect(numberToZh(1000_0001)).toBe("一千零万零一");
		expect(numberToZh(1001_0001)).toBe("一千零一万零一");
		expect(numberToZh(1001_1001)).toBe("一千零一万一千零一");

		expect(numberToZh(-0.1)).toBe("负零点一");
		expect(numberToZh(+0.1)).toBe("零点一");
		expect(numberToZh("-0.1")).toBe("负零点一");
		expect(numberToZh(0.234343)).toBe("零点二三四三四三");
		expect(numberToZh(12.12)).toBe("一十二点一二");

		expect(numberToZh(-1e-3)).toBe("负零点零零一");
		expect(numberToZh(1.23456789e-12)).toBe("零点零零零零零零零零零零零一二三四五六七八九");
		// TODO: 边界检测
		expect(numberToZh(1.23456789e12)).toBe("一undefined二千三百四十五亿六千七百八十九万零");
	});
});
