import * as path from 'path';
import * as fs from 'fs';
import { getTestConfig } from '../config/test-config';

export default function () {
    let testConfUrl = path.resolve(__dirname, '../initFile/shark-test-conf.json');
    fs.exists('./shark-test-conf.json', function (exists) {
        if (exists) {
            console.log('shark-test-conf.json文件已存在');
            copyPolyfillAndTest(false);
            fs.exists('./karma.conf.js', function (exists) {
                if (!exists) {
                    creatFile(path.resolve(__dirname, '../initFile/karma.conf.js'), './karma.conf.js', '');
                } else {
                    console.log('karma.conf.js文件已存在');
                }
            });
        } else {
            creatFile(testConfUrl, './shark-test-conf.json', copyPolyfillAndTest);
            creatFile(path.resolve(__dirname, '../initFile/karma.conf.js'), './karma.conf.js', '');
        }
    });
}

export const copyPolyfillAndTest = (isOverWrite: boolean) => {
    let option = getTestConfig();
    let polyfillsUrl = path.resolve('./', option.basePath + '/polyfills.ts');
    let testUrl = path.resolve('./', option.basePath + '/test.ts');
    if (isOverWrite) {
        creatFile(path.resolve(__dirname, '../initFile/polyfills.ts'), polyfillsUrl, '');
        creatFile(path.resolve(__dirname, '../initFile/test.ts'), testUrl, '');
    } else {
        fs.exists(polyfillsUrl, function (exists) {
            if (!exists) {
                creatFile(path.resolve(__dirname, '../initFile/polyfills.ts'), polyfillsUrl, '');
            } else {
                console.log(polyfillsUrl + '文件已存在');
            }
        });
        fs.exists(testUrl, function (exists) {
            if (!exists) {
                creatFile(path.resolve(__dirname, '../initFile/test.ts'), testUrl, '');
            } else {
                console.log(testUrl + '文件已存在');
            }
        });
    }
};

export const creatFile = (input: any, output: any, fb?: any) => {
    fs.open(output, 'w', function (e) {
        if (e) { throw e; }
        fileCopy(input, output, () => {
            console.log(output + '创建成功');
            if (fb) {
                fb(true);
            }
        });
    });
};

export const fileCopy = (filename1: any, filename2: any, done: any) => {
    let input = fs.createReadStream(filename1),
        output = fs.createWriteStream(filename2);
    input.on('data', function (d: any) { output.write(d); });
    input.on('error', function (err: any) { throw err; });
    input.on('end', function () {
        output.end();
        if (done) {
            done();
        }
    });
};
