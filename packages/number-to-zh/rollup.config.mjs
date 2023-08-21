// rollup.config.mjs
import { readFileSync } from "node:fs";
import esbuild from "rollup-plugin-esbuild";
import { dts } from "rollup-plugin-dts";
import json from "@rollup/plugin-json";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));

const banner = `/**
 * ${pkg.name} ${pkg.version}
 * Author ${pkg.author}
 * License ${pkg.license}
 * Homepage ${pkg.homepage}
 */\n`;

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
				banner,
			},
			{
				file: "./dist/index.mjs",
				format: "esm",
				banner,
			},
			{
				file: "./dist/number-to-zh.global.js",
				format: "iife",
				banner,
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
