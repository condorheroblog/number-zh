# Number-to-zh-currency

[![NPM version](https://img.shields.io/npm/v/number-to-zh-currency)](https://www.npmjs.com/package/number-to-zh-currency)
![Downloads](https://img.shields.io/npm/dw/number-to-zh-currency)
[![License](https://img.shields.io/npm/l/number-to-zh-currency)](https://github.com/condorheroblog/number-zh/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/condorheroblog/number-zh)](https://github.com/condorheroblog/number-zh/blob/main/packages/number-to-zh-currency)

阿拉伯数字转中文金额数字

## Highlights

- 🏦 规范：符合中国人民银行规定的书写标准。
- 📦 零依赖：无需依赖其他库或框架。
- ⚙️  支持 ESM、CJS 和 IIFE 引入：可根据项目需求选择合适的引入方式。
- 📝 支持简体中文和繁体中文的大小写数字：满足不同语境下的需求。
- 🔢 大数支持：显示大数无精度问题，保持精确性。
- 🔧 可自定义配置：根据个人需求调整库的行为和设置。

## Install

```bash
npm install number-to-zh-currency
```

## Usage

```ts
import { numberToZhCurrency } from "number-to-zh-currency";

numberToZhCurrency("0");          // 人民币零圆整
numberToZhCurrency("0.12");       // 人民币壹角贰分
numberToZhCurrency(11);           // 人民币壹拾壹圆整
numberToZhCurrency(11.23);        // 人民币壹拾壹圆贰角叁分
numberToZhCurrency("¥1,680.01");  // 人民币壹仟陆佰捌拾圆零壹分
numberToZhCurrency(325.04);       // 人民币叁佰贰拾伍圆零肆分
numberToZhCurrency(10_7000.53);   // 人民币壹拾万零柒仟圆伍角叁分
```

> 中文大写数字金额规范参见中国人民银行发布的 [支付结算办法](http://www.pbc.gov.cn/zhifujiesuansi/128525/128527/2829008/index.html) 附一 [正确填写票据和结算凭证的基本规定](http://chongqing.pbc.gov.cn/chongqing/107674/2927554/2773593/index.html)。

### CDN

你可以借助 script 标签直接通过 CDN 来使用：

```html
<script src="https://unpkg.com/number-to-zh-currency/dist/number-to-zh-currency.global.js"></script>
<script>console.log(__NUMBER_TO_ZH_CURRENCY__.numberToZhCurrency(11));</script>
```

这里我们使用了 [unpkg](https://unpkg.com/)，但你也可以使用任何提供 npm 包服务的 CDN，例如 [jsdelivr](https://www.jsdelivr.com/) 或 [cdnjs](https://cdnjs.com/)。当然，你也可以下载此文件并自行提供服务。

## API

### numberToZhCurrency(num, options?)

#### num

Type: `number | string`

需要转换的阿拉伯数字，**如果数字过大，可以使用字符串**，当为字符串的时候，支持添加千分符和人民币符号 `¥` 例如：`"¥1,680.01"`。

#### options

##### language

Type: `"zh-CN-lowercase" | "zh-CN-uppercase" | "zh-TW-lowercase" | "zh-TW-uppercase" | "zh-HK-lowercase" | "zh-HK-uppercase"`\
Default: `"zh-CN-uppercase"`

阿拉伯数字转为对应的中文数字，HK 和 TW 没有区别都表示繁体中文。

##### tenCentsSuffix

Type: `boolean`\
Default: `true`

金额在角位结束时，是否添加「正｜整」，例如，默认情况下数字金额 `0.1` 转为大写金额为「人民币壹角整」。

##### hangingZerosAfterDigits

Type: `boolean`\
Default: `true`

数级后面的千位不是零，数级前面的个位是零，零加在数级的「后」面，人民银行规定的错误写法。例如当数字金额的万位是 0，而千位不是 0，人民一行规定 `107000.53` 转为大写金额为「人民币壹拾万**零**柒仟元伍角叁分」或者是「人民币壹拾万柒仟元伍角叁分」

##### preserveOnesPlaceZero

Type: `boolean`\
Default: `false`

当数字金额的元位是 0，而角位不是 0，是否保留中文的零，例如默认情况下数字金额 `1680.32` 转为大写金额为「人民币壹仟陆佰捌拾元叁角贰分」

##### fractionalCurrencyUnit

Type: `string[]`\
Default: `["角", "分"]`

人民币辅币单位，会根据它的长度截取数字金额的小数部分。

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

##### NumberToZhOptions

参见 numberToZh 函数的 [options](https://github.com/condorheroblog/number-zh/blob/main/packages/number-to-zh/README.md#options)。

## Related

- [number-zh](https://github.com/condorheroblog/number-zh/tree/main/packages/all)
- [number-to-zh](https://github.com/condorheroblog/number-zh/tree/main/packages/number-to-zh)
- [zh-to-number](https://github.com/condorheroblog/number-zh/tree/main/packages/zh-to-number)
- [zh-currency-to-number](https://github.com/condorheroblog/number-zh/tree/main/packages/zh-currency-to-number)
- [number-zh-cli](https://github.com/condorheroblog/number-zh/tree/main/packages/cli)

## License

[MIT](https://github.com/condorheroblog/number-zh/blob/main/LICENSE) License © 2023-Present [Condor Hero](https://github.com/condorheroblog)
