import {
	isValidNumber,
	isScientificNotation,
	parseRationalNumber,
	removeConsecutiveZeros,
	scientificToNumber,
} from "../../core/src";
import { RESOURCES } from "./constant";

export interface resourcesType {
	[key: string]: {
		digitsList: string[];
		magnitudeList: string[];
		baseNumerals: string[];
		minusSign: string;
		decimalPoint: string;
	};
}
export interface NumberToZhOptions {
	language?: keyof typeof RESOURCES;
	resources?: resourcesType;
}

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
	for (let i = 0; i < integerSize; i++) {
		const arabicIndex = integerSize - 1 - i;
		const digitsIndex = i % 4;
		const magnitudeIndex = Math.floor(i / 4);
		let magnitude = "";
		let digits = "";
		const arabicNumber = integerPart.charAt(arabicIndex);
		let chineseNumber = resolved.baseNumerals[+arabicNumber];

		// 每隔四位加一个数级
		if (digitsIndex === 0) {
			magnitude = resolved.magnitudeList[magnitudeIndex];
			// 移除「非零」整数「个位数位」上的「零」
			if (integerSize > 1 && arabicNumber === "0") {
				chineseNumber = "";
			}
		}
		// 如果值为 0 不加数位
		if (+arabicNumber > 0) {
			digits = resolved.digitsList[digitsIndex];
		}

		// 删除连续的零：一千零零零万零零零一
		finalChineseNumber = removeConsecutiveZeros(
			chineseNumber + digits + magnitude + finalChineseNumber,
			resolved.baseNumerals[0],
		);
	}

	if (fractionalPart) {
		finalChineseNumber += resolved.decimalPoint;
		for (const char of fractionalPart) {
			finalChineseNumber += resolved.baseNumerals[+char];
		}
	}

	return sign === "-" ? `${resolved.minusSign}${finalChineseNumber}` : finalChineseNumber;
}

export function resolveOptions(options: NumberToZhOptions) {
	const resources = options.resources ?? RESOURCES;
	if (options.language) {
		if (!resources.hasOwnProperty(options.language)) {
			throw new Error(`language does not appear in resources`);
		} else {
			return resources[options.language];
		}
	}
	return resources["zh-CN-lowercase"];
}
