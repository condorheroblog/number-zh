import cac from "cac";

import { numberToZhCurrency, resolveOptions } from "number-to-zh-currency";
import { version } from "../package.json";
import { toCapitalCase, errorHandler } from "./utils";

export function runNumberToZhCurrency() {
	const resolved = resolveOptions({});
	try {
		const cli = cac("number-to-zh-currency");

		cli.usage("<num>").option("-l, --language [language]", `language (default: zh-CN-lowercase)`);

		for (const key in resolved) {
			const value = resolved[key as keyof typeof resolved];
			cli.option(`--${key} [${key}]`, `${toCapitalCase(key)} (default: ${JSON.stringify(value, null, 0)})`);
		}

		cli.version(version).help();

		const { args, options } = cli.parse();

		if (args.length) {
			const res = numberToZhCurrency(args[0], options);
			console.log(res);
		}
		process.exit(0);
	} catch (error) {
		// There was an error parsing the command-line args
		return errorHandler(error as Error);
	}
}
