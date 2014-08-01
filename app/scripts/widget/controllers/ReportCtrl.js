(function (ng) {
    'use strict';

    var ReportCtrl = function ($scope, report)
    {
        this.module = $scope.module;
        this.action = $scope.action;
        this.report = new report();

        this.report = this.report.fetch(7, this.module, this.action);
    };

    ng.module('piwikExtDash.widget').controller("ReportCtrl", [
        "$scope",
        "Report",
        ReportCtrl
    ]);
})(angular);
