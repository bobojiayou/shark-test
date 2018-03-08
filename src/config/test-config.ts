import * as path from 'path';
import { KarmaOptions } from '../tasks/test';
import * as fs from 'fs';

export interface TestConfigCommon {
    main: string;
    polyfills: string;
    componentPath: string;
    assets?: Array<string>;
    projectRoot: string;
    basePath: string;
    indexTemplate: string;
}

export interface WebpackTestConfig extends TestConfigCommon {
}

export interface TestConfig extends TestConfigCommon {
    configFile: string;
}

export interface KarmaTestConfig {
    projectRoot: string;
    main: string;
    basePath: string;
    assets: Array<string>;
}

export const getTestConfig = (): TestConfig => {
    const projectRoot = getProjectRootPath();
    const testConfig = JSON.parse(fs.readFileSync(path.resolve(projectRoot, 'shark-test-conf.json'), 'utf-8'));
    testConfig.projectRoot = projectRoot;
    return testConfig;
};

export const getProjectRootPath = () => {
    return process.cwd();
};

export const getKarmaOption = (): KarmaOptions => {
    const testConfig = getTestConfig();
    const configFile = testConfig.configFile || 'karma.conf.js';
    const defaultkarmaOption: KarmaOptions = {
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

export const getWebpackTestConfig = (): WebpackTestConfig => {
    const config = getTestConfig();
    return {
        projectRoot: config.projectRoot,
        main: config.main || 'test.ts',
        polyfills: config.polyfills || 'polyfills',
        componentPath: config.componentPath || 'src/main/webapp/app',
        basePath: config.basePath || 'src/main/webapp',
        indexTemplate: config.indexTemplate || 'index.ejs'
    };
};

export const getKarmaTestConfig = (): KarmaTestConfig => {
    const config = getTestConfig();
    return {
        projectRoot: config.projectRoot,
        main: config.main || 'test.ts',
        // assets: config.assets.map(v => path.resolve(config.projectRoot, config.basePath, v)) || [],
        assets: config.assets || [],
        basePath: config.basePath || 'src/main/webapp'

    };
};

