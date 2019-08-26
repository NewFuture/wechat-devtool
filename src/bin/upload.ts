#!/usr/bin/env node

/**
 * 快速上传
 */
import { cliSpawn } from '../lib/cli';
import { getCommitMsg } from '../lib/git';
import { resolve } from 'path';

const OPTION_UPLOAD_DESC = '--upload-desc';

/**
 * 获取版本信息
 */
function getVersion() {
    const now = new Date();
    const version = `${process.env.npm_package_version}-${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}`
    return version[0] === '-' ? version.substr(1) : version;
}

/**
 * `upload [--upload-desc <desc>] [--upload-info-output <path>]`
 * `upload path [--upload-desc <desc>] [--upload-info-output <path>]`
 * `upload version@path [--upload-desc <desc>] [--upload-info-output <path>]`
 */
async function getArguments(args: string[]) {
    const version = getVersion();

    if (args[0] && args[0].startsWith('--upload')) {
        args.unshift(`${version}@${process.cwd()}`);
    } else if (args[0].indexOf('@') < 0) {
        args[0] = `${version}@${resolve(args[0])}`;
    }
    args.unshift("-u");

    if (args.indexOf(OPTION_UPLOAD_DESC) === -1) {
        try {
            const msg = await getCommitMsg();
            args.push(msg.trim());
            args.push(OPTION_UPLOAD_DESC);
        } catch{ }
    }
    return args;
}

getArguments(process.argv.slice(2)).then(args => cliSpawn(args));