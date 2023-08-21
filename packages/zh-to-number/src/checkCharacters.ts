export function checkCharacters(targetString: string, comparisonString: string) {
	for (let i = 0; i < targetString.length; i++) {
		const character = targetString[i];
		if (!comparisonString.includes(character)) {
			return false;
		}
	}
	return true;
}
