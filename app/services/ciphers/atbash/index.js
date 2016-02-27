'use strict'

require('angular');

angular
    .module('app')
    .service('atbashService', require('./atbash.service.js'));

module.exports = 'atbashService'
