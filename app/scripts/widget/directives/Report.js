(function (ng) {
    'use strict';

    ng.module('piwikExtDash.widget').directive('report', function() {

        return {
            require: '^Dashboard',
            restrict: 'C',
            transclude: true,
            scope: {
                module: '@',
                action: '@',
                evolution: '=',
                currentreport: '='
            },
            templateUrl: 'views/widget/report.html',
            controller: 'ReportCtrl',
            controllerAs: 'report'
        };
    });
})(angular);
