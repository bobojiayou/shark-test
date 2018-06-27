#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const INFO = require('../../package.json');
const logo_1 = require("./lib/logo");
const help_1 = require("./lib/help");
const log = require("./lib/log");
const test_1 = require("./tasks/test");
const init_1 = require("./tasks/init");
const test_config_1 = require("./config/test-config");
// 获取所有参数
const ARGVS = process.argv.slice(2);
// 不传任何命令时 展示logo信息
if (ARGVS.length === 0) {
    logo_1.default('Shark TEST!', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    });
}
// command
const COMMAND = ARGVS[0];
// options
// const OPTIONS = ARGVS.slice(1);
switch (COMMAND) {
    // show version
    case '-v':
    case '--version':
        log.info(INFO['version']);
        break;
    // show help info
    case '-h':
    case '--help':
        help_1.default();
        break;
    // init
    case '-i':
    case 'init':
        init_1.default();
        break;
    // unit test
    case '-u':
    case 'test':
        test_1.start(test_config_1.getKarmaOption());
        break;
    case '-s':
    case 'stop':
        test_1.stop(test_config_1.getKarmaOption());
        break;
    default:
        break;
}
//# sourceMappingURL=/Users/bobo/Work/test/shark-test/src/index.js.map