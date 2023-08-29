import type { ZhCurrencyToNumberOptions } from "./types";
import { FRACTIONAL_CURRENCY_UNIT, PREFIX_SYMBOL, CNY_UNIT, AMOUNT_SUFFIX, AMOUNT_PREFIX } from "./constant";
import { resolveZhToNumberOptions } from "./utils";

export type ResolveOptionsType = ReturnType<typeof resolveOptions>;

export function resolveOptions(options: ZhCurrencyToNumberOptions) {
	const resolvedZhToNumberOptions = resolveZhToNumberOptions({
		...options,
		language: options.language ?? "zh-CN-uppercase",
	});

	return {
		fractionalCurrencyUnit: options.fractionalCurrencyUnit ?? FRACTIONAL_CURRENCY_UNIT,
		prefixSymbol: options.prefixSymbol ?? PREFIX_SYMBOL,
		amountPrefix: options.amountPrefix ?? AMOUNT_PREFIX,
		CNYUnit: options.CNYUnit ?? CNY_UNIT,
		amountSuffix: options.amountSuffix ?? AMOUNT_SUFFIX,

		...resolvedZhToNumberOptions,
	};
}
