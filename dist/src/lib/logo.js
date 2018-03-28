"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const figlet = require('figlet');
function showLogoInfo(text, config) {
    figlet(text, config, (err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    });
}
exports.default = showLogoInfo;
//# sourceMappingURL=/Users/bobo/Work/test/st/src/lib/logo.js.map