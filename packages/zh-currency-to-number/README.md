# Zh-currency-to-number

[![NPM version](https://img.shields.io/npm/v/zh-currency-to-number)](https://www.npmjs.com/package/zh-currency-to-number)
![Downloads](https://img.shields.io/npm/dw/zh-currency-to-number)
[![License](https://img.shields.io/npm/l/zh-currency-to-number)](https://github.com/condorheroblog/number-zh/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/condorheroblog/number-zh)](https://github.com/condorheroblog/number-zh/blob/main/packages/zh-currency-to-number)

中文金额数字转阿拉伯数字

## Highlights

- 🏦 规范：符合中国人民银行规定的书写标准。
- 📦 零依赖：无需依赖其他库或框架。
- ⚙️  支持 ESM、CJS 和 IIFE 引入：可根据项目需求选择合适的引入方式。
- 📝 支持简体中文和繁体中文的大小写数字：满足不同语境下的需求。
- 🔢 大数支持：显示大数无精度问题，保持精确性。
- 🔧 可自定义配置：根据个人需求调整库的行为和设置。

## Install

```bash
npm install zh-currency-to-number
```

## Usage

```ts
import { zhCurrencyToNumber } from "zh-currency-to-number";

zhCurrencyToNumber("人民币零圆整");                                              // "¥0"
zhCurrencyToNumber("人民币壹角贰分");                                            // "¥0.12"
zhCurrencyToNumber("人民币壹万陆仟肆佰零玖圆零贰分");                               // "¥16409.02"
zhCurrencyToNumber("人民币壹万陆仟肆佰零玖圆零贰分", { thousandsSeparator: true }); // "¥16,409.02"
zhCurrencyToNumber("人民币负叁圆贰角整");                                         // "¥-3.2"
```

> 中文大写数字金额规范参见中国人民银行发布的 [支付结算办法](http://www.pbc.gov.cn/zhifujiesuansi/128525/128527/2829008/index.html) 附一 [正确填写票据和结算凭证的基本规定](http://chongqing.pbc.gov.cn/chongqing/107674/2927554/2773593/index.html)。

### CDN

你可以借助 script 标签直接通过 CDN 来使用：

```html
<script src="https://unpkg.com/zh-currency-to-number/dist/zh-currency-to-number.global.js"></script>
<script>console.log(__ZH_CURRENCY_TO_NUMBER__.zhCurrencyToNumber(11));</script>
```

这里我们使用了 [unpkg](https://unpkg.com/)，但你也可以使用任何提供 npm 包服务的 CDN，例如 [jsdelivr](https://www.jsdelivr.com/) 或 [cdnjs](https://cdnjs.com/)。当然，你也可以下载此文件并自行提供服务。

## API

### zhCurrencyToNumber(inputNumberString, options?)

#### num

Type: `number | string`

需要转换的中文数字金额，**即使是超大数字也无精度丢失问题**。

#### options

##### language

Type: `"zh-CN-lowercase" | "zh-CN-uppercase" | "zh-TW-lowercase" | "zh-TW-uppercase" | "zh-HK-lowercase" | "zh-HK-uppercase"`\
Default: `"zh-CN-uppercase"`

指定输入的中文数字，HK 和 TW 没有区别都表示繁体中文。

##### fractionalCurrencyUnit

Type: `string[]`\
Default: `["角", "分"]`

人民币辅币单位。

##### prefixSymbol

Type: `string`\
Default: `¥`

阿拉伯数字前面的人民币符号。

##### amountPrefix

Type: `string`\
Default: `人民币`

中国人民银行规定，中文大写金额数字要紧跟在「人民币」三个字后面。

##### CNYUnit

Type: `string`\
Default: `圆`

中国人民银行规定，人民币单位是圆活着元，两个都是有效的。

##### amountSuffix

Type: `string`\
Default: `整`

中国人民银行规定，中文大写金额数字到「元」为止的，在元之后，应写「整」（或「正」）字，在「角」之后可以不写「整」（或「正」）字。大写金额数字有「分」的，「分」后面不写「整」（或「正」）字。


##### ZhToNumberOptions

参见 zhToNumber 函数的 [options](https://github.com/condorheroblog/number-zh/blob/main/packages/zh-to-number/README.md#options)。

## Related

- [number-zh](https://github.com/condorheroblog/number-zh/tree/main/packages/all)
- [number-to-zh](https://github.com/condorheroblog/number-zh/tree/main/packages/number-to-zh)
- [zh-to-number](https://github.com/condorheroblog/number-zh/tree/main/packages/zh-to-number)
- [number-to-zh-currency](https://github.com/condorheroblog/number-zh/tree/main/packages/number-to-zh-currency)
- [number-zh-cli](https://github.com/condorheroblog/number-zh/tree/main/packages/cli)

## License

[MIT](https://github.com/condorheroblog/number-zh/blob/main/LICENSE) License © 2023-Present [Condor Hero](https://github.com/condorheroblog)
