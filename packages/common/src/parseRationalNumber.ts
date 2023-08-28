import { operateSequentCharacters } from "./operateSequentCharacters";

export function parseRationalNumber(str: string) {
	if (typeof str !== "string") {
		throw new Error("Invalid input. Please provide a valid string.");
	}

	const result = {
		sign: "",
		integerPart: "",
		fractionalPart: "",
	};

	if (str.startsWith("-")) {
		result.sign = "-";
	} else {
		result.sign = "+";
	}

	const parts = str.split(".");

	const integerPart = parts[0].replace(/^[+-]/, "");
	const withoutLeadingZeroInteger = operateSequentCharacters(integerPart, "0", { mode: "start" });
	if (withoutLeadingZeroInteger.length) {
		result.integerPart = withoutLeadingZeroInteger;
	} else {
		result.integerPart = "0";
	}

	if (parts.length > 1) {
		result.fractionalPart = operateSequentCharacters(parts[1], "0", { mode: "end" });
	}

	if (result.integerPart + result.fractionalPart === "0") {
		// +0, 0, -0, return +0
		result.sign = "+";
	}

	return result;
}
