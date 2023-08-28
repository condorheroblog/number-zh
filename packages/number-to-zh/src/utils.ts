export {
	isValidNumber,
	isScientificNotation,
	parseRationalNumber,
	operateSequentCharacters,
	scientificToNumber,
} from "../../common/src";

export function detectIntegerBoundary(
	integerSize: number,
	magnitudeListSize: number,
	step: number,
	repeatChar: unknown,
	digitsListSize: number,
) {
	const errorMessage = `整数部分超出能表示的最大计数单位，请设置更大的数级（magnitude）`;
	if (magnitudeListSize > 2) {
		if (!repeatChar && 2 * 4 + step * (magnitudeListSize - 2) < integerSize) {
			throw new Error(errorMessage);
		}
	} else {
		if (digitsListSize * magnitudeListSize < integerSize) {
			throw new Error(errorMessage);
		}
	}
}
