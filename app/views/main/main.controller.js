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
		var testStr = "Hello here's my str: a b cc\n\nd ef g g h i j\nk l m n o pqr s tuv wx y z - 1, 2, 3, 4 5 6789";
		var logGroup = function(name){
			console.group( name );
			for( var i = 1; i < arguments.length; i += 1){
				console.log( arguments[i] );
			}
			console.groupEnd();
		};

		$scope.ciphers = cipherCollection.get();
		console.log( $scope.ciphers );


		var caesarEncode = $scope.ciphers['caesar'].run({
			string: testStr,
			addons: {shift: 3}
		});
		var caesarDecode = $scope.ciphers['caesar'].run({
			isEncoding: false,
			string: caesarEncode,
			addons: {shift: 3}
		});
		logGroup( 'caesar', caesarEncode, caesarDecode );

		var affineEncode = $scope.ciphers['affine'].run({
			string: testStr,
			addons: {shift: 3}
		});
		var affineDecode = $scope.ciphers['affine'].run({
			isEncoding: false,
			string: affineEncode,
			addons: {shift: 3}
		});
		logGroup( 'affine', affineEncode, affineDecode );


		var atbashEncode = $scope.ciphers['atbash'].run({
			string: testStr
		});
		var atbashDecode = $scope.ciphers['atbash'].run({
			isEncoding: false,
			string: atbashEncode
		});
		logGroup( 'atbash', atbashEncode, atbashDecode );


		var keyedsubEncode = $scope.ciphers['keyedsub'].run({
			string: testStr,
			addons: {key: 'lorem'}
		});
		var keyedsubDecode = $scope.ciphers['keyedsub'].run({
			isEncoding: false,
			string: keyedsubEncode,
			addons: {key: 'lorem'}
		});
		logGroup( 'keyedsub', keyedsubEncode, keyedsubDecode );


		var masonEncode = $scope.ciphers['mason'].run({
			string: testStr
		});
		logGroup( 'mason', masonEncode );


		var playfairEncode = $scope.ciphers['playfair'].run({
			string: testStr,
			addons: {key: 'lorem'}
		});
		var playfairDecode = $scope.ciphers['playfair'].run({
			isEncoding: false,
			string: playfairEncode,
			addons: {key: 'lorem'}
		});
		logGroup( 'playfair', playfairEncode, playfairDecode );


		var polysqEncode = $scope.ciphers['polysq'].run({
			string: testStr,
			addons: {key: 'lorem'}
		});
		var polysqDecode = $scope.ciphers['polysq'].run({
			isEncoding: false,
			string: polysqEncode,
			addons: {key: 'lorem'}
		});
		logGroup( 'polysq', polysqEncode, polysqDecode );


		var vegenereEncode = $scope.ciphers['vegenere'].run({
			string: testStr,
			addons: {key: 'lorem'}
		});
		var vegenereDecode = $scope.ciphers['vegenere'].run({
			isEncoding: false,
			string: vegenereEncode,
			addons: {key: 'lorem'}
		});
		logGroup( 'vegenere', vegenereEncode, vegenereDecode );
	}
]);
