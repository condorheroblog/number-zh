import type { LanguageType, ChineseNumericType } from "../../number-to-zh/src";

export type { LanguageType, ChineseNumericType };

export interface NumberToMoneyOptions extends ChineseNumericType {
	language?: LanguageType;
	centShowAmountSuffix?: boolean;
	preserveTenThousandsPlaceZero?: boolean;
	preserveOnesPlaceZero?: boolean;
	fractionalCurrencyUnit?: string[];
	prefixSymbol?: string;
	amountPrefix?: string;
	CNYUnit?: string;
	amountSuffix?: string;
}
