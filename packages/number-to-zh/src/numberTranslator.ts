import type { resolveOptions } from "./resolveOptions";
export type NumberTranslatorOptions = ReturnType<typeof resolveOptions>;

import { operateSequentCharacters } from "./utils";

export function numberTranslator({
	wholeNumber,
	resolved,
}: {
	wholeNumber: string;
	resolved: NumberTranslatorOptions;
}): string {
	const integerSize = wholeNumber.length;
	const chineseZero = resolved.baseNumerals[0];
	if (!integerSize) {
		return "";
	}

	if (integerSize === 1) {
		return resolved.baseNumerals[+wholeNumber];
	} else if (integerSize <= 4) {
		/**
		 * 1：1111
		 * 2：0000
		 * 3：1000
		 * 4：0001
		 * 5：0100
		 */
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
		return operateSequentCharacters(chineseNumberGroup, chineseZero, [
			{ mode: "middle", remove: false },
			// 当数级后面的千位不为零，数级前面有零，根据条件判断数级前面是否需要一个零
			{ mode: "end", remove: !resolved.hangingZerosBeforeDigits && !resolved.hangingZerosAfterDigits },
		]);
	} else {
		/**
		 * 从高到底，递归输入的数字，例如数字：9_1234_5678 的处理逻辑
		 * 9 加上数级「亿」，后八位作为整体进行递归
		 * 1234 加上数级「万」，后四位作为整体进行递归
		 * 5678 加上数级「个」
		 * 最后得到结果：九亿一千二百三十四万五千六百七十八
		 */
		let chineseNumberGroup = "";
		const wholeNumberIndex = integerSize % 4;
		const magnitudeIndex = Math.floor((integerSize - 1) / 4);
		const numberMagnitude = resolved.magnitudeList[magnitudeIndex];

		const aboveDigitalNumber = numberTranslator({
			wholeNumber: wholeNumber.slice(0, wholeNumberIndex === 0 ? 4 : wholeNumberIndex),
			resolved,
		});
		const belowDigitalSlice = wholeNumber.slice(wholeNumberIndex === 0 ? 4 : wholeNumberIndex);
		const belowDigitalNumber = numberTranslator({
			wholeNumber: belowDigitalSlice,
			resolved,
		});

		// 高位是否存在
		if (aboveDigitalNumber.length > 0) {
			// 0000 情况下需要补一个零，否则直接添加数级
			const isStartZero = belowDigitalSlice.charAt(0) === "0";
			if (isStartZero) {
				// 当数级后面的千位为零，需要清除数级前面的零
				if (resolved.hangingZerosBeforeDigits || resolved.hangingZerosAfterDigits) {
					chineseNumberGroup =
						operateSequentCharacters(aboveDigitalNumber, chineseZero, { mode: "end" }) +
						numberMagnitude +
						chineseZero +
						belowDigitalNumber;
				} else {
					chineseNumberGroup = aboveDigitalNumber + numberMagnitude + chineseZero + belowDigitalNumber;
				}
			} else {
				// hangingZerosAfterDigits 为 true 且数级前面有零，调整零到数级的后面
				if (aboveDigitalNumber.endsWith(chineseZero) && resolved.hangingZerosAfterDigits) {
					chineseNumberGroup =
						aboveDigitalNumber.slice(0, aboveDigitalNumber.length - 1) +
						numberMagnitude +
						chineseZero +
						belowDigitalNumber;
				} else {
					chineseNumberGroup = aboveDigitalNumber + numberMagnitude + belowDigitalNumber;
				}
			}
		} else {
			chineseNumberGroup = belowDigitalNumber;
		}

		// 清除多余的零
		return operateSequentCharacters(chineseNumberGroup, chineseZero, [
			{ mode: "middle", remove: false },
			{ mode: "end" },
		]);
	}
}
