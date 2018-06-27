export interface KarmaOptions {
    codeCoverage?: boolean;
    progress?: boolean;
    sourcemaps?: boolean;
    preserveSymlinks?: boolean;
    checkForUpdates?: boolean;
    configFile?: string;
    watch?: boolean;
    projectRoot: string;
    browsers?: Array<string>;
}
/**
 * @description start karma server
 * @export
 * @param {*} option karma配置项
 * @returns Promise
 */
export declare const start: (option: KarmaOptions) => Promise<{}>;
/**
 * @description stop karma server
 * @export
 * @returns Promise
 */
export declare const stop: (option: KarmaOptions) => void;
