# miniprogram-cli

Wechat Miniprogram Devtool CLI cross-platform wrapper for NodeJS and npm

跨平台调用命令行微信开发工具

## CLI Usage

命令行调用
https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html

与官网用法一致,使用`npx miniprogram-cli`代替`cli`即可

```bash
npx miniprogram-cli -o
```

## JS Module
作为JS模块使用

安装
```bash
npm i miniprogram-cli
```
使用

```js
import { cli } from "miniprogram-cli";

cli("-o")
  .then(console.log)
  .catch(console.error);
```
