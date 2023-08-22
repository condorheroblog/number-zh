# Zh-to-number

[![NPM version](https://img.shields.io/npm/v/zh-to-number)](https://www.npmjs.com/package/zh-to-number)
![Downloads](https://img.shields.io/npm/dw/zh-to-number)
[![License](https://img.shields.io/npm/l/zh-to-number)](https://github.com/condorheroblog/number-zh/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/condorheroblog/number-zh)](https://github.com/condorheroblog/number-zh/blob/main/packages/zh-to-number)

中文数字转阿拉伯数字

## Highlights

- 📦 零依赖：无需依赖其他库或框架。
- ⚙️ 支持 ESM、CJS 和 IIFE 引入：可根据项目需求选择合适的引入方式。
- 📝 支持简体中文和繁体中文的大小写数字：满足不同语境下的需求。
- 🔢 大数支持：显示大数无精度问题，保持精确性。
- 🔧 可自定义配置：根据个人需求调整库的行为和设置。

## Install

```bash
npm install zh-to-number
```

## Usage

> 为了避免大数精度丢失问题，阿拉伯数字作为字符串返回

```ts
import { zhToNumber } from "zh-to-number";

zhToNumber("你好");																				// NaN
zhToNumber("零");																					// "0"
zhToNumber("零点一");																			// "0.1"
zhToNumber("一千万零一");																	 // "10000001"
zhToNumber("一千二百三十四万五千六百七十八");									 // "12345678"
zhToNumber("一十");																				// "10"
zhToNumber("十");																					// "10"
zhToNumber("壹仟万零壹", { language: "zh-CN-uppercase" }); // "10000001"
```

### CDN

你可以借助 script 标签直接通过 CDN 来使用：

```html
<script src="https://unpkg.com/zh-to-number/dist/zh-to-number.global.js"></script>
<script>console.log(__ZH_TO_NUMBER__.numberToZh(11));</script>
```

这里我们使用了 [unpkg](https://unpkg.com/)，但你也可以使用任何提供 npm 包服务的 CDN，例如 [jsdelivr](https://www.jsdelivr.com/) 或 [cdnjs](https://cdnjs.com/)。当然，你也可以下载此文件并自行提供服务。

### 自定义数级

默认最大支持到 10^16，即千万亿，最小支持到 10^-16，如果使用万万和亿亿则没有限制。如果超出数级则会返回 NaN，不过可以自定义数级。

```ts
import { zhToNumber, RESOURCES } from "zh-to-number";

const options = {
	language: "zh-CN-lowercase" as const,
	resources: {
		"zh-CN-lowercase": {
			...RESOURCES["zh-CN-lowercase"],
			magnitudeList: [...RESOURCES["zh-CN-lowercase"].magnitudeList, "京"],
		},
	},
};
zhToNumber("一京", options) // "10000000000000000"
```

## API

### zhToNumber(inputNumberString, options?)

#### inputNumberString

Type: `string`

需要转换的中文数字，**即使是超大数字也无精度丢失问题**。

#### options

##### language

Type: `"zh-CN-lowercase" | "zh-CN-uppercase" | "zh-TW-lowercase" | "zh-TW-uppercase" | "zh-HK-lowercase" | "zh-HK-uppercase"`
Default: `"zh-CN-lowercase"`

不同的中文数字转为阿拉伯数字，HK 和 TW 没有区别都表示繁体中文。

##### resources

Type: `object`

> 默认最大支持到 10^16，即千万亿，最小支持到 10^-16，如果使用万万和亿亿则没有限制。

自定义设置中文语境下的数级、数位、小数点以及数字零到九，可通过 `import { RESOURCES } from "zh-to-number";` 查看。
