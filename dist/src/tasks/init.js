"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const test_config_1 = require("../config/test-config");
function default_1() {
    let testConfUrl = path.resolve(__dirname, '../initFile/shark-test-conf.json');
    fs.exists('./shark-test-conf.json', function (exists) {
        if (exists) {
            console.log('shark-test-conf.json文件已存在');
            exports.copyPolyfillAndTest(false);
            fs.exists('./karma.conf.js', function (exists) {
                if (!exists) {
                    exports.creatFile(path.resolve(__dirname, '../initFile/karma.conf.js'), './karma.conf.js', '');
                }
                else {
                    console.log('karma.conf.js文件已存在');
                }
            });
        }
        else {
            exports.creatFile(testConfUrl, './shark-test-conf.json', exports.copyPolyfillAndTest);
            exports.creatFile(path.resolve(__dirname, '../initFile/karma.conf.js'), './karma.conf.js', '');
        }
    });
}
exports.default = default_1;
exports.copyPolyfillAndTest = (isOverWrite) => {
    let option = test_config_1.getTestConfig();
    let polyfillsUrl = path.resolve('./', option.basePath + '/polyfills.ts');
    let testUrl = path.resolve('./', option.basePath + '/test.ts');
    if (isOverWrite) {
        exports.creatFile(path.resolve(__dirname, '../initFile/polyfills.ts'), polyfillsUrl, '');
        exports.creatFile(path.resolve(__dirname, '../initFile/test.ts'), testUrl, '');
    }
    else {
        fs.exists(polyfillsUrl, function (exists) {
            if (!exists) {
                exports.creatFile(path.resolve(__dirname, '../initFile/polyfills.ts'), polyfillsUrl, '');
            }
            else {
                console.log(polyfillsUrl + '文件已存在');
            }
        });
        fs.exists(testUrl, function (exists) {
            if (!exists) {
                exports.creatFile(path.resolve(__dirname, '../initFile/test.ts'), testUrl, '');
            }
            else {
                console.log(testUrl + '文件已存在');
            }
        });
    }
};
exports.creatFile = (input, output, fb) => {
    fs.open(output, 'w', function (e) {
        if (e) {
            throw e;
        }
        exports.fileCopy(input, output, () => {
            console.log(output + '创建成功');
            if (fb) {
                fb(true);
            }
        });
    });
};
exports.fileCopy = (filename1, filename2, done) => {
    let input = fs.createReadStream(filename1), output = fs.createWriteStream(filename2);
    input.on('data', function (d) { output.write(d); });
    input.on('error', function (err) { throw err; });
    input.on('end', function () {
        output.end();
        if (done) {
            done();
        }
    });
};
//# sourceMappingURL=/Users/bobo/Work/test/shark-test/src/tasks/init.js.map