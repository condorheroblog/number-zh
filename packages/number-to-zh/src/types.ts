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
	 * @default true
	 * @description 是否使用万亿
	 */
	trillion?: boolean;
	/**
	 * @default "WW"
	 * @description 启用万亿情况下，重复的数级
	 */
	repeatChar?: boolean | "WW" | "YY";
	/**
	 * @default 8
	 * @description 超过万位，分节长度
	 */
	digitalSegmentation?: 4 | "Quaternary" | 8 | "Octal";
}
