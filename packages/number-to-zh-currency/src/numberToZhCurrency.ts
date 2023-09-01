import type { NumberToZhCurrencyOptions } from "./types";
import { resolveOptions } from "./resolveOptions";
import {
	integerToZh,
	isValidNumber,
	isScientificNotation,
	parseRationalNumber,
	scientificToNumber,
	detectIntegerBoundary,
} from "./utils";

export function numberToZhCurrency(num: number | string, options: NumberToZhCurrencyOptions = {}) {
	const resolved = resolveOptions(options);
	let numString = num.toString().replace(new RegExp(`${resolved.prefixSymbol}`, "g"), "");
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

	const integerToZhOptions = {
		skipOneBeforeTen: resolved.skipOneBeforeTen,
		digitsAboveTenThousand: resolved.digitsAboveTenThousand,
		repeatChar: resolved.repeatChar,
		digitsList: resolved.digitsList,
		magnitudeList: resolved.magnitudeList,
		baseNumerals: resolved.baseNumerals,
		minusSign: resolved.minusSign,
		decimalPoint: resolved.decimalPoint,
		hangingZerosAroundDigits: resolved.hangingZerosAroundDigits,
		numericUnderscores: resolved.numericUnderscores,
	};

	const zhIntegerString = integerToZh(integerPart, integerToZhOptions);

	/* - 大于 1 元且元位是 0 但角位不是 0 时，中文大写金额中可以只写一个零字，也可以不写零字 - */
	let onesPlaceZero = "";
	if (
		integerPart.length > 1 &&
		integerPart.at(-1) === "0" &&
		fractionalPart.charAt(0) !== "0" &&
		resolved.preserveOnesPlaceZero
	) {
		onesPlaceZero = resolved.baseNumerals[0];
	}

	let newZhIntegerString = zhIntegerString + resolved.CNYUnit;

	//  preserveOnesPlaceZero = false, 0.1 => 一角 not 零元一角
	if (
		integerPart === "0" &&
		fractionalPart.length &&
		!resolved.preserveOnesPlaceZero &&
		fractionalPart.charAt(0) !== "0"
	) {
		newZhIntegerString = "";
	}

	/* ------------------ 处理小数部分 ------------------ */

	let zhFractionalString = "";

	let only = "";
	if (fractionalPart) {
		const fractionalLength = resolved.fractionalCurrencyUnit.length;
		const fractionalString = fractionalPart.slice(0, fractionalLength);
		for (let i = 0; i < fractionalString.length; i++) {
			const char = fractionalString[i];
			const zhNumber = resolved.baseNumerals[+char];
			if (char === "0") {
				zhFractionalString += zhNumber;
			} else {
				zhFractionalString += `${zhNumber}${resolved.fractionalCurrencyUnit[i]}`;
			}

			if (i === 0 && i === fractionalString.length - 1 && resolved.tenCentsSuffix) {
				zhFractionalString += resolved.amountSuffix;
			}
		}
	} else {
		only = resolved.amountSuffix;
	}

	const unSignChineseNumber = newZhIntegerString + onesPlaceZero + only + zhFractionalString;

	const signChineseNumber = sign === "-" ? `${resolved.minusSign}${unSignChineseNumber}` : unSignChineseNumber;
	return resolved.amountPrefix + signChineseNumber;
}
