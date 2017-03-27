'use strict';
let path = require('path');

module.exports = {
    entry: path.join(__dirname, "src", 'public', "scripts", "main.js"),
    output: {
        path: path.join(__dirname, "src", 'public', "scripts"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};