"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const require_project_module_1 = require("../lib/require-project-module");
/**
 * @description start karma server
 * @export
 * @param {*} option karma配置项
 * @returns Promise
 */
exports.unitTest = (option) => {
    return new Promise((resolve) => {
        const karma = require_project_module_1.requireProjectModule(option.projectRoot, 'karma');
        const _karmaOptions = Object.assign({}, option);
        const karmaServer = new karma.Server(_karmaOptions, resolve);
        karmaServer.start();
    });
};
//# sourceMappingURL=/Users/bobo/Work/test/st/src/tasks/test.js.map