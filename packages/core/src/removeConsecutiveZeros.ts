export function removeConsecutiveZeros(str: string, searchString = "0") {
	return str.replace(new RegExp(`${searchString}+`, "g"), searchString);
}
