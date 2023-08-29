import type { LanguageType, ChineseNumericType } from "../../number-to-zh/src";
import type { ZhToNumberOptions } from "../../zh-to-number/src";

export type { LanguageType, ChineseNumericType, ZhToNumberOptions };

export interface ZhCurrencyToNumberOptions extends ZhToNumberOptions {
	/**
	 * @description 辅币单位
	 */
	fractionalCurrencyUnit?: string[];

	/**
	 * @description 阿拉伯数字前面的人民币符号
	 */
	prefixSymbol?: string;

	/**
	 * @description 中文金额前缀「人民币」
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
