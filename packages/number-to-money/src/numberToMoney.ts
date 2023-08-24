import type { NumberToMoneyOptions } from "./types";
import { resolveOptions } from "./resolveOptions";

export function numberToMoney(num: number | string, options: NumberToMoneyOptions = {}) {
	const resolved = resolveOptions(options);
	const fractionalLength = resolved.fractionalCurrencyUnit.length;
	console.log(resolved, fractionalLength);
	return num;
}
