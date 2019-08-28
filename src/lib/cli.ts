import os = require('os');
import path = require('path');
import fs = require('fs');

import iconv from 'iconv-lite';
import { exec, execFile, spawn, readFile, exists } from './promise';
import { SpawnOptions } from 'child_process';

const DEFAULT_CLI = 'cli';

/**
 * 获取 小程序CLI 路径
 * refer https://github.com/egret-labs/egret-core/blob/master/tools/commands/run.ts
 */
export async function getCLIPath() {
    const wxPaths: string[] = [];
    switch (os.platform()) {
        case "darwin":
            const result = await exec("defaults read com.tencent.wechat.devtools LastRunAppBundlePath");
            if (result && result.stdout) {
                const stdout = result.stdout.replace(/\n/g, "");
                wxPaths.push(path.join(stdout, "/Contents/Resources/app.nw/bin/cli"));
            }
            // defaults read
            wxPaths.push("/Applications/wechatwebdevtools.app/Contents/Resources/app.nw/bin/cli");
            break;
        case "win32":
            // defaults read
            wxPaths.push(
                "C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat",
                "C:\\Program Files\\Tencent\\微信web开发者工具\\cli.bat"
            );
            try {
                const encoding = 'cp936';
                const result2 = await exec('REG QUERY "HKLM\\SOFTWARE\\Wow6432Node\\Tencent\\微信web开发者工具"', { encoding: 'buffer' });
                const stdout: string = iconv.decode(result2.stdout, encoding);
                if (stdout) {
                    const stdoutArr = stdout.split("\r\n");
                    let exePath: string = stdoutArr.find((p) => p.indexOf(".exe") != -1) || "";
                    exePath = exePath.split("  ").find((path) => path.indexOf(".exe") != -1) || "";
                    exePath = path.join(path.dirname(exePath), 'cli.bat');
                    wxPaths.unshift(exePath);
                }
            } catch (error) {

            }

            break;
    }
    return wxPaths.find((wxpath) => fs.existsSync(wxpath));
}

/**
 * 获取CLI开启的端口号
 */
export function getPort(): Promise<number> {
    const home = os.homedir()
    const portPath = process.platform === 'win32'
        ? path.join(home, '/AppData/Local/微信开发者工具/User Data/Default/.ide')
        : path.join(home, '/Library/Application Support/微信开发者工具/Default/.ide');
    return exists(portPath).then(
        isExist => isExist
            ? readFile(portPath).then(p => +p.toString())
            : Promise.reject(isExist)
    );
}

/**
 * 执行CLI命令
 * @param args 
 */
export async function cli(...args: string[]) {
    const cliPath = await getCLIPath();
    if (cliPath) {
        return execFile(cliPath, args);
    } else {
        return exec(DEFAULT_CLI + ' ' + args.join(' '))
    }
}

/**
 * spwan 方式 调用 cli
 * @param args 
 * @param options 
 */
export async function cliSpawn(args: string[], options: SpawnOptions = {
    stdio: 'inherit',
    shell: true,
    windowsHide: true,
}) {
    const cliPath = await getCLIPath();
    return spawn('"' + cliPath + '"' || DEFAULT_CLI, args, options);
}