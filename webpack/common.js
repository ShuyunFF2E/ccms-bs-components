var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {

	resolve: {
		extensions: ['.js'],
		alias: {
			'@': path.resolve('./src')
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'eslint-loader',
			enforce: 'pre',
			// exclude: /(node_modules|bower_components)/,
		}, {
			test: /\.js$/,
			loaders: ['babel-loader'],
			// exclude: /(node_modules|bower_components)/,
		}, {
			test: /\.html$/,
			loader: 'html-loader',
			query: { interpolate: true },
			exclude: /(node_modules|bower_components)/
		}, {
			test: /\.(ttf|woff|svg|eot)$/,
			loader: 'file-loader'
		}]
	}
};
