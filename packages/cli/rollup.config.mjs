// rollup.config.mjs
import { readFileSync } from "node:fs";
import esbuild from "rollup-plugin-esbuild";
import { dts } from "rollup-plugin-dts";

// https://github.com/tc39/proposal-import-attributes
// import pkg from "./package.json" with { type: "json"};

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));
const external = [...Object.keys(pkg.devDependencies), ...Object.keys(pkg.peerDependencies)];

/**
 * @type {import('rollup').RollupOptions}
 */
export const rollupConfig = [
	{
		input: "./src/index.ts",
		external,
		plugins: [esbuild()],
		output: [
			{
				file: "./dist/index.cjs",
				format: "cjs",
			},
			{
				file: "./dist/index.mjs",
				format: "esm",
			},
		],
	},
	{
		input: "./src/index.ts",
		plugins: [dts()],
		output: {
			file: "./dist/index.d.ts",
			format: "esm",
		},
	},
];

export default rollupConfig;
