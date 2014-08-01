(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').directive('report', function() {

        return {
            restrict: 'C',
            scope: {
                module: '@',
                action: '@'
            },
            templateUrl: 'views/widget/report.html',
            controller: 'ReportCtrl',
            controllerAs: 'report'
        };
    });
})(angular);