# wechat-devtool

Wechat Miniprogram Devtool CLI cross-platform wrapper for NodeJS and npm

跨平台命令行调用微信开发工具

[![Build Status](https://travis-ci.org/NewFuture/miniprogram-cli.svg?branch=master)](https://travis-ci.org/NewFuture/miniprogram-cli)

## quick start

免安装，命令行调用
https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html

与官网用法一致,使用`npx wechat-devtool`代替`cli`即可

```bash
npx wechat-devtool
```

## 高级用法

`npm install wechat-devtool -D` 之后会添加其他命令到本地项目,可在 npm scripts 中直接调用

- `cli` 等同于开发工具 CLI,更具系统和安装环境自动调用
- `upload` 快速上传(对 upload 操作的简化) `upload [[version@]path] [--upload-desc <desc>] [--upload-info-output <path>]`

## JS 模块调用

作为 JS 模块使用

```js
import { cli } from "wechat-devtool";

cli("-o")
  .then(console.log)
  .catch(console.error);
```
