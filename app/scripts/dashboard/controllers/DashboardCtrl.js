(function (ng) {
    'use strict';

    var DashboardCtrl = function ($scope)
    {
        $scope.reports = [];

        $scope.$on('reportAdded', function (event, report, visualization) {
            report = ng.copy(report);
            report.visualization = visualization;
            $scope.reports.push(report);
        });
    };

    ng.module('piwikExtDash.dashboard').controller("DashboardCtrl", [
        "$scope",
        DashboardCtrl
    ]);
})(angular);
