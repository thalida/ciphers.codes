'use strict';

module.exports = {
    templateUrl: 'components/drawer/drawer.html',
    bindings: {
        content: '@',
    },
    controller: ['$scope', function($scope){
        this.$id = $scope.$id;
        this.isOpen = true;

        this.toggleDrawer = function(){
            this.isOpen = !this.isOpen;
        }
    }]
};
