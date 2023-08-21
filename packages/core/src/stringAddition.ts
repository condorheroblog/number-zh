export function stringAddition(string1: string, string2: string) {
	const maxLength = Math.max(string1.length, string2.length);
	const paddedString1 = string1.padStart(maxLength, "0");
	const paddedString2 = string2.padStart(maxLength, "0");

	let result = "";
	// 进位
	let carry = 0;

	for (let i = maxLength - 1; i >= 0; i--) {
		const digit1 = parseInt(paddedString1[i]);
		const digit2 = parseInt(paddedString2[i]);

		const sum = digit1 + digit2 + carry;
		// 当前位的结果
		const digitSum = sum % 10;
		// 计算进位
		carry = Math.floor(sum / 10);

		result = digitSum.toString() + result;
	}

	if (carry > 0) {
		result = carry.toString() + result;
	}

	return result;
}
