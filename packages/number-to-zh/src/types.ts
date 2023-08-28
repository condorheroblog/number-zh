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
	 * @default false
	 * @description 数级后面的千位不是零，数级前面的个位是零，零加在数级的「前」面，正常情况是省略的。
	 * @example 205000 => 二十{零}万五千
	 */
	hangingZerosBeforeDigits?: boolean;

	/**
	 * @default false
	 * @description 数级后面的千位不是零，数级前面的个位是零，零加在数级的「后」面，人民银行规定的错误写法。
	 * @example 205000 => 二十万{零}五千
	 */
	hangingZerosAfterDigits?: boolean;
}
