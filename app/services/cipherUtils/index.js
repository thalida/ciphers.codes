'use strict'

require('angular');

angular
    .module('app')
    .service('cipherUtils', require('./cipherUtils.service.js'));

module.exports = 'cipherUtils'
