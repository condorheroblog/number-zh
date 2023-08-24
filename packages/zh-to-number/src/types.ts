import type { LanguageType, ChineseNumericType } from "../../number-to-zh/src";

export type { LanguageType, ChineseNumericType };

export interface ZhToNumberOptions extends ChineseNumericType {
	thousandsSeparator?: boolean;
	language?: LanguageType;
	positive?: string;
}
