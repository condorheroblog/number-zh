import { describe, test } from "vitest";
import { operateSequentCharacters } from "../src";

describe(operateSequentCharacters.name, () => {
	test(`${operateSequentCharacters.name} - start `, ({ expect }) => {
		expect(operateSequentCharacters("0.00001", "0", { mode: "start" })).toBe(".00001");
		expect(operateSequentCharacters("00001000", "0", { mode: "start" })).toBe("1000");
	});

	test(`${operateSequentCharacters.name} - middle `, ({ expect }) => {
		expect(operateSequentCharacters("01000010", "0", { mode: "middle", remove: false })).toBe("01010");
	});

	test(`${operateSequentCharacters.name} - end `, ({ expect }) => {
		expect(operateSequentCharacters("0100001000", "0", { mode: "end" })).toBe("0100001");
	});

	test(`${operateSequentCharacters.name} - start-middle-end `, ({ expect }) => {
		expect(
			operateSequentCharacters("0900009000", "0", [
				{ mode: "start" },
				{ mode: "middle", remove: false },
				{ mode: "end" },
			]),
		).toBe("909");
	});
});
