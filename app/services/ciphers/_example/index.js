'use strict'

require('angular');

angular
    .module('app')
    .service('_example-Service', require('./_example.service.js'));

module.exports = '_example-Service'
