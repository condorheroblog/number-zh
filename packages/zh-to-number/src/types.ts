import type { LanguageType, resourcesType } from "../../number-to-zh/src";

export type { LanguageType, resourcesType };

export interface ZhToNumberOptions {
	language?: LanguageType;
	resources?: resourcesType;
}
