'use strict';

module.exports = {
    templateUrl: 'components/toggle/toggle.html',
    bindings: {
        model: '=',
        options: '=',
        styles: '@?',
        onChange: '&?'
    },
    controller: ['$scope', function($scope){
        this.$id = $scope.$id;
    }]
};
