(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.application');

    module.provider('ApplicationFetchers', function (REPORTS_SOURCE) {
        var applicationFetchers;

        this.$get = function (Fetchers) {
            if (!applicationFetchers) {
                applicationFetchers = new Fetchers(REPORTS_SOURCE);
            }

            return applicationFetchers;
        };
    });
})();
