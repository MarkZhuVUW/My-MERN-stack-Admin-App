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


