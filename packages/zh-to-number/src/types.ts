import type { LanguageType, resourcesType } from "../../number-to-zh/src";

export interface ZhToNumberOptions {
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
