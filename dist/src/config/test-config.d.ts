import { KarmaOptions } from '../tasks/test';
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
export declare const getTestConfig: () => TestConfig;
export declare const getProjectRootPath: () => string;
export declare const getKarmaOption: () => KarmaOptions;
export declare const getWebpackTestConfig: () => WebpackTestConfig;
export declare const getKarmaTestConfig: () => KarmaTestConfig;
