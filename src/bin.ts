#!/usr/bin/env node

import { cliSpawn } from './cli';

cliSpawn(process.argv, {
    stdio: 'inherit',
    shell: true
});