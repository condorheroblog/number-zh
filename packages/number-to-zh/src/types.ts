import type { RESOURCES } from "./constant";

export type LanguageType = keyof typeof RESOURCES;
export type ChineseNumericType = {
	digitsList?: string[];
	magnitudeList?: string[];
	baseNumerals?: string[];
	minusSign?: string;
	decimalPoint?: string;
};

export interface NumberToZhOptions extends ChineseNumericType {
	language?: LanguageType;

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

	/**
	 * @default _
	 * @description 字符串数字中支持原生数字分节
	 */
	numericUnderscores?: string;

	/**
	 * @default false
	 * @description 数级的个位是零，上一个数级的千位不是零，零可以有三种写法，false：零省略，before：零出现在数级前面，after：零出现在数级的后面（人民银行规定的错误写法）。
	 * @example
	 * false  205000 => 二十万五千
	 * before 205000 => 二十{零}万五千
	 * after  205000 => 二十万{零}五千
	 */
	hangingZerosAroundDigits?: false | "before" | "after";
}
