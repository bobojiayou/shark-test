"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
exports.getTestConfig = () => {
    const projectRoot = exports.getProjectRootPath();
    const testConfig = JSON.parse(fs.readFileSync(path.resolve(projectRoot, 'shark-test-conf.json'), 'utf-8'));
    testConfig.projectRoot = projectRoot;
    return testConfig;
};
exports.getProjectRootPath = () => {
    return process.cwd();
};
exports.getKarmaOption = () => {
    const testConfig = exports.getTestConfig();
    const configFile = testConfig.configFile || 'karma.conf.js';
    const defaultkarmaOption = {
        codeCoverage: false,
        progress: false,
        sourcemaps: true,
        preserveSymlinks: false,
        checkForUpdates: true,
        configFile: path.resolve(testConfig.projectRoot, configFile),
        watch: true,
        projectRoot: testConfig.projectRoot,
        browsers: ['Chrome']
    };
    return defaultkarmaOption;
};
exports.getWebpackTestConfig = () => {
    const config = exports.getTestConfig();
    return {
        projectRoot: config.projectRoot,
        main: config.main || 'test.ts',
        polyfills: config.polyfills || 'polyfills',
        componentPath: config.componentPath || 'src/main/webapp/app',
        basePath: config.basePath || 'src/main/webapp',
        indexTemplate: config.indexTemplate || 'index.ejs'
    };
};
exports.getKarmaTestConfig = () => {
    const config = exports.getTestConfig();
    return {
        projectRoot: config.projectRoot,
        main: config.main || 'test.ts',
        // assets: config.assets.map(v => path.resolve(config.projectRoot, config.basePath, v)) || [],
        assets: config.assets || [],
        basePath: config.basePath || 'src/main/webapp'
    };
};
//# sourceMappingURL=/Users/bobo/Work/test/shark-test/src/config/test-config.js.map