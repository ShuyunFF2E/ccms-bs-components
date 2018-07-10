var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var commonConfig = require('./common');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'source-map',
    entry: {
        'components': './src/index.js',
        'components.min': './src/index.js'
    },

    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js'
    },

    externals: {
        'jquery': 'jquery',
        'angular': 'angular',
        'ccms-ep-components': '\'ccms.components\'',
        // 'angular-resource': '\'angular-resource\'',
        // 'angular-ui-router': '\'angular-ui-router\'',
        // 'angular-es-utils': '\'angular-es-utils\''
    },

    plugins: [
        new ExtractTextPlugin('components.css'),
        new webpack.DefinePlugin({
            'process.env': {
                ENV: JSON.stringify('production'),
                version: JSON.stringify(require('../package.json').version)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            sourceMap: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    resolve: commonConfig.resolve,

    module: {
        rules: commonConfig.module.rules.concat([{
            test: /\.(sc|c)ss$/,
            include: /node_modules|src\/assets/,
            use: ExtractTextPlugin.extract({
                use: [
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            })
        }, {
            test: /\.(sc|c)ss$/,
            exclude: /node_modules|src\/assets/,
            use: ExtractTextPlugin.extract({
                use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            camelCase: true,
                            localIdentName: '[local]--[hash:base64:8]'
                        }
                    },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            })
        }])
    }
};
