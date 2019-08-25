import util = require('util');
import child_process = require('child_process');

export const exec = util.promisify(child_process.exec);

export const execFile = util.promisify(child_process.execFile);

export const spawn = util.promisify(child_process.spawn)