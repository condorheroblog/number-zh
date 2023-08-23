import type { NumberToZhOptions } from "./types";
import { RESOURCES } from "./constant";

const CN_LIST = ["zh-CN-lowercase", "zh-CN-uppercase"];

export function resolveOptions(options: NumberToZhOptions) {
	const language = options.language ?? "zh-CN-lowercase";
	if (!RESOURCES.hasOwnProperty(language)) {
		throw new Error(`${language} does not appear in resources`);
	}
	const skipOneBeforeTen = options.skipOneBeforeTen ?? false;
	let digitsAboveTenThousand = options.digitsAboveTenThousand;
	let repeatChar = options.repeatChar;

	const defaultResources = { ...RESOURCES };
	if (digitsAboveTenThousand === 8) {
		const listMap = { ...defaultResources[language] };
		const magnitudeList = listMap.magnitudeList.slice(0, 3);
		listMap.magnitudeList = magnitudeList;
	}

	const languageConfig = defaultResources[language];

	if (CN_LIST.includes(language)) {
		digitsAboveTenThousand = digitsAboveTenThousand ?? 8;
		repeatChar = repeatChar ?? "WW";
	} else {
		digitsAboveTenThousand = digitsAboveTenThousand ?? 4;
		repeatChar = repeatChar ?? false;
	}

	if (digitsAboveTenThousand === "Octal") {
		digitsAboveTenThousand = 8;
	}
	if (digitsAboveTenThousand === "Quaternary") {
		digitsAboveTenThousand = 4;
	}

	return {
		skipOneBeforeTen,
		digitsAboveTenThousand,
		repeatChar,

		digitsList: options.digitsList ?? languageConfig.digitsList,
		magnitudeList: options.magnitudeList ?? languageConfig.magnitudeList,
		baseNumerals: options.baseNumerals ?? languageConfig.baseNumerals,
		minusSign: options.minusSign ?? languageConfig.minusSign,
		decimalPoint: options.decimalPoint ?? languageConfig.decimalPoint,
	};
}
