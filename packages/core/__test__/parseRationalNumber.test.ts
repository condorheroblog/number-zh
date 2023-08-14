import { describe, test } from "vitest";
import { parseRationalNumber } from "../src";

describe(parseRationalNumber.name, () => {
	test("should return true", ({ expect }) => {
		expect(parseRationalNumber("3.14159")).toEqual({ sign: "+", integerPart: "3", fractionalPart: "14159" });
		expect(parseRationalNumber("+3.14159")).toEqual({ sign: "+", integerPart: "3", fractionalPart: "14159" });
		expect(parseRationalNumber("-3.14159")).toEqual({ sign: "-", integerPart: "3", fractionalPart: "14159" });

		expect(parseRationalNumber("0")).toEqual({ sign: "+", integerPart: "0", fractionalPart: "" });
		expect(parseRationalNumber("+0")).toEqual({ sign: "+", integerPart: "0", fractionalPart: "" });
		expect(parseRationalNumber("-0")).toEqual({ sign: "+", integerPart: "0", fractionalPart: "" });
	});
});
