(function (ng) {
    'use strict';

    var DashboardCtrl = function ($scope, $routeParams, Reports)
    {
        var idSite = $routeParams.idSite ? $routeParams.idSite : '?';

        this.reports = new Reports(idSite);
        this.reports.fetch().then(function (response) {
            $scope.allReports = response.data;
        });
    };

    ng.module('piwikExtDash.dashboard').controller("DashboardCtrl", [
        "$scope",
        "$routeParams",
        "Reports",
        DashboardCtrl
    ]);
})(angular);
