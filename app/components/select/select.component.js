'use strict';

module.exports = {
    templateUrl: 'components/select/select.html',
    bindings: {
        model: '=',
        options: '=',
        optionsExpr: '@',
        label: '@?',
        styles: '@?',
        onChange: '&?'
    },
    controller: ['$scope', function($scope){
        this.$id = $scope.$id;
    }]
};
