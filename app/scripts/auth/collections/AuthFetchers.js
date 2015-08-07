(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.auth');

    module.provider('AuthFetchers', function (REPORTS_SOURCE) {
        var authFetchers;

        this.$get = function (Fetchers) {
            authFetchers = new Fetchers(REPORTS_SOURCE);

            return authFetchers;
        };
    });
})();
