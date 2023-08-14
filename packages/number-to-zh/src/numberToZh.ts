import {
	isValidNumber,
	isScientificNotation,
	parseRationalNumber,
	removeConsecutiveZeros,
	scientificToNumber,
} from ".";
import { MINUS_SIGN, DECIMAL_POINT, DIGITS_LIST, MAGNITUDE_LIST, LOWERCASE_CHINESE_NUMERALS } from "./constant";

export interface NumberToZhOptions {
	digitsList?: string[];
	magnitudeList?: string[];
	minusSign?: string;
	decimalPoint?: string;
}

export function numberToZh(num: number | string, options: NumberToZhOptions = {}) {
	let numString = num.toString();
	if (!isValidNumber(num)) {
		if (isScientificNotation(num)) {
			numString = scientificToNumber(numString);
		} else {
			throw new Error("Invalid input. Not an effective Scientific notation.");
		}
	}

	const resolved = resolveOptions(options);
	let finalChineseNumber = "";
	const { sign, integerPart, fractionalPart } = parseRationalNumber(numString);

	const integerSize = integerPart.length;
	for (let i = 0; i < integerSize; i++) {
		const arabicIndex = integerSize - 1 - i;
		const digitsIndex = i % 4;
		const magnitudeIndex = Math.floor(i / 4);
		let magnitude = "";
		let digits = "";
		const arabicNumber = integerPart.charAt(arabicIndex);
		let chineseNumber = LOWERCASE_CHINESE_NUMERALS[+arabicNumber];

		// 每隔四位加一个数级
		if (digitsIndex === 0) {
			magnitude = resolved.magnitudeList[magnitudeIndex];
			// 移除「非零」整数「个位数位」上的「零」
			if (integerSize > 1 && arabicNumber === "0") {
				chineseNumber = "";
			}
		}
		// 如果值 0 不加数位
		if (+arabicNumber > 0) {
			digits = resolved.digitsList[digitsIndex];
		}

		// 删除连续的零：一千零零零万零零零一
		finalChineseNumber = removeConsecutiveZeros(
			chineseNumber + digits + magnitude + finalChineseNumber,
			LOWERCASE_CHINESE_NUMERALS[0],
		);
	}

	if (fractionalPart) {
		finalChineseNumber += resolved.decimalPoint;
		for (const char of fractionalPart) {
			finalChineseNumber += LOWERCASE_CHINESE_NUMERALS[+char];
		}
	}

	return sign === "-" ? `${resolved.minusSign}${finalChineseNumber}` : finalChineseNumber;
}

export function resolveOptions(options: NumberToZhOptions) {
	return {
		digitsList: options.digitsList ?? DIGITS_LIST,
		magnitudeList: options.magnitudeList ?? MAGNITUDE_LIST,
		minusSign: options.minusSign ?? MINUS_SIGN,
		decimalPoint: options.decimalPoint ?? DECIMAL_POINT,
	};
}
