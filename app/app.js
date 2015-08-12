'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
	'ngRoute'
]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
}]);
