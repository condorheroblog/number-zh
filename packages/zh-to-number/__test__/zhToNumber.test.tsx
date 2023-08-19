import { test } from "vitest";
import { zhToNumber } from "../src";

test(zhToNumber.name, async ({ expect }) => {
	expect(1 + 1).toBe(2);
});
