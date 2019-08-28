import { resolve } from 'path';

/**
 * 获取当前package.json里的版本号
 */
export function getPkgVersion() {
    let version = process.env.npm_package_version;
    if (!version) {
        try {
            return require(resolve('package.json')).version;
        } catch{ }
    }
    return version;
}