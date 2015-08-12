'use strict';

var app = angular.module('app', [
	'ngRoute'
]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
}]);

app.run([
	'caesarService',
	'affineService',
	function(){

	}
]);
