import { describe, test } from "vitest";
import { clearZero } from "../src";

describe(clearZero.name, () => {
	test(`${clearZero.name} - start `, ({ expect }) => {
		expect(clearZero("0.00001", "0", ["start"])).toBe(".00001");
		expect(clearZero("00001000", "0", ["start"])).toBe("1000");
	});

	test(`${clearZero.name} - middle `, ({ expect }) => {
		expect(clearZero("01000010", "0", ["middle"])).toBe("01010");
	});

	test(`${clearZero.name} - end `, ({ expect }) => {
		expect(clearZero("0100001000", "0", ["end"])).toBe("0100001");
	});

	test(`${clearZero.name} - start-middle-end `, ({ expect }) => {
		expect(clearZero("0900009000", "0", ["start", "middle", "end"])).toBe("909");
	});
});
