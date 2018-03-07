
const figlet = require('figlet');

export default function showLogoInfo(text: string, config?: Object) {
    figlet(text, config, (err: string, data: any) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    });
}
