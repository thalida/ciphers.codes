var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';
// webpackConfig.context = null;
webpackConfig.entry = {};
webpackConfig.output = {};

module.exports = function(config){
	config.set({
		basePath: '',
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch : true,
		frameworks: ['jasmine'],
		browsers : ['PhantomJS2'],
		singleRun: true,
		files: ['./app/app.tests.js'],
		preprocessors: {
			'./app/app.tests.js': ['webpack']
		},
		// files: ['./app/**/*.test.js'],
		// preprocessors: {
		// 	'./app/**/*.test.js': ['webpack']
		// },
		webpack: webpackConfig,
		webpackMiddleware: {
			noInfo: true
		},
		reporters: [ 'progress', 'coverage' ],
		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
		}
	});
};
