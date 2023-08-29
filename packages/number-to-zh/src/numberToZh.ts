import type { NumberToZhOptions } from "./types";
import { resolveOptions } from "./resolveOptions";
import { integerToZh } from "./integerToZh";
import {
	isValidNumber,
	isScientificNotation,
	parseRationalNumber,
	scientificToNumber,
	detectIntegerBoundary,
} from "./utils";

export function numberToZh(num: number | string, options: NumberToZhOptions = {}) {
	const resolved = resolveOptions(options);
	let numString = num.toString();
	if (resolved.numericUnderscores) {
		numString = numString.replace(new RegExp(`${resolved.numericUnderscores}`, "g"), "");
	}
	if (!isValidNumber(numString)) {
		if (isScientificNotation(numString)) {
			numString = scientificToNumber(numString);
		} else {
			return NaN;
		}
	}

	const { sign, integerPart, fractionalPart } = parseRationalNumber(numString);

	/* ------------------ 整数部分边界检测 ------------------ */

	detectIntegerBoundary(
		integerPart.length,
		resolved.magnitudeList.length,
		resolved.digitsAboveTenThousand,
		resolved.repeatChar,
		resolved.digitsList.length,
	);

	/* ------------------ 处理整数部分 ------------------ */

	const zhIntegerString = integerToZh(integerPart, resolved);

	/* ------------------ 处理小数部分 ------------------ */

	let zhFractionalString = "";
	if (fractionalPart) {
		zhFractionalString += resolved.decimalPoint;
		for (const char of fractionalPart) {
			zhFractionalString += resolved.baseNumerals[+char];
		}
	}

	const finalChineseNumber = zhIntegerString + zhFractionalString;

	return sign === "-" ? `${resolved.minusSign}${finalChineseNumber}` : finalChineseNumber;
}
