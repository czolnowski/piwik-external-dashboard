(function (ng) {
    'use strict';

    var ReportCtrl = function ($scope, Report)
    {
        this.report = new Report(
            $scope.module,
            $scope.action,
            $scope.evolution
        );
    };

    ng.module('piwikExtDash.widget').controller("ReportCtrl", [
        "$scope",
        "Report",
        ReportCtrl
    ]);
})(angular);
