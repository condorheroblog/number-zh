# Zh-to-number

[![NPM version](https://img.shields.io/npm/v/zh-to-number)](https://www.npmjs.com/package/zh-to-number)
![Downloads](https://img.shields.io/npm/dw/zh-to-number)
[![License](https://img.shields.io/npm/l/zh-to-number)](https://github.com/condorheroblog/number-zh/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/condorheroblog/number-zh)](https://github.com/condorheroblog/number-zh/blob/main/packages/zh-to-number)

中文数字转阿拉伯数字

## Install

```bash
npm install -D zh-to-number
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
