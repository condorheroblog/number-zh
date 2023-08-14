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

	result.integerPart = parts[0].replace(/^[+-]/, "");

	if (parts.length > 1) {
		result.fractionalPart = parts[1];
	}

	if (result.integerPart + result.fractionalPart === "0") {
		// +0, 0, -0, return +0
		result.sign = "+";
	}

	return result;
}
