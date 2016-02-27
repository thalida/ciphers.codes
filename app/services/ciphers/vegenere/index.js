'use strict'

require('angular');

angular
    .module('app')
    .service('vegenereService', require('./vegenere.service.js'));

module.exports = 'vegenereService'
