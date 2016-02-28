'use strict';

// http://stackoverflow.com/a/5346855/1959215
// http://jsfiddle.net/CbqFv/

module.exports = {
    templateUrl: 'components/textarea/textarea.html',
    bindings: {
        model: '=',
        styles: '@?',
        placeholder: '@?',
        onChangeCB: '&?onChange'
    },
    controller: ['$scope', '$element', '$window', '$timeout', function($scope, $el, $window, $timeout){
        var $ctrl = this;
        this.$id = $scope.$id;

        var $component = angular.element(document.querySelector('.cc_textarea'));
        var $textarea = angular.element(document.querySelector('.cc_textarea-field.main'));
        var $sizer = angular.element(document.querySelector('.cc_textarea-field.off_screen'));
        var $win = angular.element($window);

        var $primaryHeader = angular.element(document.querySelector('.main-view-form-primary_settings'));
        var $secondaryHeader = angular.element(document.querySelector('.main-view-form-secondary_settings'));
        var headerHeights = $primaryHeader[0].offsetHeight + $secondaryHeader[0].offsetHeight;

        var debounceTimeout;


        this.resize = function(){
            $sizer.text($ctrl.model);

            var margin = 20;
            var marginTop = margin;

            var minHeight = 64 * lineheight;
            var maxHeight = (window.innerHeight / 2) - headerHeights - (margin * 2);

            var lineheight = 1.4;
            var minFontSize = 14;
            var maxFontSize = 64;
            var fontSize;

            var sizerHeight;
            var textareaHeight;
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

        this.resize_1 = function(){
            // $sizer.text($ctrl.model);

            // var lineheight = 1.4;
            // var margin = 20;
            // var marginTop = margin;

            // var minHeight = 64 * lineheight;
            // var maxHeight = (window.innerHeight / 2) - headerHeights - (margin * 2);
            // var height = ($sizer[0].scrollHeight < minHeight) ? minHeight : $sizer[0].scrollHeight;

            // console.log('height 1: ', height);
            // var minFontSize = 12;
            // var maxFontSize = 64;
            // // var fontSize = Math.floor((maxFontSize - lineheight) - (height / maxFontSize));
            // var fontSize = Math.floor((maxHeight * 100) / height);
            // fontSize = (fontSize < minFontSize) ? minFontSize : fontSize;
            // fontSize = (fontSize > maxFontSize) ? maxFontSize : fontSize;

            // $sizer[0].style.fontSize = fontSize + 'px';
            // height = ($sizer[0].scrollHeight < minHeight) ? minHeight : $sizer[0].scrollHeight;
            // marginTop = (height < maxHeight) ? (maxHeight - height) / 2 : margin;
            //             console.log('height 2: ', height);


            // $textarea[0].style.overflow = (height >= maxHeight ) ? 'auto' : 'hidden';
            // $textarea[0].style.minHeight = minHeight + 'px';
            // $textarea[0].style.maxHeight = maxHeight + 'px';
            // $textarea[0].style.height = 'auto';
            // $textarea[0].style.height = ( height > 0 ) ? height + 'px' : 'auto';
            // $textarea[0].style.marginTop = marginTop + 'px';
            // $textarea[0].style.fontSize = fontSize + 'px';

            // $sizer[0].style.fontSize = maxFontSize + 'px';

            // console.log('================');

            // console.log( $primaryHeader, $textarea, $sizer )
            // console.log( height, 64, fontSize )
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
                // $textarea[0].select();
                $ctrl.delayedResize();
            }
        );

        $scope.$watchCollection(
            function(){
                return {w: $win[0].innerWidth, h: $win[0].innerHeight}
            },
            function( newDimensions, oldDimensions ){
                // console.log( newDimensions, oldDimensions )
                $ctrl.debouceResize();
            },
            true
        )
    }]
};
