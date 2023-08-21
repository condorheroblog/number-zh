import { ZhToNumberOptions } from "./types";
import { stringAddition } from "../../number-to-zh/src";
import { checkCharacters } from "./checkCharacters";
import { resolveOptions } from "./resolveOptions";
import { parseZhNumber } from "./parseZhNumber";
import { positive } from "./constant";

export function zhToNumber(inputNumberString: string, options: ZhToNumberOptions = {}) {
	if (typeof inputNumberString === "string") {
		inputNumberString = inputNumberString.trim();
		const resolved = resolveOptions(options);
		const comparisonString = [
			...resolved.minusSign,
			...resolved.baseNumerals,
			...resolved.digitsList,
			...resolved.magnitudeList,
			...resolved.decimalPoint,
			positive,
		];
		const isChineseNumerals = checkCharacters(inputNumberString, comparisonString.join(","));
		if (isChineseNumerals) {
			const { sign, integerPart, fractionalPart } = parseZhNumber(
				inputNumberString,
				resolved.minusSign,
				resolved.decimalPoint,
			);
			let arabicNumber = "";
			let currentNumber = "";

			for (let i = 0; i < integerPart.length; i += 1) {
				const currentChar = integerPart[i];
				const charIndex = resolved.baseNumerals.indexOf(currentChar);
				if (charIndex > -1) {
					currentNumber = String(charIndex);
				} else {
					const digitsIndex = resolved.digitsList.indexOf(currentChar);
					let magnitudeString = "";
					if (digitsIndex > -1) {
						currentNumber += new Array(digitsIndex + 1).join("0");
					} else {
						const magnitudeIndex = resolved.magnitudeList.indexOf(currentChar);
						if (magnitudeIndex > -1) {
							magnitudeString = new Array(1 + magnitudeIndex * 4).join("0");
						}
					}
					arabicNumber = stringAddition(arabicNumber, currentNumber) + magnitudeString;
					currentNumber = "";
				}
			}

			if (currentNumber.length > 0) {
				arabicNumber = stringAddition(arabicNumber, currentNumber);
				currentNumber = "";
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
		throw new Error("请提供一个字符串");
	}
}

const result = zhToNumber("正一千二百三十四万五千六百七十八点八七六五");

console.log(result);
