#!/usr/bin/env node

/**
 * 直接调用
 */
import { cliSpawn } from '../lib/cli';

cliSpawn(process.argv.splice(2));