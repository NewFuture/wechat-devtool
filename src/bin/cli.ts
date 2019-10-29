#!/usr/bin/env node

/**
 * 直接调用
 */
import { resolve } from 'path';

import { cliSpawn } from '../lib/cli';

const args = process.argv.splice(2);
// 相对路径转绝对路径
args.forEach((value, index) => {
    if (index > 0 && value && (value.startsWith('./') || value.startsWith('../'))) {
        args[index] = resolve(value)
    }
})
cliSpawn(args, { timeout: 600000 });