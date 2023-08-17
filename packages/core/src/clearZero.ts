export function clearZero(str: string, searchString: string, modes: ("start" | "middle" | "end")[]) {
	for (let i = 0; i < modes.length; i++) {
		const mode = modes[i];

		if (mode === "start") {
			str = str.replace(new RegExp(`^${searchString}+`, "g"), "");
		} else if (mode === "middle") {
			str = str.replace(new RegExp(`${searchString}+`, "g"), searchString);
		} else if (mode === "end") {
			str = str.replace(new RegExp(`${searchString}+$`, "g"), "");
		}
	}

	return str;
}
