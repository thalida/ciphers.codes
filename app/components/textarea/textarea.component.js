'use strict';

// http://stackoverflow.com/a/5346855/1959215
// http://jsfiddle.net/CbqFv/

module.exports = {
    templateUrl: 'components/textarea/textarea.html',
    bindings: {
        model: '=',
        styles: '@?',
        placeholder: '@?',
        disabled: '@?',
        offset: '@?',
        marginBottom: '@?',
        onChangeCB: '&?onChange'
    },
    controller: ['$scope', '$element', '$window', '$timeout', function($scope, $el, $window, $timeout){
        var $ctrl = this;
        this.$id = $scope.$id;

        var $component = angular.element($el[0].querySelector('.cc_textarea'));
        var $textarea = angular.element($el[0].querySelector('.cc_textarea-field.main'));
        var $sizer = angular.element($el[0].querySelector('.cc_textarea-field.off_screen'));
        var $offset;
        if( this.offset ){
            var $offset = angular.element(document.querySelector(this.offset));
        }
        var $win = angular.element($window);

        var debounceTimeout;

        this.resize = function(){
            $sizer.text($ctrl.model);

            var componentOffset = $component[0].offsetTop;
            var offset = ($ctrl.offset) ? $offset[0].offsetHeight : 0;
            var marginBottom = $ctrl.marginBottom || 10;
            marginBottom = parseInt(marginBottom, 10);
            var minHeight = 64 * lineheight;
            var maxHeight = (window.innerHeight / 2) - componentOffset - offset - marginBottom;

            var lineheight = 1.4;
            var minFontSize = 14;
            var maxFontSize = 64;
            var fontSize;

            var sizerHeight;
            var ratio;

            $component[0].style.height = maxHeight + 'px';
            $sizer[0].style.fontSize = maxFontSize + 'px';

            sizerHeight = ($sizer[0].scrollHeight < minHeight) ? minHeight : $sizer[0].scrollHeight;
            ratio = +((maxHeight / sizerHeight).toFixed(3));
            fontSize = ( ratio > 1 ) ? maxFontSize : (maxFontSize * ratio);
            fontSize = ( fontSize < minFontSize ) ? minFontSize : fontSize;

            $sizer[0].style.fontSize = fontSize + 'px';
            $textarea[0].style.minHeight = minHeight + 'px';
            $textarea[0].style.maxHeight = maxHeight + 'px';
            $textarea[0].style.fontSize = fontSize + 'px';

            sizerHeight = ($sizer[0].scrollHeight < minHeight) ? minHeight : $sizer[0].scrollHeight;

            $textarea[0].style.height = 'auto';
            $textarea[0].style.height = ( sizerHeight > 0 ) ? sizerHeight + 'px' : 'auto';
            $textarea[0].style.overflow = ( sizerHeight >= maxHeight ) ? 'auto' : 'hidden';
        }

        this.delayedResize = function(){
            $timeout(this.resize, 0);
        }

        this.debouceResize = function(){
            if( typeof debounceTimeout !== 'undefined' && debounceTimeout !== null ){
                $timeout.cancel(debounceTimeout);
                debounceTimeout = null;
            }

            debounceTimeout = $timeout(this.resize, 100);
        }

        this.onChange = function(){
            this.onChangeCB({value: this.model});
            this.resize();
        }
        this.onCut = this.delayedResize;
        this.onPaste = this.delayedResize;
        this.onKeydown = this.delayedResize;
        this.onContainerClick = function(){
            $textarea[0].focus();
        }

        $textarea[0].focus();
        $textarea[0].select();
        this.resize();

        $win.bind('resize', function () {
            $scope.$apply();
        });

        $scope.$watch(
            function(){
                return $ctrl.model;
            },
            function(newText, oldText){
                if( newText === oldText ){
                    return;
                }

                $textarea[0].focus();
                $ctrl.delayedResize();
            }
        );

        $scope.$watchCollection(
            function(){
                return {w: $win[0].innerWidth, h: $win[0].innerHeight}
            },
            function( newDimensions, oldDimensions ){
                $ctrl.debouceResize();
            },
            true
        )
    }]
};
