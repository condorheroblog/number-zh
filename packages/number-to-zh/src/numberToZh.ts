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
	if (resolved.digitsList.length * resolved.magnitudeList.length < integerSize) {
		// \nThe integer part exceeds the maximum counting unit that can be represented, please set a larger magnitude
		throw new Error(`整数部分超出能表示的最大计数单位，请设置更大的数级（magnitude）`);
	}

	/* ------------------ 处理整数部分 ------------------ */
	finalChineseNumber = wholeNumberToZh({
		wholeNumber: integerPart,
		resolved,
	});

	// 一十读作十
	if (
		resolved.skipOneBeforeTen &&
		finalChineseNumber.startsWith(`${resolved.baseNumerals[1]}${resolved.digitsList[1]}`)
	) {
		finalChineseNumber = finalChineseNumber.slice(1);
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
		const magnitudeIndex = Math.floor((integerSize - 1) / 4);
		const wholeNumberIndex = integerSize % 4;
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
				resolved.magnitudeList[magnitudeIndex] +
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

	return {
		skipOneBeforeTen,
		...resources[language],
	};
}
