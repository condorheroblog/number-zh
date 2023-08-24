import { describe, test } from "vitest";
import { numberToMoney } from "../src";

describe(numberToMoney.name, () => {
	test("1 + 1 = 2", async ({ expect }) => {
		expect(1 + 1).toBe(2);
	});
});
