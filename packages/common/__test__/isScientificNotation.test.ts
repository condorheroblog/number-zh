import { describe, test } from "vitest";
import { isScientificNotation } from "../src";

describe(`valid ${isScientificNotation.name} (number)`, () => {
	test(`should return true for valid ${isScientificNotation.name}`, ({ expect }) => {
		expect(isScientificNotation(8.912716491823689e30)).toBe(true);
		expect(isScientificNotation(3.328292892892893e-23)).toBe(true);
	});

	test(`should return false for invalid ${isScientificNotation.name}`, ({ expect }) => {
		expect(isScientificNotation(123)).toBe(false);
		// 1e3.toString() 1000
		expect(isScientificNotation(1e3)).toBe(false);
		expect(isScientificNotation(-2.5e-5)).toBe(false);
		expect(isScientificNotation(3.14e10)).toBe(false);
	});
});

describe(`valid ${isScientificNotation.name} (string)`, () => {
	test(`should return true for valid  ${isScientificNotation.name}`, ({ expect }) => {
		expect(isScientificNotation("3.14e10")).toBe(true);
		expect(isScientificNotation("-2.5E-5")).toBe(true);
	});

	test(`should return false for invalid  ${isScientificNotation.name}`, ({ expect }) => {
		expect(isScientificNotation("123")).toBe(false);
		expect(isScientificNotation("1.23e")).toBe(false);
		expect(isScientificNotation("abc")).toBe(false);
	});
});
