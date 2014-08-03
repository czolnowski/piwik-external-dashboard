(function (ng, Firebase, JSON) {
    'use strict';

    var DashboardCtrl = function ($scope, $routeParams, $location, $firebase, md5)
    {
        var ref = new Firebase('https://piwik-ext-dashboard.firebaseio.com/dashboards'),
            sync = $firebase(ref);

        $scope.reports = [];

        $scope.isLoading = false;

        if ($routeParams.dashboard) {
            $scope.isLoading = true;

            sync.$asObject().$loaded().then(function (response) {
                $scope.reports = JSON.parse(
                    response[$routeParams.dashboard]
                );

                $scope.isLoading = false;
            });
        } else {
            $scope.reports = JSON.parse(
                localStorage.getItem('reports')
            );
        }

        $scope.exportDashboard = function () {
            var neededData = [];
            ng.forEach($scope.reports, function (report) {
                neededData.push({
                    module: report.module,
                    action: report.action,
                    category: report.action,
                    visualization: report.visualization,
                    size: report.size
                });
            });

            var reportsAsString = JSON.stringify(neededData),
                reportsName = md5.createHash(reportsAsString);

            if (reportsName in sync.$asObject()) {
                $location.search('dashboard', reportsName);
            } else {
                sync.$set(reportsName, reportsAsString).then(function () {
                    $location.search('dashboard', reportsName);
                });
            }
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
        "$location",
        "$firebase",
        "md5",
        DashboardCtrl
    ]);
})(angular, window.Firebase, window.JSON);
