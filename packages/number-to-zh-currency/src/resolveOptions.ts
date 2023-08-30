import type { NumberToZhCurrencyOptions } from "./types";
import { FRACTIONAL_CURRENCY_UNIT, PREFIX_SYMBOL, CNY_UNIT, AMOUNT_SUFFIX, AMOUNT_PREFIX } from "./constant";
import { resolveNumberToZhOptions } from "./utils";

export function resolveOptions(options: NumberToZhCurrencyOptions) {
	const resolvedNumberToZhOptions = resolveNumberToZhOptions({
		...options,
		language: options.language ?? "zh-CN-uppercase",
	});

	return {
		tenCentsSuffix: options.tenCentsSuffix ?? true,
		preserveOnesPlaceZero: options.preserveOnesPlaceZero ?? false,
		fractionalCurrencyUnit: options.fractionalCurrencyUnit ?? FRACTIONAL_CURRENCY_UNIT,
		prefixSymbol: options.prefixSymbol ?? PREFIX_SYMBOL,
		amountPrefix: options.amountPrefix ?? AMOUNT_PREFIX,
		CNYUnit: options.CNYUnit ?? CNY_UNIT,
		amountSuffix: options.amountSuffix ?? AMOUNT_SUFFIX,

		...resolvedNumberToZhOptions,
		hangingZerosAfterDigits: options.hangingZerosAfterDigits ?? true,
		numericUnderscores: options.numericUnderscores ?? ",",
	};
}
