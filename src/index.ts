#!/usr/bin/env node
import * as path from 'path';
const INFO = require('../../package.json');
import showLogoInfo from './lib/logo';
import showHelpInfo from './lib/help';
import * as log from './lib/log';
import { unitTest } from './tasks/test';
import { KarmaOptions } from './tasks/test';
import init from './tasks/init';

// 获取所有参数
const ARGVS = process.argv.slice(2);

// 不传任何命令时 展示logo信息
if (ARGVS.length === 0) {
    showLogoInfo('Shark TEST!', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    });
}

// command
const COMMAND = ARGVS[0];

// options
// const OPTIONS = ARGVS.slice(1);

// mock工程配置
const projectRootPath = process.cwd();
console.log(path.resolve(projectRootPath, 'karma.conf.js'));
const karmaOption: KarmaOptions = {
    codeCoverage: true,
    progress: true,
    sourcemaps: true,
    preserveSymlinks: false,
    checkForUpdates: true,
    configFile: path.resolve(projectRootPath, 'karma.conf.js'),
    watch: true,
    projectRoot: projectRootPath,
    browsers: ['Chrome']
};


switch (COMMAND) {
    // show version
    case '-v':
    case '--version':
        log.info(INFO['version']);
        break;
    // show help info
    case '-h':
    case '--help':
        showHelpInfo();
        break;
    // init
    case '-i':
    case 'init':
        init({});
        break;
    // unit test
    case '-u':
    case 'test':
        unitTest(karmaOption);
        break;
    default:
        break;
}
