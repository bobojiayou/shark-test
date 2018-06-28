"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function showHelpInfo() {
    process.stdout.write('\n' + [
        'Usage: shark-generator [Command] [Options]',
        '',
        'Options',
        '',
        '-h, --help                   show the help info',
        '-v, --version                 show the version info',
        '',
        '--default        <projectGenerator>      the default project to generator for',
        '',
        'shark-test:',
        '--init, -i        <dir>    generator projectTemplate to the dir',
        '--module, -m      <dir>    generator module template to the dir',
        '--directive, -d   <dir>    generator directive template file to the dir',
        '--router, -r      <dir>    generator router template to the dir',
        '--component, -m   <dir>    generator component template to the dir'
    ].join('\n') + '\n');
}
exports.default = showHelpInfo;
