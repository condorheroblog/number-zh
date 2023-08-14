// https://www.shuxuele.com/numbers/scientific-notation.html
import { isScientificNotation } from ".";

export function scientificToNumber(num: number | string) {
	const numString = num.toString();
	if (isScientificNotation(numString)) {
		const sign = Math.sign(+numString);
		const unsignedIntegers = numString.replace(/^[+-]/, "");

		const zero = "0";
		const [base, exponent] = unsignedIntegers.toLowerCase().split("e");
		let unsignedExponent = Math.abs(+exponent);
		const [integerPart, fractionalPart = ""] = base.split(".");

		let result = "";
		if (exponent.startsWith("-")) {
			// new Array(3).join("0") === [empty, empty, empty] === "--"
			result = zero + "." + new Array(unsignedExponent).join(zero) + integerPart + fractionalPart;
		} else {
			if (fractionalPart) {
				unsignedExponent = unsignedExponent - fractionalPart.length;
			}

			result = integerPart + fractionalPart + new Array(unsignedExponent + 1).join(zero);
		}

		return sign === -1 ? `-${result}` : result;
	} else {
		return Number(numString).toString();
	}
}
