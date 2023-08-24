import type { ZhToNumberOptions } from "./types";
import { RESOURCES, positive } from "./constant";

export function resolveOptions(options: ZhToNumberOptions) {
	const language = options.language ?? "zh-CN-lowercase";

	if (!RESOURCES.hasOwnProperty(language)) {
		throw new Error(`${language} does not appear in resources`);
	}

	const languageConfig = RESOURCES[language];

	return {
		thousandsSeparator: options.thousandsSeparator ?? false,
		digitsList: options.digitsList ?? languageConfig.digitsList,
		magnitudeList: options.magnitudeList ?? languageConfig.magnitudeList,
		baseNumerals: options.baseNumerals ?? languageConfig.baseNumerals,
		minusSign: options.minusSign ?? languageConfig.minusSign,
		decimalPoint: options.decimalPoint ?? languageConfig.decimalPoint,
		positive: options.positive ?? positive,
	};
}
