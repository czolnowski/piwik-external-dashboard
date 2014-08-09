(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').directive('report', function() {

        return {
            restrict: 'A',
            transclude: true,
            scope: {
                dule: '@',
                action: '@',
                evolution: '='
            },
            templateUrl: 'views/widget/report.html',
            controller: 'ReportCtrl',
            controllerAs: 'report'
        };
    });
})(angular);
