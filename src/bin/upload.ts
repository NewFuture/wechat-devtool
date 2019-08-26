#!/usr/bin/env node

/**
 * 快速上传
 */
import { cliSpawn } from '../lib/cli';
import { getCommitMsg } from '../lib/git';
import { resolve } from 'path';

const OPTION_UPLOAD_DESC = '--upload-desc';
const OPTION_UPLOAD_OUTPUT = '--upload-info-output';

/**
 * 数字转 2 位字符
 * @param int 
 */
function get2Digit(int: number) {
    return int < 10 ? `0${int}` : '' + int;
}

/**
 * 获取版本信息
 */
function getVersion() {
    const now = new Date();
    let version = process.env.npm_package_version;
    if (!version) {
        try {
            version = require(resolve('package.json')).version
        } catch{ }
    }
    const versionDesc = `${version || ""}-${get2Digit(now.getMonth() + 1)}${get2Digit(now.getDate())}${get2Digit(now.getHours())}${get2Digit(now.getMinutes())}`
    return versionDesc[0] === '-' ? versionDesc.substr(1) : versionDesc;
}

/**
 * `upload [--upload-desc <desc>] [--upload-info-output <path>]`
 * `upload path [--upload-desc <desc>] [--upload-info-output <path>]`
 * `upload version@path [--upload-desc <desc>] [--upload-info-output <path>]`
 */
async function getArguments(args: string[]) {
    const version = getVersion();

    // --upload
    if (!args[0] || args[0].startsWith('--upload')) {
        args.unshift(`${version}@${process.cwd()}`);
    } else if (args[0].indexOf('@') < 0) {
        args[0] = `${version}@${resolve(args[0])}`;
    }
    args.unshift("-u");

    //--upload-info-output
    const outputIndex = args.indexOf(OPTION_UPLOAD_OUTPUT);
    if (outputIndex >= 0) {
        if (args[outputIndex + 1]) {
            // 支持相对路径
            args[outputIndex + 1] = resolve(args[outputIndex + 1]);
        } else {
            // 后面是空 使用默认命令
            args.splice(outputIndex + 1, 0, resolve(`log-${version}.json`));
        }
    }

    //--upload-desc
    if (args.indexOf(OPTION_UPLOAD_DESC) === -1) {
        try {
            const msg = await getCommitMsg();
            args.push(OPTION_UPLOAD_DESC);
            args.push(msg.trim());
        } catch{ }
    }

    return args;
}

getArguments(process.argv.slice(2))
    .then(cliSpawn);