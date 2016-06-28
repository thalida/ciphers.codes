'use strict';

module.exports = {
    templateUrl: 'components/toggle/toggle.html',
    bindings: {
        model: '=',
        options: '=',
        tooltip: '@?',
        styles: '@?',
        onChange: '&?'
    },
    controller: ['$scope', function($scope){
        this.$id = $scope.$id;
    }]
};
