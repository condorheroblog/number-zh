import type { NumberTranslatorOptions } from "./numberTranslator";
import { numberTranslator } from "./numberTranslator";
import { clearZero } from "./utils";

export function integerToZh(integerPart: string, resolved: NumberTranslatorOptions) {
	const chineseZero = resolved.baseNumerals[0];
	const step = resolved.digitsAboveTenThousand;
	const integerSize = integerPart.length;
	let chineseNumberString = "";
	if (integerSize <= 12 || step === 4) {
		chineseNumberString = numberTranslator({
			wholeNumber: integerPart,
			resolved,
		});
	} else {
		const tenThousandNumber = integerPart.slice(-8);
		chineseNumberString = numberTranslator({
			wholeNumber: tenThousandNumber,
			resolved,
		});

		// 数级后面的零
		if (tenThousandNumber.charAt(0) === "0") {
			chineseNumberString = chineseZero + chineseNumberString;
		}

		// big numbers
		const octalDigitsNumbers = integerPart.slice(0, integerSize - step);
		for (let i = octalDigitsNumbers.length; i > 0; i -= step) {
			const endIndex = i;
			const startIndex = Math.max(0, i - step);
			const chunk = octalDigitsNumbers.slice(startIndex, endIndex);
			const index = Math.ceil(octalDigitsNumbers.length / step) - Math.ceil(i / step);
			let chineseNumberGroup = numberTranslator({
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
			chineseNumberString = chineseNumberGroup + chineseNumberString;
		}
		chineseNumberString = clearZero(chineseNumberString, chineseZero, ["middle", "end"]);
	}

	// 一十读作十
	if (
		resolved.skipOneBeforeTen &&
		chineseNumberString.startsWith(`${resolved.baseNumerals[1]}${resolved.digitsList[1]}`)
	) {
		chineseNumberString = chineseNumberString.slice(1);
	}

	/* ------------------ 万万｜亿亿 ------------------ */

	if (resolved.repeatChar) {
		if (resolved.repeatChar === "WW") {
			const repeatString = resolved.magnitudeList[1].repeat(2);
			const firstYiIndex = chineseNumberString.lastIndexOf(resolved.magnitudeList[2]);
			if (firstYiIndex !== -1) {
				chineseNumberString =
					chineseNumberString.slice(0, firstYiIndex).replace(new RegExp(resolved.magnitudeList[2], "g"), repeatString) +
					chineseNumberString.slice(firstYiIndex);
			}
		}
	}

	return chineseNumberString;
}
