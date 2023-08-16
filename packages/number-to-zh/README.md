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
// 一千零万零一
numberToZh(1000_0001);
```

### 万万

### 亿亿



### 十的口语化

「10」 读作「一十」，但很多时候口语化读成「十」省略了十前面的一，这种情况可以通过 `skipOneBeforeTen` 参数设置：

```ts
// 10 => 十
numberToZh(10, { skipOneBeforeTen: true });
```



