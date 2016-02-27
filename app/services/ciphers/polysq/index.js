'use strict'

require('angular');

angular
    .module('app')
    .service('polysqService', require('./polysq.service.js'));

module.exports = 'polysqService'
