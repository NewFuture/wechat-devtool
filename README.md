# wechat-devtool

Wechat Miniprogram Devtool CLI cross-platform wrapper for NodeJS and npm

跨平台命令行调用微信开发工具

[![Build Status](https://travis-ci.org/NewFuture/miniprogram-cli.svg?branch=master)](https://travis-ci.org/NewFuture/miniprogram-cli)

## CLI Usage

命令行调用
https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html

与官网用法一致,使用`npx wechat-devtool`代替`cli`即可

```bash
npx wechat-devtool -o
```

## JS Module

作为 JS 模块使用

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
