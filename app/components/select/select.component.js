'use strict';

module.exports = {
    templateUrl: 'components/select/select.html',
    bindings: {
        model: '=',
        options: '=',
        optionsExpr: '@',
        labelExpr: '@',
        styles: '@?',
        onChange: '&?'
    },
    controller: function(){

    }
};
