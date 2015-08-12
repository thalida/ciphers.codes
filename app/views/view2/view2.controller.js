'use strict';

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/view2', {
		templateUrl: 'views/view2/view2.html',
		controller: 'View2Ctrl'
	});
}]);

app.controller('View2Ctrl', [
	'$rootScope',
	'$scope',
	function($rootScope, $scope) {

	}
]);
