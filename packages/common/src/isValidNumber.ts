export const NUMBER_REGEX = /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/;

export function isValidNumber(num: number | string) {
	const numString = num.toString();
	return NUMBER_REGEX.test(numString);
}
