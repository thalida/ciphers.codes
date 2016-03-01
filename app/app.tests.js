require('angular');
require('angular-mocks');
require('./app.module.js');

var testsContext = require.context(".", true, /.test.js$/);
testsContext.keys().forEach(testsContext);
