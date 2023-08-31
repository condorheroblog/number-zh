// rollup.config.mjs
import { readFileSync } from "node:fs";
import esbuild from "rollup-plugin-esbuild";
import fg from "fast-glob";
import { dts } from "rollup-plugin-dts";
import json from "@rollup/plugin-json";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));
const external = [...Object.keys(pkg.devDependencies), ...Object.keys(pkg.dependencies)];

const banner = `/**
 * ${pkg.name} ${pkg.version}
 * Author ${pkg.author}
 * License ${pkg.license}
 * ©️ 2023
 * Homepage ${pkg.homepage}
 */\n`;

const functionPaths = fg.sync("./src/*.ts");

/**
 * @type {import('rollup').RollupOptions}
 */
const rollupConfig = [];

for (const filePath of functionPaths) {
	// const parsed = parse(filePath);
	rollupConfig.push({
		input: filePath,
		external,
		plugins: [json(), esbuild()],
		output: [
			{
				dir: "dist",
				format: "cjs",
				banner,
				entryFileNames: "[name].cjs",
				preserveModules: true,
				preserveModulesRoot: "src",
			},
			{
				dir: "dist",
				format: "esm",
				banner,
				entryFileNames: "[name].mjs",
				preserveModules: true,
				preserveModulesRoot: "src",
			},
		],
	});
}

rollupConfig.push({
	input: "./src/index.ts",
	external,
	plugins: [json(), dts()],
	output: [{ file: `./dist/index.d.cts` }, { file: `./dist/index.d.mts` }],
});

export default rollupConfig;
