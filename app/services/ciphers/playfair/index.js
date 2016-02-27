'use strict'

require('angular');

angular
    .module('app')
    .service('playfairService', require('./playfair.service.js'));

module.exports = 'playfairService'
