(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.users', []);

    module.run(function ($rootScope, UserFetchers) {
        $rootScope.$on('users.fetcher', function ($event, name, fetcher) {
            if (typeof name === 'string' && typeof fetcher !== 'undefined') {
                UserFetchers.add(name, fetcher);
            }
        });
    });
})();
