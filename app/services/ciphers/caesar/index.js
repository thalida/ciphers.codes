'use strict'

require('angular');

angular
    .module('app')
    .service('caesarService', require('./caesar.service.js'));

module.exports = 'caesarService'
