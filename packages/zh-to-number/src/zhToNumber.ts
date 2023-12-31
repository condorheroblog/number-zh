import { ZhToNumberOptions } from "./types";
import { checkCharacters } from "./checkCharacters";
import { resolveOptions } from "./resolveOptions";
import { parseZhNumber } from "./parseZhNumber";
import { stringAddition } from "./utils";

export function zhToNumber(inputNumberString: string, options: ZhToNumberOptions = {}) {
	if (typeof inputNumberString === "string") {
		inputNumberString = inputNumberString.trim();
		const resolved = resolveOptions(options);
		const comparisonString = [
			resolved.minusSign,
			...resolved.baseNumerals,
			...resolved.digitsList,
			...resolved.magnitudeList,
			resolved.decimalPoint,
			resolved.positive,
		];
		const isChineseNumerals = checkCharacters(inputNumberString, comparisonString.join(","));
		if (isChineseNumerals) {
			// 十 => 一十
			if (inputNumberString.startsWith(`${resolved.digitsList[1]}`)) {
				inputNumberString = resolved.baseNumerals[1] + inputNumberString;
			} else {
				if (
					inputNumberString.startsWith(`${resolved.positive}${resolved.digitsList[1]}`) ||
					inputNumberString.startsWith(`${resolved.minusSign}${resolved.digitsList[1]}`)
				) {
					inputNumberString = inputNumberString.charAt(0) + resolved.baseNumerals[1] + inputNumberString.slice(1);
				}
			}

			// +0, 0, -0, return +0
			if (inputNumberString === `${resolved.minusSign}${resolved.baseNumerals[0]}`) {
				inputNumberString = inputNumberString.slice(1);
			}

			const { sign, integerPart, fractionalPart } = parseZhNumber(
				inputNumberString,
				resolved.minusSign,
				resolved.decimalPoint,
			);

			let arabicNumber = "";
			let magnitudeNumber = "";
			let digitsNumber = "";
			let currentMagnitudeIndex = Infinity;

			for (let i = 0; i < integerPart.length; i += 1) {
				//  数值
				const currentChar = integerPart[i];
				const charIndex = resolved.baseNumerals.indexOf(currentChar);
				if (charIndex > -1) {
					// 存储有数位的数值
					digitsNumber = String(charIndex);
				} else {
					const digitsIndex = resolved.digitsList.indexOf(currentChar);
					if (digitsIndex > -1) {
						digitsNumber += new Array(digitsIndex + 1).join("0");
						magnitudeNumber = stringAddition(magnitudeNumber, digitsNumber);
						digitsNumber = "";
					} else {
						const magnitudeIndex = resolved.magnitudeList.indexOf(currentChar);
						if (magnitudeIndex > -1) {
							magnitudeNumber = stringAddition(magnitudeNumber, digitsNumber);
							const multipleZero = new Array(1 + magnitudeIndex * 4).join("0");

							if (currentMagnitudeIndex <= magnitudeIndex) {
								arabicNumber = stringAddition(arabicNumber, magnitudeNumber) + multipleZero;
							} else {
								arabicNumber = stringAddition(arabicNumber, `${magnitudeNumber}${multipleZero}`);
							}
							currentMagnitudeIndex = magnitudeIndex;
							magnitudeNumber = "";
							digitsNumber = "";
						}
					}
				}
			}

			arabicNumber = stringAddition(arabicNumber, stringAddition(magnitudeNumber, digitsNumber));
			digitsNumber = "";
			magnitudeNumber = "";

			/* ------------------ 添加千位分隔符 ------------------ */

			if (resolved.thousandsSeparator) {
				// format(value: number | string | bigint) https://github.com/microsoft/TypeScript/issues/52124
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				arabicNumber = new Intl.NumberFormat("en-US").format(arabicNumber);
			}

			/* ------------------ 处理小数部分 ------------------ */

			if (fractionalPart) {
				arabicNumber += ".";
				for (const char of fractionalPart) {
					arabicNumber += resolved.baseNumerals.indexOf(char);
				}
			}

			return sign === "-" ? `-${arabicNumber}` : arabicNumber;
		} else {
			return NaN;
		}
	} else {
		return NaN;
	}
}
