import type { NumberToZhOptions } from "./types";
import { resolveOptions } from "./resolveOptions";
import { wholeNumberToZh } from "./wholeNumberToZh";
import {
	isValidNumber,
	isScientificNotation,
	parseRationalNumber,
	clearZero,
	scientificToNumber,
} from "../../core/src";

export default numberToZh;
export function numberToZh(num: number | string, options: NumberToZhOptions = {}) {
	let numString = num.toString();
	if (!isValidNumber(num)) {
		if (isScientificNotation(num)) {
			numString = scientificToNumber(numString);
		} else {
			throw new Error("Invalid input. Please provide a valid number.");
		}
	}

	const resolved = resolveOptions(options);
	const step = resolved.digitsAboveTenThousand;
	const magnitudeListSize = resolved.magnitudeList.length;
	const chineseZero = resolved.baseNumerals[0];

	let finalChineseNumber = "";
	const { sign, integerPart, fractionalPart } = parseRationalNumber(numString);
	const integerSize = integerPart.length;

	// 整数部分边界检测
	const errorMessage = `整数部分超出能表示的最大计数单位，请设置更大的数级（magnitude）`;
	if (magnitudeListSize > 2) {
		if (!resolved.repeatChar && 2 * 4 + step * (magnitudeListSize - 2) < integerSize) {
			throw new Error(errorMessage);
		}
	} else {
		if (resolved.digitsList.length * magnitudeListSize < integerSize) {
			throw new Error(errorMessage);
		}
	}

	/* ------------------ 处理整数部分 ------------------ */

	if (integerSize <= 12 || step === 4) {
		finalChineseNumber = wholeNumberToZh({
			wholeNumber: integerPart,
			resolved,
		});
	} else {
		const tenThousandNumber = integerPart.slice(-8);
		finalChineseNumber = wholeNumberToZh({
			wholeNumber: tenThousandNumber,
			resolved,
		});

		// 数级后面的零
		if (tenThousandNumber.charAt(0) === "0") {
			finalChineseNumber = chineseZero + finalChineseNumber;
		}

		// big numbers
		const octalDigitsNumbers = integerPart.slice(0, integerSize - step);
		for (let i = octalDigitsNumbers.length; i > 0; i -= step) {
			const endIndex = i;
			const startIndex = Math.max(0, i - step);
			const chunk = octalDigitsNumbers.slice(startIndex, endIndex);
			const index = Math.ceil(octalDigitsNumbers.length / step) - Math.ceil(i / step);
			let chineseNumberGroup = wholeNumberToZh({
				wholeNumber: chunk,
				resolved,
			});

			if (resolved.repeatChar) {
				chineseNumberGroup = chineseNumberGroup + resolved.magnitudeList[2];
			} else {
				if (chineseNumberGroup.length > 0) {
					chineseNumberGroup = chineseNumberGroup + resolved.magnitudeList[index + 2];
				} else {
					chineseNumberGroup = chineseZero;
				}
			}
			finalChineseNumber = chineseNumberGroup + finalChineseNumber;
		}
		finalChineseNumber = clearZero(finalChineseNumber, chineseZero, ["middle", "end"]);
	}

	// 一十读作十
	if (
		resolved.skipOneBeforeTen &&
		finalChineseNumber.startsWith(`${resolved.baseNumerals[1]}${resolved.digitsList[1]}`)
	) {
		finalChineseNumber = finalChineseNumber.slice(1);
	}

	/* ------------------ 万万｜亿亿 ------------------ */

	if (resolved.repeatChar) {
		if (resolved.repeatChar === "WW") {
			const repeatString = resolved.magnitudeList[1] + resolved.magnitudeList[1];
			const firstYiIndex = finalChineseNumber.lastIndexOf(resolved.magnitudeList[2]);
			if (firstYiIndex !== -1) {
				finalChineseNumber =
					finalChineseNumber.slice(0, firstYiIndex).replace(new RegExp(resolved.magnitudeList[2], "g"), repeatString) +
					finalChineseNumber.slice(firstYiIndex);
			}
		}
	}

	/* ------------------ 处理小数部分 ------------------ */

	if (fractionalPart) {
		finalChineseNumber += resolved.decimalPoint;
		for (const char of fractionalPart) {
			finalChineseNumber += resolved.baseNumerals[+char];
		}
	}

	return sign === "-" ? `${resolved.minusSign}${finalChineseNumber}` : finalChineseNumber;
}
