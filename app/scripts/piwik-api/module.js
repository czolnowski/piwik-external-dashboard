(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.piwik-api', []);

    module.run(function ($rootScope, PiwikApiReportFetcher) {
        $rootScope.$emit('reports.fetcher', 'piwik-api', PiwikApiReportFetcher);
        $rootScope.$emit('application.fetcher', 'piwik-api', PiwikApiReportFetcher);
        $rootScope.$emit('sites.fetcher', 'piwik-api', PiwikApiReportFetcher);
        $rootScope.$emit('auth.fetcher', 'piwik-api', PiwikApiReportFetcher);
        $rootScope.$emit('users.fetcher', 'piwik-api', PiwikApiReportFetcher);
    });

    module.run(function ($rootScope, PiwikApiTokenInterceptor, AUTH_SOURCE) {
        if (AUTH_SOURCE.source === 'piwik-api') {
            $rootScope.$on('auth.token', function ($event, config, Token) {
                if (PiwikApiTokenInterceptor.isValid(config, Token)) {
                    PiwikApiTokenInterceptor.intercept(config, Token);
                }
            });
        }
    });
})();
