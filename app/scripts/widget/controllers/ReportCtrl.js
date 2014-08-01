(function (ng) {
    'use strict';

    var ReportCtrl = function ($scope)
    {
        this.module = $scope.module;
        this.action = $scope.action;
    };

    ng.module('piwikExtDash.widget').controller("ReportCtrl", [
        "$scope",
        ReportCtrl
    ]);
})(angular);
