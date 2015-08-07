(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.application', []);

    module.run(function ($rootScope, ApplicationFetchers) {
            $rootScope.$on('application.fetcher', function ($event, name, fetcher) {
                if (typeof name === 'string' && typeof fetcher !== 'undefined') {
                    ApplicationFetchers.add(name, fetcher);
                }
            });
        });

    module.constant('PIWIK_CHANGELOG_URL', 'http://piwik.org/changelog/piwik');
})();
