(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.reports', [
        'piwik-external-dashboard.application'
    ]);

    module.run(function ($rootScope, ReportFetchers) {
        $rootScope.$on('reports.fetcher', function ($event, name, fetcher) {
            if (typeof name === 'string' && typeof fetcher !== 'undefined') {
                ReportFetchers.add(name, fetcher);
            }
        });
    });
})();
