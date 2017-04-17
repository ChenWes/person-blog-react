var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var APP_PATH = path.resolve(__dirname, 'app/main.js');
var BUILD_PATH = path.resolve(__dirname, 'build');

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDom = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');

var config = {
    entry: APP_PATH,
    resolve: {
        alias: {
            'react': pathToReact,
            'react-dom': pathToReactDom,
        }
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader?presets[]=es2015,presets[]=react']
        }, {
            test: /\.css$/,
            // loader: 'style-loader!css-loader!less-loader'
            loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader", publicPath: "../" })
        }, {
            test: /\.(jpe?g|png|gif)$/,
            loader: 'url-loader',
            query: {
                limit: 50000,
                name: 'static/img/[name].[ext]?[hash:7]'
            }
        }, {
            test: /\.(eot|woff|woff2|ttf|svg)$/, 
            loader: "file-loader",
            query: {
                name: 'css/[hash].[ext]'
            }
        }],
        noParse: [pathToReact, pathToReactDom]
    },
    plugins: [
        new ExtractTextPlugin("css/bundle.css")
    ]
}

module.exports = config;