var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var APP = __dirname + '/app';
var DIST = __dirname + '/dist';

module.exports = function(config){
	config.set({
		basePath : '',
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch : true,
		frameworks: ['jasmine'],
		browsers : ['PhantomJS2'],
		singleRun: true,
		files: [
			'app/app.tests.js'
		],
		preprocessors: {
			'app/app.tests.js': ['webpack', 'sourcemap']
		},
		reporters: [ 'progress', 'coverage' ],
	    coverageReporter: {
	        type: 'html',
	        dir: 'coverage/'
	    },
		webpack: {
			devtool: 'eval',
			module: {
				preLoaders: [
					{
					  test: /(\.jsx)|(\.js)$/,
					  exclude: /(test|node_modules|bower_components)\//,
					  loader: 'isparta-instrumenter-loader'
					}
				],
				loaders: [
					{
							test: require.resolve('angular'),
							loader: "expose?angular"
					},
					{
							test: /\.scss$/,
							loader: "css-loader!resolve-url-loader!sass-loader"
					},
					{
							test: /\.html$/,
							loader: 'ngtemplate?relativeTo=' + APP + '/!html',
							exclude: path.resolve(APP, 'index.html')
					},
					{
							test: /\.(woff|woff2|ttf|eot|svg|png|gif|jpg|jpeg|wav|mp3)(\?]?.*)?$/,
							loader: 'null'
					},
					{
							test: /\.(json)(\?]?.*)?$/,
							loader: 'file-loader?name=[path][name].[ext]'
					}
				]
			},
			cache: true
		},
		webpackMiddleware: {
			noInfo: true
		}
	});
};
