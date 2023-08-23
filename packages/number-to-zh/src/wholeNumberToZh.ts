import type { resolveOptions } from "./resolveOptions";
export type wholeNumberToZhOptions = ReturnType<typeof resolveOptions>;

import { clearZero } from "./utils";

export function wholeNumberToZh({
	wholeNumber,
	resolved,
}: {
	wholeNumber: string;
	resolved: wholeNumberToZhOptions;
}): string {
	const integerSize = wholeNumber.length;
	const chineseZero = resolved.baseNumerals[0];
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
		return clearZero(chineseNumberGroup, chineseZero, ["middle", "end"]);
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
				(belowDigitalSlice.charAt(0) === "0" ? chineseZero : "") +
				belowDigitalNumber;
		} else {
			chineseNumberGroup = belowDigitalNumber;
		}
		return clearZero(chineseNumberGroup, chineseZero, ["middle", "end"]);
	}
}
