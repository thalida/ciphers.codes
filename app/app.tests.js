require('angular');
require('angular-mocks');
require('./');

var testsContext = require.context(".", true, /.test$/);
testsContext.keys().forEach(testsContext);
