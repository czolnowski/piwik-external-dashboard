(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.sites', []);

    module.run(function ($rootScope, SitesFetchers) {
        $rootScope.$on('sites.fetcher', function ($event, name, fetcher) {
            if (typeof name === 'string' && typeof fetcher !== 'undefined') {
                SitesFetchers.add(name, fetcher);
            }
        });
    });
})();
