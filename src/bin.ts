import { cliSpawn } from './cli';

cliSpawn(process.argv, {
    stdio: 'inherit',
    shell: true
});