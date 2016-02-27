'use strict'

require('angular');

angular
    .module('app')
    .service('cipherCollection', require('./cipherCollection.service.js'));

module.exports = 'cipherCollection'
