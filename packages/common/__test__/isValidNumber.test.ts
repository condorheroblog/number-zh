import { describe, test } from "vitest";
import { isValidNumber } from "../src";

describe(`valid ${isValidNumber.name} (number)`, () => {
	test(`should return true for ${isValidNumber.name}`, ({ expect }) => {
		expect(isValidNumber(123)).toBe(true);
		expect(isValidNumber(-2.5)).toBe(true);
		expect(isValidNumber(3.14)).toBe(true);
		expect(isValidNumber(0)).toBe(true);

		expect(isValidNumber(0.5)).toBe(true);

		expect(isValidNumber(5)).toBe(true);

		expect(isValidNumber(+5)).toBe(true);
		expect(isValidNumber(1e3)).toBe(true);
	});

	test(`should return false for ${isValidNumber.name}`, ({ expect }) => {
		expect(isValidNumber(3.328292892892893e-23)).toBe(false);
	});
});

describe(`valid ${isValidNumber.name} (string)`, () => {
	test(`should return true for ${isValidNumber.name}`, ({ expect }) => {
		expect(isValidNumber("123")).toBe(true);
		expect(isValidNumber("-2.5")).toBe(true);
		expect(isValidNumber("3.14")).toBe(true);
		expect(isValidNumber("0")).toBe(true);
		expect(isValidNumber("0.")).toBe(true);
		expect(isValidNumber(".0")).toBe(true);
	});

	test(`should return false for ${isValidNumber.name}`, ({ expect }) => {
		expect(isValidNumber("abc")).toBe(false);
		expect(isValidNumber("1e3")).toBe(false);
		expect(isValidNumber("1.23e")).toBe(false);
	});
});
