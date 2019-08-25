# wechat-devtool

Wechat Miniprogram Devtool CLI cross-platform wrapper for NodeJS and npm

跨平台命令行调用微信开发工具

## CLI Usage

命令行调用
https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html

与官网用法一致,使用`npx wechat-devtool`代替`cli`即可

```bash
npx wechat-devtool -o
```

## JS Module
作为JS模块使用

安装
```bash
npm i wechat-devtool
```
使用

```js
import { cli } from "wechat-devtool";

cli("-o")
  .then(console.log)
  .catch(console.error);
```
