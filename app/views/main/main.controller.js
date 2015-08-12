'use strict';

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/main/main.html',
		controller: 'MainCtrl'
	});
}]);

app.controller('MainCtrl', [
	'$rootScope',
	'$scope',
	'cipherCollection',
	'cipherUtils',
	function($rootScope, $scope, cipherCollection, cipherUtils) {
		$scope.ciphers = cipherCollection.get();

		console.log( $scope.ciphers );
		console.log( $scope.ciphers['caesar'].run({string: 'abcdefg', addons: {shift: 3}}));
	}
]);
