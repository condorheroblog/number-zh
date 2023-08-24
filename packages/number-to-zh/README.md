# Number-to-zh

[![NPM version](https://img.shields.io/npm/v/number-to-zh)](https://www.npmjs.com/package/number-to-zh)
![Downloads](https://img.shields.io/npm/dw/number-to-zh)
[![License](https://img.shields.io/npm/l/number-to-zh)](https://github.com/condorheroblog/number-zh/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/condorheroblog/number-zh)](https://github.com/condorheroblog/number-zh/blob/main/packages/number-to-zh)

阿拉伯数字转（大写，小写）简 / 繁体中文数字

## Highlights

- 📦 零依赖：无需依赖其他库或框架。
- 📣 支持万亿和亿亿：适配简体中文特殊习惯
- ⚙️  支持 ESM、CJS 和 IIFE 引入：可根据项目需求选择合适的引入方式。
- 📝 支持简体中文和繁体中文的大小写数字：满足不同语境下的需求。
- 🔢 大数支持：显示大数无精度问题，保持精确性。
- ⭕️ 编号或是日期：提供编号与数字之间的翻译。
- 🔧 可自定义配置：根据个人需求调整库的行为和设置。

## Install

```bash
npm install number-to-zh
```

## Usage

> 默认最大支持到 10^16，即千万亿，最小支持到 10^-16，如果使用万万和亿亿则没有限制。

```ts
import { numberToZh } from "number-to-zh";

numberToZh(0);								// 零
numberToZh(0.1);							// 零点一
numberToZh(-1);								// 负一
numberToZh(1e12);							// 一万亿
numberToZh(1000_0001);				// 一千万零一
numberToZh("12345678");				// 一千二百三十四万五千六百七十八
```

### CDN

你可以借助 script 标签直接通过 CDN 来使用：

```html
<script src="https://unpkg.com/number-to-zh/dist/number-to-zh.global.js"></script>
<script>console.log(__NUMBER_TO_ZH__.numberToZh(11));</script>
```

这里我们使用了 [unpkg](https://unpkg.com/)，但你也可以使用任何提供 npm 包服务的 CDN，例如 [jsdelivr](https://www.jsdelivr.com/) 或 [cdnjs](https://cdnjs.com/)。当然，你也可以下载此文件并自行提供服务。

### 十的口语化

「10」 读作 「一十」，但很多时候口语化读成 「十」 省略了十前面的一，可以通过 `skipOneBeforeTen` 参数设置：

```ts
numberToZh(10);															// 一十
numberToZh(10, { skipOneBeforeTen: true }); // 十
```

### 繁体中文

默认使用简体小写中文，可以通过 language 指定：

```ts
numberToZh(1000_0001, { language: "zh-CN-lowercase" }); // 一千万零一
numberToZh(1000_0001, { language: "zh-CN-uppercase" }); // 壹仟万零壹
numberToZh(1000_0001, { language: "zh-TW-lowercase" }); // 一千萬零一
numberToZh(1000_0001, { language: "zh-TW-uppercase" }); // 壹仟萬零壹
numberToZh(1000_0001, { language: "zh-HK-lowercase" }); // 一千萬零一
numberToZh(1000_0001, { language: "zh-HK-uppercase" }); // 壹仟萬零壹
```

设置 `zh-TW` 和 `zh-HK` 开头的语言，本质没有区别。

### 大数

> 以下内容是对简体中文的特别说明。

大数，这里指的是超过 10 千亿的数字，简体中文和繁体中文处理的逻辑不同，当数字超过万，繁体中文依然是维持四位进制，而简体中文世界采用了八位进制（破坏了分节读数法）。

根据 1984 年制定的[中华人民共和国法定计量单位](http://www.dzkx.org/dzdqs-upload/news/geology/20201230155948768.pdf)，十的十二次方（10^12）称为万亿，也就是说过了万之后的亿采用八位进制，即亿、十亿、百亿、千亿变成了亿、十亿、百亿、千亿、万亿、十万亿、百万亿、千万亿。

```ts
numberToZh(1_0000_0000_0000);				// 一万亿
numberToZh(1000_0000_0000_0000);		// 一千万亿
```

过了千万亿，单位可采用万万亿或者亿亿。

#### 万万

默认支持：

```ts
numberToZh(1_0000_0000_0000_0000); // 一万万亿
```

#### 亿亿

指定 repeatChar 的参数为——`YY`。

```ts
numberToZh(1_0000_0000_0000_0000, { repeatChar: "YY" }); // 一亿亿
```

### 自定义数级

> 默认情况下，支持 10^16。

想用 「万万」 表示亿，比如四万万同胞的说法。

```ts
import { numberToZh } from "number-to-zh";

// 四万万
numberToZh(4_0000_0000, {
	language: "zh-CN-lowercase",
	magnitudeList: ["", "万", "万万"],
});
```

如果需要更大的单位——数级，也可以自定义。

比如根据 [有关中文大数词问题的缘由和建议](https://nlp.ict.ac.cn/lwlz/fblw/lw2013/202210/P020221010412021442481.pdf) 的建议，简体中文数字万以上采用采用八位进制。因为万亿占用了兆，所以下一个数级是京，下面是添加对京的支持：

```ts
import { numberToZh } from "number-to-zh";

const options = {
	language: "zh-CN-lowercase",
	// repeatChar 一定是 false
	repeatChar: false,
	magnitudeList: ["", "万", "亿", "京"],
};

numberToZh("54000300020000001", options);					// 五京四千万三千亿二千万零一
numberToZh("500000004000300000000001", options);	// 五千万京四千万三千亿零一
```

如果简体中文数字，万以上想使用四位进制，可以用 digitsAboveTenThousand 参数实现：

```ts
import { numberToZh, RESOURCES } from "number-to-zh";

const options = {
	language: "zh-CN-lowercase",
	digitsAboveTenThousand: 4,
	magnitudeList: [...RESOURCES["zh-CN-lowercase"].magnitudeList, "京"],
};

numberToZh(1_0000_0000_0000, options);					// 一兆
numberToZh(1_0000_0000_0000_0000, options);			// 一京
```

繁体中文也可以在万上使用八位进制，设置 digitsAboveTenThousand 为 8 就行，也可以使用万万和亿亿，不过没啥意义。

```ts
// 一千萬億
numberToZh(1000_0000_0000_0000, {
	language: "zh-TW-lowercase",
	digitsAboveTenThousand: 8,
});
```

## 编号和日期

根据 [出版物上数字用法的规定 - 中华人民共和国教育部](http://www.moe.gov.cn/ewebeditor/uploadfile/2015/01/13/20150113091154536.pdf) 「〇」 仅用于编号或是日期，例如 2012 年汉字形式写为 「二〇一二」，不是 「二零一二」。

```ts
import { NumeralsConverter } from "number-to-zh";

const baseNumerals = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const converter = new NumeralsConverter(baseNumerals);

converter.getValueFromIndex(10_0001);	// "一〇〇〇〇一"
converter.getValueFromIndex(10_0101);	// "一〇〇一〇一"
converter.getValueFromIndex(10_1001);	// "一〇一〇〇一"
converter.getValueFromIndex(10_1010);	// "一〇一〇一〇"

converter.getIndexFromValue("一〇〇〇〇一");	// "100001"
converter.getIndexFromValue("一〇〇一〇一");	// "100101"
converter.getIndexFromValue("一〇一〇〇一");	// "101001"
converter.getIndexFromValue("一〇一〇一〇");	// "101010"
```

## API

### numberToZh(num, options?)

#### num

Type: `number | string`

需要转换的阿拉伯数字，当数字是 Number 时，需要注意 JavaScript 语言本身精度丢失问题。

#### options

##### language

Type: `"zh-CN-lowercase" | "zh-CN-uppercase" | "zh-TW-lowercase" | "zh-TW-uppercase" | "zh-HK-lowercase" | "zh-HK-uppercase"`\
Default: `"zh-CN-lowercase"`

阿拉伯数字转为对应的中文数字，HK 和 TW 没有区别都表示繁体中文。

##### skipOneBeforeTen

Type: `boolean`\
Default: `false`

控制一十是否读作十。

##### repeatChar

Type: `false | "WW" | "YY"`\
Default: `"WW"`

启用万亿情况下，重复的数级，`WW` 表示万万，`YY` 表示亿亿， `false` 表示万亿之后正常进入下一个数级。

##### digitsAboveTenThousand

Type: `4 | "Quaternary" | 8 | "Octal"`

万位以上的进制，简体中文默认 8，繁体中文默认 4。

##### digitsList

Type: `string[]`\
Default: `["", "十", "百", "千"]`

对应语言的数位列表。

##### magnitudeList

Type: `string[]`\
Default: `["", "万", "亿", "兆"]`

对应语言的数级列表。

##### baseNumerals

Type: `string[]`\
Default: `["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]`

对应语言从零到九的中文数字列表。

##### minusSign

Type: `string`\
Default: `负`

对应语言「负」的写法。

##### decimalPoint

Type: `string`\
Default: `点`

对应语言「点」的写法。

### new NumeralsConverter(array)

一个转换器，提供两个方法，用于获取数组项和数组下标的关系。

```ts
const converter = new NumeralsConverter(array);
```

##### converter.getValueFromIndex(index: number | string)

输入一系列数组下标返回数组的项。

##### converter.getIndexFromValue(strList: string)


输入一系列数组项返回数组下标。
