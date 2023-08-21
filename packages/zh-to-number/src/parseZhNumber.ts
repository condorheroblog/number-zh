export function parseZhNumber(str: string, minusSign: string, decimalPoint: string) {
	if (typeof str !== "string") {
		throw new Error("Invalid input. Please provide a valid string.");
	}

	const result = {
		sign: "",
		integerPart: "",
		fractionalPart: "",
	};

	if (str.startsWith(minusSign)) {
		result.sign = "-";
	} else {
		result.sign = "+";
	}

	const parts = str.split(decimalPoint);

	result.integerPart = parts[0];

	if (parts.length > 1) {
		result.fractionalPart = parts[1];
	}

	return result;
}
