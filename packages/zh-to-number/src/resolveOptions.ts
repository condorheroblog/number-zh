import type { ZhToNumberOptions } from "./types";
import { RESOURCES } from "./constant";

export function resolveOptions(options: ZhToNumberOptions) {
	const language = options.language ?? "zh-CN-lowercase";
	const defaultResources = RESOURCES;

	const resources = options.resources ?? defaultResources;
	if (!resources.hasOwnProperty(language)) {
		throw new Error(`${language} does not appear in resources`);
	}

	return {
		...resources[language],
	};
}
