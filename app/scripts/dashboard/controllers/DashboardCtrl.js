(function (ng) {
    'use strict';

    var DashboardCtrl = function ($scope)
    {
        var reports = localStorage.getItem('reports');

        if (reports) {
            reports = JSON.parse(reports);
        }

        $scope.reports = reports || [];

        $scope.$on('reportAdded', function (event, report, visualization, size) {
            report = ng.copy(report);
            report.visualization = visualization;

            var width = 8;
            if ('small' == size) {
                width = 3;
            } else if ('medium' == size) {
                width = 6;
            }

            report.size = width;
            $scope.reports.push(report);

            localStorage.setItem("reports", JSON.stringify($scope.reports));
        });
    };

    ng.module('piwikExtDash.dashboard').controller("DashboardCtrl", [
        "$scope",
        DashboardCtrl
    ]);
})(angular);
