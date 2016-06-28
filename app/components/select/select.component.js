'use strict';

module.exports = {
    templateUrl: 'components/select/select.html',
    bindings: {
        model: '=',
        options: '=',
        optionsExpr: '@',
        label: '@?',
        styles: '@?',
        tooltip: '@?',
        onChange: '&?'
    },
    controller: ['$scope', function($scope){
        this.$id = $scope.$id;
    }]
};
