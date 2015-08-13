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


		var caesarEncode = $scope.ciphers['caesar'].run({
			string: 'abcdefg',
			addons: {shift: 3}
		});
		var caesarDecode = $scope.ciphers['caesar'].run({
			isEncoding: false,
			string: caesarEncode,
			addons: {shift: 3}
		});
		console.log( caesarEncode, caesarDecode );


		var affineEncode = $scope.ciphers['affine'].run({
			string: 'abcdefg',
			addons: {shift: 3}
		});
		var affineDecode = $scope.ciphers['affine'].run({
			isEncoding: false,
			string: affineEncode,
			addons: {shift: 3}
		});
		console.log( affineEncode, affineDecode );


		var atbashEncode = $scope.ciphers['atbash'].run({
			string: 'abcdefg'
		});
		var atbashDecode = $scope.ciphers['atbash'].run({
			isEncoding: false,
			string: atbashEncode
		});
		console.log( atbashEncode, atbashDecode );


		var keyedsubEncode = $scope.ciphers['keyedsub'].run({
			string: 'abcdefg',
			addons: {key: 'lorem'}
		});
		var keyedsubDecode = $scope.ciphers['keyedsub'].run({
			isEncoding: false,
			string: keyedsubEncode,
			addons: {key: 'lorem'}
		});
		console.log( keyedsubEncode, keyedsubDecode );


		var masonEncode = $scope.ciphers['mason'].run({
			string: 'abcdefg'
		});
		console.log( masonEncode );
	}
]);
