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
        scrollTo: '@?',
        onChangeCB: '&?onChange'
    },
    controller: ['$scope', '$element', '$window', '$timeout', function($scope, $el, $window, $timeout){
        var $ctrl = this;

        var $win = angular.element($window);
        var $component = angular.element($el[0].querySelector('.cc_textarea'));
        var $textarea = angular.element($el[0].querySelector('.cc_textarea-field.main'));
        var $sizer = angular.element($el[0].querySelector('.cc_textarea-field.off_screen'));
        var $offset;

        var debounceTimeout;

        $ctrl.$onInit = function () {
            $ctrl.$id = $scope.$id;
            $ctrl.disabled = $ctrl.disabled === 'true';

            if( $ctrl.offset ){
                $offset = angular.element(document.querySelector($ctrl.offset));
            }

            $ctrl.resize();
            $ctrl.select();
            $ctrl.focus();
        };

        $ctrl.$onChanges = function () {};

        $ctrl.resize = function(){
            $sizer.text($ctrl.model);

            var componentOffset = $component[0].offsetTop;
            var offset = ($ctrl.offset) ? $offset[0].offsetHeight : null;
            var marginBottom = $ctrl.marginBottom || 0;
            marginBottom = parseInt(marginBottom, 10);

            var minHeight = 64;
            var maxHeight = ($component[0].clientHeight * 0.8);

            var minFontSize = 16;
            var maxFontSize = 64;
            var fontSize;

            var sizerHeight;
            var ratio;

            if (offset) {
                $component[0].style.height = 'calc(100% - ' + offset +'px)';
            }

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

            if( $ctrl.scrollTo ){
                if( $ctrl.scrollTo === 'top' ){
                    $textarea[0].scrollTop = 0;
                } else if( $ctrl.scrollTo === 'bottom' ){
                    $textarea[0].scrollTop = $textarea[0].scrollHeight;
                }
            }
        }

        $ctrl.delayedResize = function(){
            $timeout($ctrl.resize, 0);
        }

        $ctrl.debouceResize = function(){
            if( typeof debounceTimeout !== 'undefined' && debounceTimeout !== null ){
                $timeout.cancel(debounceTimeout);
                debounceTimeout = null;
            }

            debounceTimeout = $timeout($ctrl.resize, 100);
        }

        $ctrl.select = function(){
            if( $ctrl.disabled ){
                return;
            }
            $textarea[0].select();
        }

        $ctrl.focus = function(){
            if( $ctrl.disabled ){
                return;
            }
            $textarea[0].focus();
        }

        $ctrl.onChange = function(){
            $ctrl.onChangeCB({value: $ctrl.model});
            $ctrl.resize();
            $ctrl.focus();
        }

        $ctrl.onCut = $ctrl.delayedResize;

        $ctrl.onPaste = $ctrl.delayedResize;

        $ctrl.onKeyup = $ctrl.delayedResize;

        $ctrl.onKeydown = $ctrl.delayedResize;

        $ctrl.onContainerClick = $ctrl.focus;

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

                $ctrl.focus();
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
