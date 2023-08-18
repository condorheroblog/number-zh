import type { RESOURCES } from "./constant";

export interface resourcesType {
	[key: string]: {
		digitsList: string[];
		magnitudeList: string[];
		baseNumerals: string[];
		minusSign: string;
		decimalPoint: string;
	};
}

export type LanguageType = keyof typeof RESOURCES;

export interface NumberToZhOptions {
	language?: LanguageType;
	resources?: resourcesType;
	skipOneBeforeTen?: boolean;
	/**
	 * @default "WW"
	 * @description 启用万亿情况下，重复的数级
	 */
	repeatChar?: false | "WW" | "YY";
	/**
	 * @default 8
	 * @description 超过万位 10^8，分节长度
	 */
	digitsAboveTenThousand?: 4 | "Quaternary" | 8 | "Octal";
}
