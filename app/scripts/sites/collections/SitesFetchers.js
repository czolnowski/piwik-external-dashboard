(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.sites');

    module.provider('SitesFetchers', function (SITES_SOURCE) {
        var sitesFetchers;

        this.$get = function (Fetchers) {
            if (!sitesFetchers) {
                sitesFetchers = new Fetchers(SITES_SOURCE);
            }

            return sitesFetchers;
        };
    });
})();
