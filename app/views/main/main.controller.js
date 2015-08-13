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
		$scope.selectedCipher = {};
		console.log( $scope.ciphers );

		$scope.onCipherChange = function(){
			var name = $scope.selectedCipherName;
			$scope.selectedCipher = $scope.ciphers[name];
		};

		$scope.renderAddons = function(){

		};
	}
]);
