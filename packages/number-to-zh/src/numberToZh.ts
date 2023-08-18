import type { NumberToZhOptions } from "./types";
import {
	isValidNumber,
	isScientificNotation,
	parseRationalNumber,
	clearZero,
	scientificToNumber,
} from "../../core/src";
import { RESOURCES } from "./constant";

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
	let finalChineseNumber = "";
	const { sign, integerPart, fractionalPart } = parseRationalNumber(numString);

	const integerSize = integerPart.length;

	// 整数部分边界检测
	const errorMessage = `整数部分超出能表示的最大计数单位，请设置更大的数级（magnitude）`;
	if (resolved.magnitudeList.length > 2) {
		if (
			!resolved.repeatChar &&
			2 * 4 + resolved.digitsAboveTenThousand * (resolved.magnitudeList.length - 2) < integerSize
		) {
			throw new Error(errorMessage);
		}
	} else {
		if (resolved.digitsList.length * resolved.magnitudeList.length < integerSize) {
			throw new Error(errorMessage);
		}
	}

	/* ------------------ 处理整数部分 ------------------ */
	if (integerSize <= 12 || resolved.digitsAboveTenThousand === 4) {
		finalChineseNumber = wholeNumberToZh({
			wholeNumber: integerPart,
			resolved,
		});
	} else {
		finalChineseNumber = wholeNumberToZh({
			wholeNumber: integerPart.slice(-8),
			resolved,
		});

		finalChineseNumber = (integerPart.slice(-8).charAt(0) === "0" ? resolved.baseNumerals[0] : "") + finalChineseNumber;

		// big numbers
		const step = resolved.digitsAboveTenThousand;
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
					chineseNumberGroup = resolved.baseNumerals[0];
				}
			}
			finalChineseNumber = chineseNumberGroup + finalChineseNumber;
		}
		finalChineseNumber = clearZero(finalChineseNumber, resolved.baseNumerals[0], ["middle", "end"]);
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
	const withoutTrailingZeros = clearZero(fractionalPart, "0", ["end"]);

	if (withoutTrailingZeros) {
		finalChineseNumber += resolved.decimalPoint;
		for (const char of withoutTrailingZeros) {
			finalChineseNumber += resolved.baseNumerals[+char];
		}
	}

	return sign === "-" ? `${resolved.minusSign}${finalChineseNumber}` : finalChineseNumber;
}

export function wholeNumberToZh({
	wholeNumber,
	resolved,
}: {
	wholeNumber: string;
	resolved: ReturnType<typeof resolveOptions>;
}): string {
	const integerSize = wholeNumber.length;
	if (!integerSize) {
		return "";
	}

	if (integerSize === 1) {
		return resolved.baseNumerals[+wholeNumber];
	} else if (integerSize <= 4) {
		let chineseNumberGroup = "";
		for (let i = 0; i < integerSize; i++) {
			const arabicIndex = integerSize - 1 - i;
			const digitsIndex = i % 4;
			let digits = "";
			const arabicNumber = wholeNumber.charAt(arabicIndex);
			const chineseNumber = resolved.baseNumerals[+arabicNumber];

			// 如果值为 0 不加数位
			if (+arabicNumber > 0) {
				digits = resolved.digitsList[digitsIndex];
			}
			chineseNumberGroup = chineseNumber + digits + chineseNumberGroup;
		}
		return clearZero(chineseNumberGroup, resolved.baseNumerals[0], ["middle", "end"]);
	} else {
		let chineseNumberGroup = "";
		const wholeNumberIndex = integerSize % 4;
		const magnitudeIndex = Math.floor((integerSize - 1) / 4);
		const numberMagnitude = resolved.magnitudeList[magnitudeIndex];

		const aboveDigitalNumber = wholeNumberToZh({
			wholeNumber: wholeNumber.slice(0, wholeNumberIndex === 0 ? 4 : wholeNumberIndex),
			resolved,
		});
		const belowDigitalSlice = wholeNumber.slice(wholeNumberIndex === 0 ? 4 : wholeNumberIndex);
		const belowDigitalNumber = wholeNumberToZh({
			wholeNumber: belowDigitalSlice,
			resolved,
		});

		if (aboveDigitalNumber.length > 0) {
			chineseNumberGroup =
				aboveDigitalNumber +
				numberMagnitude +
				(belowDigitalSlice.charAt(0) === "0" ? resolved.baseNumerals[0] : "") +
				belowDigitalNumber;
		} else {
			chineseNumberGroup = belowDigitalNumber;
		}
		return clearZero(chineseNumberGroup, resolved.baseNumerals[0], ["middle", "end"]);
	}
}

export function resolveOptions(options: NumberToZhOptions) {
	const resources = options.resources ?? RESOURCES;
	if (options.language && !resources.hasOwnProperty(options.language)) {
		throw new Error(`language does not appear in resources`);
	}

	const language = options.language ?? "zh-CN-lowercase";
	const skipOneBeforeTen = options.skipOneBeforeTen ?? false;

	let digitsAboveTenThousand = options.digitsAboveTenThousand;
	let repeatChar = options.repeatChar;

	if (["zh-CN-lowercase", "zh-CN-uppercase"].includes(language)) {
		digitsAboveTenThousand = digitsAboveTenThousand ?? 8;
		repeatChar = repeatChar ?? "WW";
	} else {
		digitsAboveTenThousand = digitsAboveTenThousand ?? 4;
		repeatChar = repeatChar ?? false;
	}

	if (digitsAboveTenThousand === "Octal") {
		digitsAboveTenThousand = 8;
	}
	if (digitsAboveTenThousand === "Quaternary") {
		digitsAboveTenThousand = 4;
	}

	return {
		skipOneBeforeTen,
		digitsAboveTenThousand,
		repeatChar,
		...resources[language],
	};
}
