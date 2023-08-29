import type { ResolveOptionsType } from "./resolveOptions";

export function parseZhCurrency(num: number | string, options: ResolveOptionsType) {
	let numberString = num
		.toString()
		.replace(
			new RegExp(`${options.amountPrefix}|${options.amountSuffix}|${options.fractionalCurrencyUnit.join("|")}`, "g"),
			"",
		);

	const result = {
		sign: "",
		integerPart: "",
		fractionalPart: "",
	};

	if (numberString.startsWith(options.minusSign)) {
		result.sign = options.minusSign;
	} else {
		result.sign = options.positive;
	}
	numberString = numberString.replace(new RegExp(`^(${options.positive}|${options.minusSign})`, "g"), "");

	if (numberString.includes(options.CNYUnit)) {
		const parts = numberString.split(options.CNYUnit);

		result.integerPart = parts[0];

		if (parts.length > 1) {
			result.fractionalPart = parts[1];
		}
	} else {
		result.integerPart = options.baseNumerals[0];
		result.fractionalPart = numberString;
	}

	return result;
}
