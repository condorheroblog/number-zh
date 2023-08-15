// rollup.config.mjs
import esbuild from "rollup-plugin-esbuild";
import { dts } from "rollup-plugin-dts";
import json from "@rollup/plugin-json";

/**
 * @type {import('rollup').RollupOptions}
 */
export const rollupConfig = [
	{
		input: "./src/index.ts",
		plugins: [json(), esbuild()],
		output: [
			{
				file: "./dist/index.cjs",
				format: "cjs",
			},
			{
				file: "./dist/index.mjs",
				format: "esm",
			},
			{
				file: "./dist/number-to-zh.global.js",
				format: "iife",
				name: "__NUMBER_TO_ZH__",
			},
		],
	},
	{
		input: "./src/index.ts",
		plugins: [json(), dts()],
		output: {
			file: "./dist/index.d.ts",
			format: "esm",
		},
	},
];

export default rollupConfig;
