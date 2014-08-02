(function (ng) {
    'use strict';

    var DashboardCtrl = function ($scope, $routeParams, $window, $location)
    {
        var reports;
        if ($routeParams.dashboard) {
            reports = $routeParams.dashboard;
        }

        if (!reports) {
            reports = localStorage.getItem('reports');
        }

        if (reports) {
            reports = JSON.parse(reports);
        }

        $scope.reports = reports || [];

        $scope.exportDashboard = function () {
            $location.search('dashboard', JSON.stringify($scope.reports));
            $window.alert($location.absUrl());
        };

        $scope.$on('reportAdded', function (event, report, visualization, size) {
            report = ng.copy(report);
            report.visualization = visualization;

            var width = 12;
            if ('small' == size) {
                width = 3;
            } else if ('medium' == size) {
                width = 6;
            }

            report.size = width;
            $scope.reports.push(report);

            localStorage.setItem("reports", JSON.stringify($scope.reports));
        });

        $scope.$on('reportRemoved', function (event, report) {

            var index = $scope.reports.indexOf(report);

            if (index > -1) {
                $scope.reports.splice(index, 1);
            }

            localStorage.setItem("reports", JSON.stringify($scope.reports));
        });
    };

    ng.module('piwikExtDash.dashboard').controller("DashboardCtrl", [
        "$scope",
        "$routeParams",
        "$window",
        "$location",
        DashboardCtrl
    ]);
})(angular);
