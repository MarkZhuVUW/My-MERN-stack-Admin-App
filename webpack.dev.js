const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");

//variables
const ROOT_DIRECTORY = "./wwwroot/js/";
const OUTPUT_FOLDER = "./wwwroot/build";
const OUTPUT_FILE = "bundle-dev.js";
const ALL_FILE_PATHS = recursiveFileSearch(ROOT_DIRECTORY, globule.find(ROOT_DIRECTORY + "*.js"));

module.exports = merge(common, {
    entry: ALL_FILE_PATHS,
    output: {
        filename: OUTPUT_FILE,
        path: path.resolve(__dirname, OUTPUT_FOLDER)
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

    plugins: ([
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("development")
            }
        })
    ]),
});

// const path = require("path");
// const webpack = require("webpack");
// const Merge = require("webpack-merge");
// const CommonConfig = require("./webpack.common.js");
//
// module.exports = Merge(CommonConfig, {
//     devtool: "inline-source-map",
//
//     entry: path.resolve(__dirname, "src/index.ts"),
//
//     output: {
//         filename: "bundle.js",
//         path: __dirname + "/dist",
//         // Making sure the CSS and JS files that are split out do not break the template cshtml.
//         publicPath: "/dist/",
//         // Defining a global var that can used to call functions from within ASP.NET Razor pages.
//         library: "aspAndWebpack",
//         libraryTarget: "var"
//     },
//
//     module: {
//         loaders: [
//             // All css files will be handled here
//             {
//                 test: /\.css$/,
//                 use: ["style-loader", "css-loader"]
//             },
//
//             // All files with ".less" will be handled and transpiled to css
//             {
//                 test: /\.less$/,
//                 use: ["style-loader", "css-loader", "less-loader"]
//             }
//         ]
//     },
//
//     plugins: ([
//         new webpack.DefinePlugin({
//             "process.env": {
//                 "NODE_ENV": JSON.stringify("development")
//             }
//         })
//     ]),
// })