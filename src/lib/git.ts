import { exec, exists, readFile } from "./promise";

const EDIT_MSG_FILE = '.git/COMMIT_EDITMSG';

/**
 * 获取最近的commit message
 * 1. git log
 * 2. COMMIT_EDITMSG
 */
export async function getCommitMsg(): Promise<string> {
    try {
        const gitLog = await exec('git log -1 --pretty=%B')
        return gitLog.stdout;
    } catch{ }

    if (await exists(EDIT_MSG_FILE)) {
        return (await readFile(EDIT_MSG_FILE)).toString();
    }
    return Promise.reject('not found')
}