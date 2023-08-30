// rollup.config.mjs
import esbuild from "rollup-plugin-esbuild";
import { dts } from "rollup-plugin-dts";

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
			{
				file: "./dist/number-zh-core.global.js",
				format: "iife",
				name: "__NUMBER__ZH__CORE__",
			},
		],
	},
	{
		input: "./src/index.ts",
		plugins: [dts()],
		output: [
			{ file: "./dist/index.d.cts" },
			{ file: "./dist/index.d.mts" },
		],
	},
];

export default rollupConfig;
