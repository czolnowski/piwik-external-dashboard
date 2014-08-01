(function (ng) {
    'use strict';

    var TableVisCtrl = function (ReportCtrl)
    {
        this.report = ReportCtrl;
    };

    ng.module('piwikExtDash.widget').controller("TableVisCtrl", [
        TableVisCtrl
    ]);
})(angular);
