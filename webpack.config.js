const globule = require('globule');
const { readdirSync } = require('fs')
const path = require( 'path' );

const filePaths = recursiveFileSearch(,globule.find("./wwwroot/js/" + ".js"));
const jsFilePaths = globule.find("./wwwroot/js/" + "*.js")
    .filter(filePath => filePath.indexOf("es5.js") === -1 && filePath.indexOf("min.js") === -1) ; // filter out compiled files.
module.exports = {
    entry: jsFilePaths,
    output: {
        filename: process.env.NODE_ENV === 'production' ? 'bundle-minified.js' : 'bundle.js',
        path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? './wwwroot/dist' : './wwwroot/build')
    },
    mode: 'none'
};


/**
 * recursively search all subfolders in a given directory for a specified type of file 
 * and return the found filePaths as an array.
 * 
 * rootDirectory: The root directory to start searching in.
 */
async function recursiveFileSearch(rootDirectory, filePaths, fileSuffix) {
    

    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory()).forEach(directory => {
            
    })
}
//https://stackoverflow.com/questions/18112204/get-all-directories-within-directory-nodejs/24594123