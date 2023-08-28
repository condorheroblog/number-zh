export type ModeType = "start" | "middle" | "end";

export interface OperateSequentCharactersOptions {
	mode: ModeType;
	remove?: boolean;
}

function replaceCharacters(mode: ModeType, str: string, searchString: string, remove?: boolean) {
	if (mode === "start") {
		str = str.replace(new RegExp(`^${searchString}+`, "g"), remove ? "" : searchString);
	} else if (mode === "middle") {
		str = str.replace(new RegExp(`${searchString}+`, "g"), remove ? "" : searchString);
	} else if (mode === "end") {
		str = str.replace(new RegExp(`${searchString}+$`, "g"), remove ? "" : searchString);
	}
	return str;
}

export function operateSequentCharacters(
	str: string,
	searchString: string,
	modes: OperateSequentCharactersOptions[] | OperateSequentCharactersOptions,
) {
	if (Array.isArray(modes)) {
		for (let i = 0; i < modes.length; i++) {
			const { mode, remove = true } = modes[i];
			str = replaceCharacters(mode, str, searchString, remove);
		}
	} else {
		const { mode, remove = true } = modes;
		str = replaceCharacters(mode, str, searchString, remove);
	}

	return str;
}
