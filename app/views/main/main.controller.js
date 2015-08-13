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
	'$sce',
	'cipherCollection',
	'cipherUtils',
	function($rootScope, $scope, $sce, cipherCollection, cipherUtils) {
		$scope.ciphers = cipherCollection.get();

		$scope.settings = {
			isEncoding: true,
			autoSubmit: false,
			cipherName: '',
			cipher: {},
			addons: {},
			originalText: ''
		};

		$scope.results = {};

		$scope.events = {
			onCipherChange: function(){
				$scope.results = {};
				$scope.settings.addons = {};
				$scope.settings.cipher = $scope.ciphers[$scope.settings.cipherName];
			},

			submit: function(){
				if( typeof $scope.settings.cipherName === 'undefined'
					|| $scope.settings.cipherName === null
					|| $scope.settings.cipherName.length === 0
				){
					return;
				}

				var params = {
					string: $scope.settings.originalText,
					isEncoding: $scope.settings.isEncoding
				};

				if( !angular.equals({}, $scope.settings.addons) ){
					params.addons = $scope.settings.addons;
				}

				$scope.results.text = $scope.settings.cipher.run( params );
				$scope.results.html = $sce.trustAsHtml( $scope.results.text );
			},

			checkIfAutoSubmit: function( collection ){
				if( $scope.settings.autoSubmit === true ){
					$scope.events.submit();
				}
			}
		};

		$scope.$watchCollection('settings', $scope.events.checkIfAutoSubmit, true);
		$scope.$watchCollection('settings.addons', $scope.events.checkIfAutoSubmit, true);
		$scope.$watchCollection('settings.cipher', $scope.events.checkIfAutoSubmit, true);
	}
]);
