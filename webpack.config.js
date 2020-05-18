const globule = require('globule');
const { readdirSync } = require('fs');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');
const env = process.env.NODE_ENV;
//variables
const ROOT_DIRECTORY = "./wwwroot/js/";
const ALL_FILE_PATHS = recursiveFileSearch(ROOT_DIRECTORY, globule.find(ROOT_DIRECTORY + "*.js"));


const { plugins, outputFile, mode, outputFolder } = env === 'build'
    ? {
        plugins: [
            new UglifyJSPlugin(),
        ],
        outputfile: "bundle-minified.js",
        outputFolder: "./wwwroot/dist",
        mode: 'production'
    }
    : {

        outputFile: "bundle.js",
        outputFolder: "./wwwroot/build",
        mode: 'development',

    }
module.exports = {
    entry: ALL_FILE_PATHS,
    output: {
        filename: outputFile,
        path: path.resolve(__dirname, outputFolder)
    },
    mode: mode,
    module: {
        rules: [{
            // Only run ".js" files through Babel
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    devtool: 'source-map',
    plugins: plugins
};


/**
 * recursively search all subfolders in a given directory for a specified type of file.
 * and update the filePath with the full list of filePaths in the rootDirectory EXCLUDING web compiler compiled files:
 * *.es5.js & * .es5.min.js
 *
 * rootDirectory: The root directory to start searching in.
 * filePaths: an array of filePaths in the current folder and all parent folders.
 * fileSuffix: suffix of the file. Could be .js, .css etc.
 */
function recursiveFileSearch(rootDirectory, filePaths, fileSuffix) {
    readdirSync(rootDirectory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory()).forEach(directory => {

        globule.find(rootDirectory + directory.name + "/" + "*.js").forEach(filePath => {
            filePaths.push(filePath);
        });
        recursiveFileSearch(rootDirectory + directory.name + "/", filePaths, fileSuffix);
    });
    return filePaths.filter(filePath => filePath.indexOf("es5.js") === -1 && filePath.indexOf("es5.min.js") === -1); // filter out compiled files.
}

function contains(string, subString) {
    return string.indexOf(subString) !== -1;
}
