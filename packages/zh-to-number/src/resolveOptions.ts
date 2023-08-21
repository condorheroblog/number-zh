import type { ZhToNumberOptions } from "./types";
import { RESOURCES } from "../../number-to-zh/src";

const CN_LIST = ["zh-CN-lowercase", "zh-CN-uppercase"];

export function resolveOptions(options: ZhToNumberOptions) {
	const language = options.language ?? "zh-CN-lowercase";
	const skipOneBeforeTen = options.skipOneBeforeTen ?? false;
	let digitsAboveTenThousand = options.digitsAboveTenThousand;
	let repeatChar = options.repeatChar;
	const defaultResources = RESOURCES;
	if (digitsAboveTenThousand === 8) {
		const listMap = { ...defaultResources[language] };
		const magnitudeList = listMap.magnitudeList.slice(0, 3);
		listMap.magnitudeList = magnitudeList;
	}

	const resources = options.resources ?? defaultResources;
	if (!resources.hasOwnProperty(language)) {
		throw new Error(`${language} does not appear in resources`);
	}

	if (CN_LIST.includes(language)) {
		digitsAboveTenThousand = digitsAboveTenThousand ?? 8;
		repeatChar = repeatChar ?? "WW";
	} else {
		digitsAboveTenThousand = digitsAboveTenThousand ?? 4;
		repeatChar = repeatChar ?? false;
	}

	if (digitsAboveTenThousand === "Octal") {
		digitsAboveTenThousand = 8;
	}
	if (digitsAboveTenThousand === "Quaternary") {
		digitsAboveTenThousand = 4;
	}

	return {
		skipOneBeforeTen,
		digitsAboveTenThousand,
		repeatChar,
		...resources[language],
	};
}
