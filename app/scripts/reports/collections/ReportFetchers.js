(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.reports');

    module.provider('ReportFetchers', function (REPORTS_SOURCE) {
        var reportFetchers;

        this.$get = function (Fetchers) {
            if (!reportFetchers) {
                reportFetchers = new Fetchers(REPORTS_SOURCE);
            }

            return reportFetchers;
        };
    });
})();
