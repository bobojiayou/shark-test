
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
export const start = (option: KarmaOptions) => {
    return new Promise((resolve) => {
        const Karma = requireProjectModule(option.projectRoot, 'karma');
        const _karmaOptions: KarmaOptions = Object.assign({}, option);
        const karmaServer = new Karma.Server(_karmaOptions, resolve);
        karmaServer.start();
    });
};

/**
 * @description stop karma server
 * @export
 * @returns Promise
 */
export const stop = (option: KarmaOptions) => {
    const Karma = requireProjectModule(option.projectRoot, 'karma');
    const Stopper = Karma.stopper;
    Stopper.stop(option, function (exitCode: number) {
        if (exitCode === 0) {
            console.log('Server stop');
        }
        process.exit(exitCode);
    });
};

