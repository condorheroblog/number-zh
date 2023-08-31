# Number-zh-cli

[![NPM version](https://img.shields.io/npm/v/number-zh-cli)](https://www.npmjs.com/package/number-zh-cli)
![Downloads](https://img.shields.io/npm/dw/number-zh-cli)
[![License](https://img.shields.io/npm/l/number-zh-cli)](https://github.com/condorheroblog/number-zh/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/condorheroblog/number-zh)](https://github.com/condorheroblog/number-zh/blob/main/packages/cli)

阿拉伯数字与中文数字之间的互相转换

## Install

```bash
npm install -g number-zh-cli
```

## Usage

### Number-to-zh

```bash
> number-to-zh -h

number-to-zh/0.0.0

Usage:
  $ number-to-zh <num>

Options:
  -l, --language [language]                              language (default: zh-CN-lowercase)
  --skipOneBeforeTen [skipOneBeforeTen]                  SkipOneBeforeTen (default: false)
  --digitsAboveTenThousand [digitsAboveTenThousand]      DigitsAboveTenThousand (default: 8)
  --repeatChar [repeatChar]                              RepeatChar (default: "WW")
  --numericUnderscores [numericUnderscores]              NumericUnderscores (default: "_")
  --hangingZerosBeforeDigits [hangingZerosBeforeDigits]  HangingZerosBeforeDigits (default: false)
  --hangingZerosAfterDigits [hangingZerosAfterDigits]    HangingZerosAfterDigits (default: false)
  --digitsList [digitsList]                              DigitsList (default: ["","十","百","千"])
  --magnitudeList [magnitudeList]                        MagnitudeList (default: ["","万","亿","兆"])
  --baseNumerals [baseNumerals]                          BaseNumerals (default: ["零","一","二","三","四","五","六","七","八","九"])
  --minusSign [minusSign]                                MinusSign (default: "负")
  --decimalPoint [decimalPoint]                          DecimalPoint (default: "点")
  -v, --version                                          Display version number
  -h, --help                                             Display this message
```

### Zh-to-number

```bash
> zh-to-number -h

zh-to-number/0.0.0

Usage:
  $ zh-to-number <num>

Options:
  -l, --language [language]                  language (default: zh-CN-lowercase)
  --thousandsSeparator [thousandsSeparator]  ThousandsSeparator (default: false)
  --digitsList [digitsList]                  DigitsList (default: ["","十","百","千"])
  --magnitudeList [magnitudeList]            MagnitudeList (default: ["","万","亿","兆"])
  --baseNumerals [baseNumerals]              BaseNumerals (default: ["零","一","二","三","四","五","六","七","八","九"])
  --minusSign [minusSign]                    MinusSign (default: "负")
  --decimalPoint [decimalPoint]              DecimalPoint (default: "点")
  --positive [positive]                      Positive (default: "正")
  -v, --version                              Display version number
  -h, --help                                 Display this message
```

### Zh-currency-to-number

```bash
> zh-currency-to-number -h

zh-currency-to-number/0.0.0

Usage:
  $ zh-currency-to-number <num>

Options:
  -l, --language [language]                          language (default: zh-CN-lowercase)
  --fractionalCurrencyUnit [fractionalCurrencyUnit]  FractionalCurrencyUnit (default: ["角","分"])
  --prefixSymbol [prefixSymbol]                      PrefixSymbol (default: "¥")
  --amountPrefix [amountPrefix]                      AmountPrefix (default: "人民币")
  --CNYUnit [CNYUnit]                                CNYUnit (default: "圆")
  --amountSuffix [amountSuffix]                      AmountSuffix (default: "整")
  --thousandsSeparator [thousandsSeparator]          ThousandsSeparator (default: false)
  --digitsList [digitsList]                          DigitsList (default: ["","拾","佰","仟"])
  --magnitudeList [magnitudeList]                    MagnitudeList (default: ["","万","亿","兆"])
  --baseNumerals [baseNumerals]                      BaseNumerals (default: ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"])
  --minusSign [minusSign]                            MinusSign (default: "负")
  --decimalPoint [decimalPoint]                      DecimalPoint (default: "点")
  --positive [positive]                              Positive (default: "正")
  -v, --version                                      Display version number
  -h, --help                                         Display this message
```

### Number-to-zh-currency

```bash
> number-to-zh-currency -h

number-to-zh-currency/0.0.0

Usage:
  $ number-to-zh-currency <num>

Options:
  -l, --language [language]                              language (default: zh-CN-lowercase)
  --tenCentsSuffix [tenCentsSuffix]                      TenCentsSuffix (default: true)
  --preserveOnesPlaceZero [preserveOnesPlaceZero]        PreserveOnesPlaceZero (default: false)
  --fractionalCurrencyUnit [fractionalCurrencyUnit]      FractionalCurrencyUnit (default: ["角","分"])
  --prefixSymbol [prefixSymbol]                          PrefixSymbol (default: "¥")
  --amountPrefix [amountPrefix]                          AmountPrefix (default: "人民币")
  --CNYUnit [CNYUnit]                                    CNYUnit (default: "圆")
  --amountSuffix [amountSuffix]                          AmountSuffix (default: "整")
  --skipOneBeforeTen [skipOneBeforeTen]                  SkipOneBeforeTen (default: false)
  --digitsAboveTenThousand [digitsAboveTenThousand]      DigitsAboveTenThousand (default: 8)
  --repeatChar [repeatChar]                              RepeatChar (default: "WW")
  --numericUnderscores [numericUnderscores]              NumericUnderscores (default: ",")
  --hangingZerosBeforeDigits [hangingZerosBeforeDigits]  HangingZerosBeforeDigits (default: false)
  --hangingZerosAfterDigits [hangingZerosAfterDigits]    HangingZerosAfterDigits (default: true)
  --digitsList [digitsList]                              DigitsList (default: ["","拾","佰","仟"])
  --magnitudeList [magnitudeList]                        MagnitudeList (default: ["","万","亿","兆"])
  --baseNumerals [baseNumerals]                          BaseNumerals (default: ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"])
  --minusSign [minusSign]                                MinusSign (default: "负")
  --decimalPoint [decimalPoint]                          DecimalPoint (default: "点")
  -v, --version                                          Display version number
  -h, --help                                             Display this message
```

## License

[MIT](https://github.com/condorheroblog/number-zh/blob/main/LICENSE) License © 2023-Present [Condor Hero](https://github.com/condorheroblog)
