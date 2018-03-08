"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const require_project_module_1 = require("../lib/require-project-module");
/**
 * @description start karma server
 * @export
 * @param {*} karmaOption karma配置项
 * @returns Promise
 */
function default_1(karmaOptions) {
    return new Promise((resolve) => {
        const karma = require_project_module_1.requireProjectModule(karmaOptions.projectRoot, 'karma');
        const _karmaOptions = Object.assign({}, karmaOptions);
        const karmaServer = new karma.Server(_karmaOptions, resolve);
        karmaServer.start();
    });
}
exports.default = default_1;
//# sourceMappingURL=/Users/bobo/Work/test/shark-test/src/commands/test.js.map