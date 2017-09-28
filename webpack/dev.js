var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var commonConfig = require('./common');

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
		'./src/index.js'
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/' // hot loader publish dir
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				ENV: JSON.stringify('development'),
				version: JSON.stringify(require('../package.json').version)
			}
		}),
	],
	resolve: commonConfig.resolve,
	module: {
		rules: commonConfig.module.rules.concat({
			test: /\.(sc|c)ss$/,
			use: [
				{ loader: 'style-loader', options: { sourceMap: true } },
				{ loader: 'css-loader', options: { sourceMap: true } },
				{ loader: 'postcss-loader', options: { sourceMap: true } },
				{ loader: 'sass-loader', options: { sourceMap: true } }
			]
		})
	}
};
