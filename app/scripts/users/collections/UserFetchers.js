(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.users');

    module.provider('UserFetchers', function (USERS_SOURCE) {
        var userFetchers;

        this.$get = function (Fetchers) {
            if (!userFetchers) {
                userFetchers = new Fetchers(USERS_SOURCE);
            }

            return userFetchers;
        };
    });
})();
