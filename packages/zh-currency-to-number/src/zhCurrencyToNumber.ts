import type { ZhCurrencyToNumberOptions } from "./types";
import { resolveOptions } from "./resolveOptions";
import { parseZhCurrency } from "./parseZhCurrency";
import { zhToNumber, checkCharacters } from "./utils";

export function zhCurrencyToNumber(inputNumberString: string, options: ZhCurrencyToNumberOptions = {}) {
	const resolved = resolveOptions(options);

	const comparisonString = [
		resolved.minusSign,
		...resolved.baseNumerals,
		...resolved.digitsList,
		...resolved.magnitudeList,
		resolved.positive,
		resolved.CNYUnit,
		...resolved.fractionalCurrencyUnit,
		...resolved.amountPrefix,
		...resolved.amountSuffix,
	];

	const isMatch = checkCharacters(inputNumberString, comparisonString.join(","));

	if (isMatch) {
		// preserveOnesPlaceZero 捌拾圆{零}叁角贰分
		const unit = inputNumberString.indexOf(resolved.CNYUnit);
		const tenCentsIndex = inputNumberString.indexOf(resolved.fractionalCurrencyUnit[0]);
		if (unit > -1 && tenCentsIndex > -1 && inputNumberString.charAt(unit + 1) === resolved.baseNumerals[0]) {
			const leftString = inputNumberString.slice(0, unit);
			const middleString = inputNumberString.slice(unit, tenCentsIndex).split(resolved.baseNumerals[0]).join(",");
			const rightString = inputNumberString.slice(tenCentsIndex);
			inputNumberString = leftString + middleString + rightString;
		}

		const { sign, integerPart, fractionalPart } = parseZhCurrency(inputNumberString, resolved);

		const zhToNumberOptions = {
			thousandsSeparator: resolved.thousandsSeparator,
			digitsList: resolved.digitsList,
			magnitudeList: resolved.magnitudeList,
			baseNumerals: resolved.baseNumerals,
			minusSign: resolved.minusSign,
			decimalPoint: resolved.decimalPoint,
			positive: resolved.positive,
		};

		const integer = zhToNumber(`${sign}${integerPart}`, zhToNumberOptions);

		if (fractionalPart.length) {
			let arabicFractional = ".";
			for (const char of fractionalPart) {
				const charIndex = resolved.baseNumerals.indexOf(char);
				if (charIndex > -1) {
					arabicFractional += charIndex;
				}
			}

			return resolved.prefixSymbol + integer + arabicFractional;
		}

		return resolved.prefixSymbol + integer;
	}

	return NaN;
}
