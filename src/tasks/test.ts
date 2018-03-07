
import { requireProjectModule } from '../lib/require-project-module';

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
export const unitTest = (option: KarmaOptions) => {
    return new Promise((resolve) => {
        const karma = requireProjectModule(option.projectRoot, 'karma');
        const _karmaOptions: KarmaOptions = Object.assign({}, option);
        const karmaServer = new karma.Server(_karmaOptions, resolve);
        karmaServer.start();
    });
};


