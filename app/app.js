'use strict';

var app = angular.module('app', [
	'ngRoute'
]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
}]);

app.run([
	'affineService',
	'atbashService',
	'caesarService',
	'keyedsubService',
	'masonService',
	'playfairService',
	'polysqService',
	function(){

	}
]);
