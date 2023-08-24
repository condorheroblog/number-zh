import type { NumberToMoneyOptions } from "./types";
import { RESOURCES, FRACTIONAL_CURRENCY_UNIT, PREFIX_SYMBOL, CNY_UNIT, AMOUNT_SUFFIX, AMOUNT_PREFIX } from "./constant";

export function resolveOptions(options: NumberToMoneyOptions) {
	const language = options.language ?? "zh-CN-uppercase";

	if (!RESOURCES.hasOwnProperty(language)) {
		throw new Error(`${language} does not appear in resources`);
	}

	const languageConfig = RESOURCES[language];

	return {
		centShowAmountSuffix: options.centShowAmountSuffix ?? true,
		preserveTenThousandsPlaceZero: options.centShowAmountSuffix ?? true,
		preserveOnesPlaceZero: options.preserveOnesPlaceZero ?? false,
		fractionalCurrencyUnit: options.fractionalCurrencyUnit ?? FRACTIONAL_CURRENCY_UNIT,
		prefixSymbol: options.prefixSymbol ?? PREFIX_SYMBOL,
		amountPrefix: options.amountPrefix ?? AMOUNT_PREFIX,
		CNYUnit: options.CNYUnit ?? CNY_UNIT,
		amountSuffix: options.digitsList ?? AMOUNT_SUFFIX,

		digitsList: options.digitsList ?? languageConfig.digitsList,
		magnitudeList: options.magnitudeList ?? languageConfig.magnitudeList,
		baseNumerals: options.baseNumerals ?? languageConfig.baseNumerals,
		minusSign: options.minusSign ?? languageConfig.minusSign,
		decimalPoint: options.decimalPoint ?? languageConfig.decimalPoint,
	};
}
