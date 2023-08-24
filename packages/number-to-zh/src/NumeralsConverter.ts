export class NumeralsConverter<T> {
	private array: T[];

	constructor(array: T[]) {
		this.array = array;
	}

	getValueFromIndex(index: number | string) {
		const numberString = index.toString();
		let result = "";
		for (const num of numberString) {
			const str = this.array[+num];
			if (str) {
				result += str;
			}
		}
		return result;
	}

	getIndexFromValue(strList: string) {
		let result = "";

		for (const str of strList) {
			const index = this.array.indexOf(str as T);
			if (index > -1) {
				result += index;
			}
		}
		return result;
	}
}
