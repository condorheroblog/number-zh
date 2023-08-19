# Number-to-zh

[![NPM version](https://img.shields.io/npm/v/number-to-zh)](https://www.npmjs.com/package/number-to-zh)
![Downloads](https://img.shields.io/npm/dw/number-to-zh)
[![License](https://img.shields.io/npm/l/number-zh)](https://github.com/condorheroblog/number-zh/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/condorheroblog/number-zh)](https://github.com/condorheroblog/number-zh/blob/main/packages/number-to-zh)

数字转（大写，小写）简 / 繁体中文数字

## Install

```bash
npm install -D number-to-zh
```

## Usage

```ts
import { numberToZh } from "number-to-zh";

numberToZh(0);								// 零
numberToZh(0.1);							// 零点一
numberToZh(-1);								// 负一
numberToZh(1e12);							// 一万亿
numberToZh(1000_0001);				// 一千万零一
numberToZh("12345678");				// 一千二百三十四万五千六百七十八
```

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
numberToZh(1_0000_0000_0000_0000);	// 一万万亿
```

#### 亿亿

 指定 repeatChar 的参数为——`YY`。

```ts
numberToZh(1_0000_0000_0000_0000, { repeatChar: "YY" });	// 一亿亿
```

### 自定义数级

> 默认情况下，支持 10^16。

想用 「万万」 表示亿，比如四万万同胞的说法。

```ts
import { numberToZh, RESOURCES } from "number-to-zh";

// 四万万
numberToZh(4_0000_0000, {
	language: "zh-CN-lowercase",
	resources: {
		"zh-CN-lowercase": {
			...RESOURCES["zh-CN-lowercase"],
			magnitudeList: ["", "万", "万万"],
		},
	},
});
```

如果需要更大的单位——数级，也可以自定义。

比如根据 [有关中文大数词问题的缘由和建议](https://nlp.ict.ac.cn/lwlz/fblw/lw2013/202210/P020221010412021442481.pdf) 的建议，简体中文数字万以上采用采用八位进制。因为万亿占用了兆，所以下一个数级是京，下面是添加对京的支持：

```ts
import { numberToZh, RESOURCES } from "number-to-zh";

const options = {
	language: "zh-CN-lowercase",
	// repeatChar 一定是 false
	repeatChar: false,
	resources: {
		"zh-CN-lowercase": {
			...RESOURCES["zh-CN-lowercase"],
			magnitudeList: ["", "万", "亿", "京"],
		},
	},
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
	resources: {
		"zh-CN-lowercase": {
			...RESOURCES["zh-CN-lowercase"],
			magnitudeList: [...RESOURCES["zh-CN-lowercase"].magnitudeList, "京"],
		},
	},
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
})
```

## API

### numberToZh(num, options?)

#### num

Type: `number | string`

需要转换的数字，当数字是 Number 时，需要注意 JavaScript 语言本身精度丢失问题。

#### options

##### language

Type: `"zh-CN-lowercase" | "zh-CN-uppercase" | "zh-TW-lowercase" | "zh-TW-uppercase" | "zh-HK-lowercase" | "zh-HK-uppercase"`
Default: `"zh-CN-lowercase"`

阿拉伯数字转为对应的中文数字。

##### resources

Type: `object`

自定义设置中文语境下的数级、数位、小数点已经零到九。

##### skipOneBeforeTen

Type: `boolean`
Default: `false`

控制一十的读作十

##### repeatChar

Type: `false | "WW" | "YY"`
Default: `"WW"`

启用万亿情况下，重复的数级


##### digitsAboveTenThousand

Type: `4 | "Quaternary" | 8 | "Octal"`

万位以上的进制，简体中文默认 8，繁体中文默认 4
