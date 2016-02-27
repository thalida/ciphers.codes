'use strict'

require('angular');

angular
    .module('app')
    .service('keyedsubService', require('./keyedsub.service.js'));

module.exports = 'keyedsubService'
