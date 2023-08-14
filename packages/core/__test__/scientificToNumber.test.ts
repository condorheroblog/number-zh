import { describe, test } from "vitest";
import { scientificToNumber } from "../src";

describe(scientificToNumber.name, () => {
	test("should return true", ({ expect }) => {
		expect(scientificToNumber("0")).toBe("0");
		expect(scientificToNumber("-0")).toBe("0");
		expect(scientificToNumber("+0")).toBe("0");
		expect(scientificToNumber("00000000")).toBe("0");
		expect(scientificToNumber(12.12)).toBe("12.12");
		expect(scientificToNumber(6666)).toBe("6666");
		expect(scientificToNumber(-1e-3)).toBe("-0.001");
		expect(scientificToNumber(-1.2e-2)).toBe("-0.012");
		expect(scientificToNumber("-1.2e2")).toBe("-120");
		expect(scientificToNumber("1.2e2")).toBe("120");
		expect(scientificToNumber("1.2e+2")).toBe("120");
		expect(scientificToNumber("1.2E+2")).toBe("120");
		expect(scientificToNumber("1.2e-2")).toBe("0.012");
		expect(scientificToNumber("-1.2e-2")).toBe("-0.012");
		expect(scientificToNumber(-1.123e-10)).toBe("-0.0000000001123");
		expect(scientificToNumber(2.5e25)).toBe("25000000000000000000000000");
		expect(scientificToNumber(141120000000000000)).toBe("141120000000000000");
		expect(scientificToNumber(1.23423534e-12)).toBe("0.00000000000123423534");
	});

	test("should return false", ({ expect }) => {
		// eslint-disable-next-line @typescript-eslint/no-loss-of-precision
		expect(scientificToNumber(1_0002_0003_0004_0005_0006_0007) === "1000200030004000500060007").toBeFalsy();
	});
});
