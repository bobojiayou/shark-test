"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
const _log = console.log;
const info = (v) => _log(chalk.green(`[shark-test info]:${v}`));
exports.info = info;
const warn = (v) => _log(chalk.yellow(`[shark-test warn]:${v}`));
exports.warn = warn;
const error = (v) => _log(chalk.red(`[shark-test error]:${v}`));
exports.error = error;
//# sourceMappingURL=/Users/bobo/Work/test/st/src/lib/log.js.map