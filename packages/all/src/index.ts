import type { NumberToZhOptions } from "number-to-zh";
import type { ZhToNumberOptions } from "zh-to-number";
import type { NumberToZhCurrencyOptions } from "number-to-zh-currency";
import type { ZhCurrencyToNumberOptions } from "zh-currency-to-number";

import { numberToZh } from "number-to-zh";
import { zhToNumber } from "zh-to-number";
import { numberToZhCurrency } from "number-to-zh-currency";
import { zhCurrencyToNumber } from "zh-currency-to-number";
export { version } from "../package.json";

export type NumberZhOptions =
	| NumberToZhOptions
	| NumberToZhCurrencyOptions
	| ZhCurrencyToNumberOptions
	| ZhToNumberOptions;

export class NumberZh {
	private comprehensiveOptions: NumberZhOptions = {};

	constructor(comprehensiveOptions: NumberZhOptions = {}) {
		this.comprehensiveOptions = comprehensiveOptions;
	}

	numberToZh(num: number | string, personalizationOptions: NumberToZhOptions = {}) {
		return numberToZh(num, { ...this.comprehensiveOptions, ...personalizationOptions });
	}

	numberToZhCurrency(num: number | string, personalizationOptions: NumberToZhCurrencyOptions = {}) {
		return numberToZhCurrency(num, { ...this.comprehensiveOptions, ...personalizationOptions });
	}

	zhCurrencyToNumber(inputNumberString: string, personalizationOptions: ZhCurrencyToNumberOptions = {}) {
		return zhCurrencyToNumber(inputNumberString, { ...this.comprehensiveOptions, ...personalizationOptions });
	}

	zhToNumber(inputNumberString: string, personalizationOptions: ZhToNumberOptions = {}) {
		return zhToNumber(inputNumberString, { ...this.comprehensiveOptions, ...personalizationOptions });
	}
}
