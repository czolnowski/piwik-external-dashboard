(function (ng) {
    'use strict';

    var ReportsCtrl = function ($scope, $routeParams, Reports)
    {
        var idSite = $routeParams.idSite ? $routeParams.idSite : '?';

        this.reports = new Reports(idSite);
        this.reports.fetch().then(function (response) {
            $scope.allReports = response.data;
        });
    };

    ng.module('piwikExtDash.dashboard').controller("ReportsCtrl", [
        "$scope",
        "$routeParams",
        "Reports",
        ReportsCtrl
    ]);
})(angular);
