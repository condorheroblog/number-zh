import type { LanguageType, ChineseNumericType, NumberToZhOptions } from "../../number-to-zh/src";

export type { LanguageType, ChineseNumericType, NumberToZhOptions };

export interface NumberToZhCurrencyOptions extends NumberToZhOptions {
	/**
	 * @default true
	 * @description 金额在角位结束时，是否添加「正｜整」
	 */
	tenCentsSuffix?: boolean;

	/**
	 * @default false
	 * @description 元位是 0，但角位不是 0，是否保留中文零
	 */
	preserveOnesPlaceZero?: boolean;

	/**
	 * @description 辅币单位
	 */
	fractionalCurrencyUnit?: string[];

	/**
	 * @description 阿拉伯数字前面的人民币符号
	 */
	prefixSymbol?: string;

	/**
	 * @description 中文「人民币」
	 */
	amountPrefix?: string;

	/**
	 * @default 圆
	 * @description 人民币单位
	 */
	CNYUnit?: string;

	/**
	 * @default 整
	 * @description 大写金额后缀正或者整
	 */
	amountSuffix?: string;
}
