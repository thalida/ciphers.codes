'use strict';

module.exports = {
    templateUrl: 'components/input/input.html',
    bindings: {
        styles: '@?',
        model: '=',
        default: '<',
        type: '@',
        placeholder: '@?',
        label: '@?',
        onKeyup: '&?',
        onChange: '&?'
    },
    controller: function(){
        if( typeof this.model === 'undefined' || this.model === null ){
            this.model = this.default;
        }
    }
};
