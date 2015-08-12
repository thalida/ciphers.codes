'use strict';

app.directive('helloworld', [
	function(){
		return {
			scope: {
				name: '@'
			},
			templateUrl: 'components/helloworld/helloworld.html',
			transclude: true,
			link: function($scope, iElm, iAttrs, controller) {

			}
		};
	}
]);
