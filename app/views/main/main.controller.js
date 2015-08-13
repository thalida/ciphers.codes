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
		var testStr = 'AbcdefghijklmnopqrstuvwxyZ - 0123456789';
		var logGroup = function(name){
			console.group( name );
			for( var i = 1; i < arguments.length; i += 1){
				console.log( arguments[i] );
			}
			console.groupEnd();
		};

		$scope.ciphers = cipherCollection.get();
		console.log( $scope.ciphers );


		var masonEncode = $scope.ciphers['mason'].run({
			string: testStr
		});
		logGroup( 'mason', masonEncode );


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
