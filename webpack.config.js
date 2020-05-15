const path = require('path');
const globule = require('globule');


const jsFilePaths = globule.find("./wwwroot/js/" + "*.js")
    .filter(filePath => filePath.indexOf("es5.js") === -1 || filePath.indexOf("min.js") === -1) ; // filter out compiled files.
module.exports = {
    entry: jsFilePaths,
    output: {
        filename: process.env.NODE_ENV === 'production' ? 'bundle-minified.js' : 'bundle.js',
        path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? './wwwroot/dist' : './wwwroot/build')
    },
    mode: 'none'
};