'use strict'

require('angular');

angular
    .module('app')
    .service('masonService', require('./mason.service.js'));

module.exports = 'masonService'
