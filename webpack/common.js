var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {

	resolve: {
		extensions: ['.js'],
		alias: {
			assets: path.join(__dirname, 'src/assets')
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'eslint-loader',
			enforce: 'pre',
			exclude: /node_modules/
		}, {
			test: /\.js$/,
			loaders: ['babel-loader'],
			exclude: /(node_modules|bower_components)/
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
