# Number-zh

数字转（大写，小写）简 / 繁体中文数字，金额

## Number-to-zh

阿拉伯数字转（大写，小写）简 / 繁体中文数字

```bash
npm install number-to-zh
```

```ts
import { numberToZh } from "number-to-zh";

numberToZh(0);								// 零
numberToZh(0.1);							// 零点一
numberToZh(-1);								// 负一
numberToZh(1e12);							// 一万亿
numberToZh(1000_0001);				// 一千万零一
numberToZh("12345678");				// 一千二百三十四万五千六百七十八
```

更多查看文档 [number-to-zh](https://github.com/condorheroblog/number-zh/tree/main/packages/number-to-zh)。

## Zh-to-number

中文数字转阿拉伯数字

```bash
npm install zh-to-number
```


```ts
import { zhToNumber } from "zh-to-number";

zhToNumber("零");																					// "0"
zhToNumber("零点一");																			// "0.1"
zhToNumber("一千万零一");																	 // "10000001"
zhToNumber("一千二百三十四万五千六百七十八");									 // "12345678"
zhToNumber("一十");																				// "10"
zhToNumber("十");																					// "10"
zhToNumber("壹仟万零壹", { language: "zh-CN-uppercase" }); // "10000001"
```

更多查看文档 [zh-to-number](https://github.com/condorheroblog/number-zh/tree/main/packages/zh-to-number)。

## Number-to-zh-currency

阿拉伯数字转中文金额数字

```bash
npm install number-to-zh-currency
```

```ts
import { numberToZhCurrency } from "number-to-zh-currency";

numberToZhCurrency("0"); 				// 人民币零圆整
numberToZhCurrency("0.12"); 			// 人民币壹角贰分
numberToZhCurrency(11); 					// 人民币壹拾壹圆整
numberToZhCurrency(11.23); 			// 人民币壹拾壹圆贰角叁分
numberToZhCurrency("¥1,680.01");  // 人民币壹仟陆佰捌拾圆零壹分
numberToZhCurrency(325.04); 			// 人民币叁佰贰拾伍圆零肆分
numberToZhCurrency(10_7000.53); 	// 人民币壹拾万零柒仟圆伍角叁分
```

更多查看文档 [number-to-zh-currency](https://github.com/condorheroblog/number-zh/tree/main/packages/number-to-zh-currency)。

## Zh-currency-to-number

中文金额数字转阿拉伯数字

```bash
npm install zh-currency-to-number
```

```ts
import { zhCurrencyToNumber } from "zh-currency-to-number";

zhCurrencyToNumber("人民币零圆整");																								// "¥0"
zhCurrencyToNumber("人民币壹角贰分");																							// "¥0.12"
zhCurrencyToNumber("人民币壹万陆仟肆佰零玖圆零贰分");																// "¥16409.02"
zhCurrencyToNumber("人民币壹万陆仟肆佰零玖圆零贰分", { thousandsSeparator: true }); // "¥16,409.02"
zhCurrencyToNumber("人民币负叁圆贰角整");																					// "¥-3.2"
```

更多查看文档 [zh-currency-to-number](https://github.com/condorheroblog/number-zh/tree/main/packages/zh-currency-to-number)。
