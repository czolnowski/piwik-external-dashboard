(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').directive('report', function() {

        return {
            restrict: 'C',
            scope: {
                module: '@',
                action: '@'
            },
            template: '<div><p class="w-name">{{ api }}</p><div class="w-content">lorem ipsum dolor sit amet</div></div>',
            controller: 'ReportCtrl'
        };
    });
})(angular);