const chalk = require('chalk');

const _log = console.log;
const info = (v: any) => _log(chalk.green(`[shark-test info]:${v}`));
const warn = (v: any) => _log(chalk.yellow(`[shark-test warn]:${v}`));
const error = (v: any) => _log(chalk.red(`[shark-test error]:${v}`));

export {
    info,
    warn,
    error
};
