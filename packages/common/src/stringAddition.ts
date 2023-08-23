export function stringAddition(string1: string, string2: string) {
	const bigInt1 = BigInt(string1);
	const bigInt2 = BigInt(string2);

	return (bigInt1 + bigInt2).toString();
}
