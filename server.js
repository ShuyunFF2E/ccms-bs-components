const path = require('path');
const webpack = require('webpack');
const config = require('./webpack/dev');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const app = express();

const compiler = webpack(config);


app.use(webpackDevMiddleware(compiler, {
	noInfo: false,
	stats: {
		colors: true,
		cached: false
	},
	publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(path.resolve('./demos')));
app.use('/src', express.static(path.resolve('./src')));

const port = 8080;
const host = '0.0.0.0';
app.listen(port, host, function(err) {
	if (err) {
		return console.error(err);
	}

	console.log(`Listening at http://localhost:${port}/`);
});
