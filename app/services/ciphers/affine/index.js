'use strict'

require('angular');

angular
    .module('app')
    .service('affineService', require('./affine.service.js'));

module.exports = 'affineService'
