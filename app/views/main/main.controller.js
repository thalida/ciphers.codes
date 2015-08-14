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

		$scope.fillerTypes = [
			{
				id: 'abc',
				label: 'Alphanumeric &amp; Symbols',
				text: "ABCDEFGHIJKLMNOPQRSTUVWXYZ\r\nabcdefghijklmnopqrstuvwxyz\r\n0123456789\r\n, . ; : ' \" ` ~ ! @ # $ % ^ & * ( )- _ = + [ ]{ } \\ / | < >\r\n"
			},
			{
				id: 'lorem',
				label: 'Lorem Ipsum',
				text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.\r\n"
			},
			{
				id: 'pangram',
				label: 'Pangrams',
				text: "Every good cow, fox, squirrel, and zebra likes to jump over happy dogs.\r\nWoven silk pyjamas exchanged for blue quartz.\r\nThe quick onyx goblin jumps over the lazy dwarf.\r\nBrawny gods just flocked up to quiz and vex him.\r\n"
			},
			{
				id: 'none',
				label: 'None',
				text: ''
			}
		];

		$scope.actionTypes = [
			{
				id: 'encrypt',
				value: true,
				label: 'Encrypt'
			},
			{
				id: 'decrypt',
				value: false,
				label: 'Decrypt'
			}
		];

		$scope.settings = {
			isEncoding: true,
			autoSubmit: false,
			fillerText: $scope.fillerTypes[3],
			cipher: {},
			addons: {},
			originalText: ''
		};

		$scope.results = {};


		$scope.events = {
			onCipherChange: function(){
				$scope.results = {};
				$scope.settings.addons = {};
			},

			onFillerChange: function(){
				$scope.settings.originalText = $scope.settings.fillerText.text;
			},

			onKeyAddonChange: function(){
				var onlyUnique = function (value, index, self) {
				    return self.indexOf(value) === index;
				};

				$scope.settings.addons.key = $scope.settings.addons.key.replace(/[^A-Za-z]+/gi, '').toLowerCase();
				var keyArr = $scope.settings.addons.key.split('');
				var unique = keyArr.filter(onlyUnique).join('');

				$scope.settings.addons.key = unique;
			},

			moveResultsText: function(){
				if( angular.isString($scope.results.text) ){
					$scope.settings.originalText = $scope.results.text;
					$scope.results = {};
				}
			},

			submit: function(){
				if( typeof $scope.settings.cipher === 'undefined'
					|| $scope.settings.cipher === null
					|| angular.equals({}, $scope.settings.cipher)
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
				var formattedText = $scope.results.text.replace(/\r?\n/g, '<br />');
				$scope.results.html = $sce.trustAsHtml( formattedText );
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
		$scope.$watch('settings.isEncoding', $scope.events.checkIfAutoSubmit);
	}
]);
