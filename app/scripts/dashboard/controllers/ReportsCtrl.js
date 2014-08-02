(function (ng) {
    'use strict';

    var ReportsCtrl = function ($scope, $routeParams, $rootScope, $timeout, Reports)
    {
        var idSite = $routeParams.idSite ? $routeParams.idSite : '?';

        this.reports = new Reports(idSite);
        this.reports.fetch().then(function (response) {
            $scope.allReportsByCategory = {};

            ng.forEach(response.data, function (value, key) {
                if (value && value.action && 'get' === value.action) {
                    return;
                }

                if (!$scope.allReportsByCategory[value.category]) {
                    $scope.allReportsByCategory[value.category] = [];
                }

                $scope.allReportsByCategory[value.category].push(value);
            });

        });

        $scope.addReport = function (report, visualization) {
            $timeout(function () {
                $rootScope.$broadcast('reportAdded', report, visualization);
            }, 1);
        };
    };

    ng.module('piwikExtDash.dashboard').controller("ReportsCtrl", [
        "$scope",
        "$routeParams",
        "$rootScope",
        "$timeout",
        "Reports",
        ReportsCtrl
    ]);
})(angular);
