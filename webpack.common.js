const path = require('path');
const env = process.env.NODE_ENV;
const webpack = require("webpack");

//variables
const ROOT_DIRECTORY = "./wwwroot/js/";
const globule = require('globule');
const { readdirSync } = require('fs');
const ALL_FILE_PATHS = recursiveFileSearch(ROOT_DIRECTORY, globule.find(ROOT_DIRECTORY + "*.js"));
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    target: "web",

    resolve: {
        // for now there is only .js
        extensions: [".js"],
    },

    plugins: ([

        new HtmlWebpackPlugin({
            inject: "body",
            filename: "../Views/Shared/_Layout.cshtml",
            template: "./Views/Shared/_Layout_Template.cshtml"
        })
    ]),

    // pretty terminal output
    stats: { colors: true }
};

//
//
// const webpack = require("webpack");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
//
// module.exports = {
//     target: "web",
//
//     resolve: {
//         // Add ".ts" and ".tsx" as resolvable extensions.
//         extensions: [".ts", ".tsx", ".js", ".json", ".html"],
//     },
//
//     module: {
//         loaders: [
//             // All files with a ".ts" or ".tsx" extension will be handled by "awesome-typescript-loader".
//             { test: /.ts$/, loader: "awesome-typescript-loader" },
//
//             // All image files will be handled here
//             {
//                 test: /\.(png|svg|jpg|gif)$/,
//                 use: [
//                     "file-loader"
//                 ]
//             },
//
//             // All font files will be handled here
//             {
//                 test: /\.(woff|woff2|eot|ttf|otf)$/,
//                 use: [
//                     {
//                         loader: "file-loader"
//                     }
//                 ]
//             },
//
//             // All files with ".html" will be handled
//             { test: /\.html$/, loader: "html-loader" },
//
//             // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
//             { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
//         ]
//     },
//
//     plugins: ([
//         // make sure we allow any jquery usages outside of our webpack modules
//         new webpack.ProvidePlugin({
//             $: "jquery",
//             jQuery: "jquery",
//             "window.jQuery": "jquery"
//         }),
//
//         // Clean dist folder.
//         new CleanWebpackPlugin(["./dist"], {
//             "verbose": true // Write logs to console.
//         }),
//
//         // avoid publishing when compilation failed.
//         new webpack.NoEmitOnErrorsPlugin(),
//
//         new HtmlWebpackPlugin({
//             inject: "body",
//             filename: "../Views/Shared/_Layout.cshtml",
//             template: "./Views/Shared/_Layout_Template.cshtml"
//         })
//     ]),
//
//     // pretty terminal output
//     stats: { colors: true }
// };