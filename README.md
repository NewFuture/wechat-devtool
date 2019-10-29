# wechat-devtool [![npm version](https://badge.fury.io/js/wechat-devtool.svg)](https://www.npmjs.com/package/wechat-devtool)

Wechat Miniprogram Devtool CLI cross-platform wrapper for NodeJS and npm

跨平台命令行调用微信开发工具

[![Build Status](https://travis-ci.org/NewFuture/wechat-devtool.svg?branch=master)](https://travis-ci.org/NewFuture/wechat-devtool)
![Build Status](https://github.com/NewFuture/wechat-devtool/workflows/Node%20CI/badge.svg)

## required 所需条件

1. 已经安装 [微信开发工具 devtools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 开启开发工具的设置`端口调用`

> 中文: 打开工具 -> 设置 -> 安全设置，将服务端口开启。
>
> English: open IDE -> Settings -> Security Settings, and set Service Port On.

## quick start

免安装，命令行调用

与[官网 cli](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html)用法一致(额外功能是支持相对路径): 使用`npx wechat-devtool`代替`cli`即可

```bash
npx wechat-devtool
# 参数调用和原生CLI 参数完全一样 但是支持相对路径
npx wechat-devtool --open ./dist
```

快速上传

```bash
# 当前目录
npx -p wechat-devtool upload
# 上传 dist 目录
npx -p wechat-devtool upload ./dist
# 记录上传日志
npx -p wechat-devtool upload ./dist --upload-info-output
```

## 高级用法

```bash
npm install wechat-devtool -D
```

安装之后会添加其他命令到本地项目,可在 npm scripts 中直接调用

- `cli` 等同于开发工具 CLI,更具系统和安装环境自动调用
- `upload` 快速上传(对 upload 操作的简化) `upload [[version@]path] [--upload-desc <desc>] [--upload-info-output <path>]`

`package.json` 配置文件

```json
{
  "scripts": {
    "upload": "upload ./dist",
    "cli": "cli"
  }
}
```

下面命令自动上传 dist 目录

```bash
npm run upload
```

## JS 模块调用

作为 JS 模块使用

```js
import { cli } from "wechat-devtool";

cli("-o")
  .then(console.log)
  .catch(console.error);
```
