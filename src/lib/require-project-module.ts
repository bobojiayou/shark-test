const resolve = require('resolve');

// resolve dependencies within the target project
export function resolveProjectModule(root: any, moduleName: any) {
    return resolve.sync(moduleName, { basedir: root });
}

// require dependencies within the target project
export function requireProjectModule(root: string, moduleName: string) {
    return require(resolveProjectModule(root, moduleName));
}
