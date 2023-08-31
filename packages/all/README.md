# Number-zh

[![NPM version](https://img.shields.io/npm/v/number-zh)](https://www.npmjs.com/package/number-zh)
![Downloads](https://img.shields.io/npm/dw/number-zh)
[![License](https://img.shields.io/npm/l/number-zh)](https://github.com/condorheroblog/number-zh/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/condorheroblog/number-zh)](https://github.com/condorheroblog/number-zh/blob/main/packages/cli)

## Highlights

- [number-to-zh](https://github.com/condorheroblog/number-zh/tree/main/packages/number-to-zh)
- [zh-to-number](https://github.com/condorheroblog/number-zh/tree/main/packages/zh-to-number)
- [zh-currency-to-number](https://github.com/condorheroblog/number-zh/tree/main/packages/zh-currency-to-number)
- [number-to-zh-currency](https://github.com/condorheroblog/number-zh/tree/main/packages/number-to-zh-currency)

## Install

```bash
npm install number-zh
```

## Usage

```ts
import { NumberZh } from "number-zh";
const numberZh = new NumberZh();

numberZh.numberToZh(66999);                              // "六万六千九百九十九"
numberZh.zhToNumber("六万六千九百九十九");                  // "66999"
numberZh.zhCurrencyToNumber("人民币陆万陆仟玖佰玖拾玖圆整");  // "¥66999"
numberZh.numberToZhCurrency("66999");                    // "人民币陆万陆仟玖佰玖拾玖圆整"
```

## API

### new NumberZh(comprehensiveOptions?)

```ts
import { NumberZh } from "number-zh";
const numberZh = new NumberZh();
```

#### comprehensiveOptions

Type: NumberZhOptions\
Default: `{}`

[number-to-zh](https://github.com/condorheroblog/number-zh/tree/main/packages/number-to-zh)、[zh-to-number](https://github.com/condorheroblog/number-zh/tree/main/packages/zh-to-number)、[zh-currency-to-number](https://github.com/condorheroblog/number-zh/tree/main/packages/zh-currency-to-number)、[number-to-zh-currency](https://github.com/condorheroblog/number-zh/tree/main/packages/number-to-zh-currency) 函数配置参数的联合类型。

```ts
type NumberZhOptions =
	| NumberToZhOptions
	| NumberToZhCurrencyOptions
	| ZhCurrencyToNumberOptions
	| ZhToNumberOptions;
```

#### `numberZh`

包含 [number-to-zh](https://github.com/condorheroblog/number-zh/tree/main/packages/number-to-zh)、[zh-to-number](https://github.com/condorheroblog/number-zh/tree/main/packages/zh-to-number)、[zh-currency-to-number](https://github.com/condorheroblog/number-zh/tree/main/packages/zh-currency-to-number)、[number-to-zh-currency](https://github.com/condorheroblog/number-zh/tree/main/packages/number-to-zh-currency) 方法的一个实例。


##### numberZh.numberToZh(num, personalizationOptions?)

> 用法详见 [number-to-zh](https://github.com/condorheroblog/number-zh/tree/main/packages/number-to-zh#api) 文档

###### Num

Type: `number | string`

###### PersonalizationOptions

Type: NumberToZhOptions\
Default: `{}`

##### numberZh.numberToZhCurrency(num, personalizationOptions?)

> 用法详见 [number-to-zh-currency](https://github.com/condorheroblog/number-zh/tree/main/packages/number-to-zh-currency#api) 文档

###### Num

Type: `number | string`

###### PersonalizationOptions

Type:  NumberToZhCurrencyOptions\
Default: `{}`

##### numberZh.zhCurrencyToNumber(inputNumberString, personalizationOptions?)

> 用法详见 [zh-currency-to-number](https://github.com/condorheroblog/number-zh/tree/main/packages/zh-currency-to-number#api) 文档

###### InputNumberString

Type: `string`

###### PersonalizationOptions

Type: `ZhCurrencyToNumberOptions`\
Default: `{}`

##### numberZh.zhToNumber(inputNumberString, personalizationOptions?)

> 用法详见 [zh-to-number](https://github.com/condorheroblog/number-zh/tree/main/packages/zh-to-number#api) 文档

###### InputNumberString

Type: `string`

###### PersonalizationOptions

Type: `ZhToNumberOptions`\
Default: `{}`

## License

[MIT](https://github.com/condorheroblog/number-zh/blob/main/LICENSE) License © 2023-Present [Condor Hero](https://github.com/condorheroblog)
