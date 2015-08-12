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

		var caesarEncode = $scope.ciphers['caesar'].run({
			string: 'abcdefg',
			addons: {shift: 3}
		});

		var caesarDecode = $scope.ciphers['caesar'].run({
			isEncoding: false,
			string: caesarEncode,
			addons: {shift: 3}
		});

		var affineEncode = $scope.ciphers['affine'].run({
			string: 'abcdefg',
			addons: {shift: 3}
		});

		var affineDecode = $scope.ciphers['affine'].run({
			isEncoding: false,
			string: affineEncode,
			addons: {shift: 3}
		});


		console.log( $scope.ciphers );
		console.log( caesarEncode, caesarDecode );
		console.log( affineEncode, affineDecode );
	}
]);
