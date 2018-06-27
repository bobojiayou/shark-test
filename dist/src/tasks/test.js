"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const require_project_module_1 = require("../lib/require-project-module");
/**
 * @description start karma server
 * @export
 * @param {*} option karma配置项
 * @returns Promise
 */
exports.start = (option) => {
    return new Promise((resolve) => {
        const Karma = require_project_module_1.requireProjectModule(option.projectRoot, 'karma');
        const _karmaOptions = Object.assign({}, option);
        const karmaServer = new Karma.Server(_karmaOptions, resolve);
        karmaServer.start();
    });
};
/**
 * @description stop karma server
 * @export
 * @returns Promise
 */
exports.stop = (option) => {
    const Karma = require_project_module_1.requireProjectModule(option.projectRoot, 'karma');
    const Stopper = Karma.stopper;
    Stopper.stop(option, function (exitCode) {
        if (exitCode === 0) {
            console.log('Server stop');
        }
        process.exit(exitCode);
    });
};
//# sourceMappingURL=/Users/bobo/Work/test/shark-test/src/tasks/test.js.map