# Number-zh

数字转（大写，小写）简 / 繁体中文数字，金额

## Number-to-zh

阿拉伯数字转（大写，小写）简 / 繁体中文数字

```bash
npm install -D number-to-zh
```

案例：

```ts
import { numberToZh } from "number-to-zh";

numberToZh(0);								// 零
numberToZh(0.1);							// 零点一
numberToZh(-1);								// 负一
numberToZh(1e12);							// 一万亿
numberToZh(1000_0001);				// 一千万零一
numberToZh("12345678");				// 一千二百三十四万五千六百七十八
```

详细使用点击 [number-to-zh](https://github.com/condorheroblog/number-zh/tree/main/packages/number-to-zh) 查看文档文档。
