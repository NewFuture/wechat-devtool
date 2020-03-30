#!/usr/bin/env node

/**
 * 快速上传
 */
import { resolve } from 'path';

import { cliSpawn } from '../lib/cli';
import { getCommitMsg } from '../lib/git';
import { getPkgVersion } from '../lib/npm';

const OPTION_UPLOAD_DESC = '--desc';
const OPTION_UPLOAD_OUTPUT = '--info-output';
const OPTION_VERSION = '--version';
const OPTION_VERSION_SHORT = '-v';

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
function getVersionStr() {
    const now = new Date();
    const version = getPkgVersion()
    const versionDesc = `${version || ""}-${get2Digit(now.getMonth() + 1)}${get2Digit(now.getDate())}${get2Digit(now.getHours())}${get2Digit(now.getMinutes())}`
    return versionDesc[0] === '-' ? versionDesc.substr(1) : versionDesc;
}

/**
 * `upload [--desc <desc>] [--info-output <path>]`
 * `upload path [--desc <desc>] [--info-output <path>]`
 * `upload version@path [--desc <desc>] [--info-output <path>]`
 */
async function getArguments(args: string[]) {
    const options = ["upload"]
    const version = getVersionStr();
    // --upload
    if (!args[0]) {
        // // args.unshift(`${version}@${process.cwd()}`);
        // args.unshift('--project', process.cwd(), OPTION_VERSION, version);
        options.push('--project', process.cwd());
    } else if (!args[0].startsWith('--')) {
        options.push('--project', resolve(args[0]));
    }
    if (args.indexOf(OPTION_VERSION) === -1 && args.indexOf(OPTION_VERSION_SHORT) === -1) {
        args.unshift(OPTION_VERSION, version);
    }
    args.unshift("upload");

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
            args.push(msg.trim().substr(0, 2048));
        } catch (e) { }
    }

    return args;
}

getArguments(process.argv.slice(2))
    .then(cliSpawn);