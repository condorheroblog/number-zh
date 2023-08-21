import { describe, test } from "vitest";
import { stringAddition } from "../src";

describe(stringAddition.name, () => {
	test(`${stringAddition.name} - sum `, ({ expect }) => {
		expect(stringAddition("199", "99")).toBe("298");
		expect(
			stringAddition("19999999999999999999999999999999999999999", "19999999999999999999999999999999999999999"),
		).toBe("39999999999999999999999999999999999999998");
	});
});
