(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').directive('report', function() {

        return {
            restrict: 'C',
            scope: {
                api: '@'
            },
            template: '<div><h4 class="w-name">{{ api }}</h4><div class="w-content">lorem ipsum dolor sit amet</div></div>'
        };
    });
})(angular);