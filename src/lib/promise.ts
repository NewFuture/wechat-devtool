import util = require('util');
import fs = require('fs');
import child_process = require('child_process');

export const exec = util.promisify(child_process.exec);

export const execFile = util.promisify(child_process.execFile);

export const spawn = util.promisify(child_process.spawn)

export const exists = util.promisify(fs.exists)

export const readFile = util.promisify(fs.readFile)
