import { describe, test } from "vitest";
import { removeConsecutiveZeros } from "../src";

describe(removeConsecutiveZeros.name, () => {
	test(`should return true for valid ${removeConsecutiveZeros.name}`, ({ expect }) => {
		expect(removeConsecutiveZeros("0.00001")).toBe("0.01");
		expect(removeConsecutiveZeros("0.00001000")).toBe("0.010");
	});
});
