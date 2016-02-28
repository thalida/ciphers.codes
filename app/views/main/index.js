'use strict';

require('../../components/select');
require('../../components/input');

require('../../services/cipherCollection');
require('../../services/cipherUtils');

require('./main.scss');
require('./main.html');

module.exports = angular.module('app.main', [])
    .config( require('./main.route.js') )
    .controller('MainController', require('./main.controller.js') )
