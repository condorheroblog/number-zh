export const SCIENTIFIC_NOTATION_REGEX = /^[-+]?[0-9]+(\.[0-9]+)?[eE][-+]?[0-9]+$/;

export function isScientificNotation(num: number | string) {
	const numString = num.toString();
	return SCIENTIFIC_NOTATION_REGEX.test(numString);
}
