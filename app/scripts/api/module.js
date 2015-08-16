(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.api', []);

    module.run(function ($rootScope, ApiReportFetcher, UsersFetcher) {
        $rootScope.$emit('reports.fetcher', 'api', ApiReportFetcher);
        $rootScope.$emit('application.fetcher', 'api', ApiReportFetcher);
        $rootScope.$emit('auth.fetcher', 'api', UsersFetcher);
        $rootScope.$emit('users.fetcher', 'api', UsersFetcher);
    });

    module.run(function ($rootScope, ApiTokenInterceptor) {
        $rootScope.$on('auth.token', function ($event, config, Token) {
            if (ApiTokenInterceptor.isValid(config, Token)) {
                ApiTokenInterceptor.intercept(config, Token);
            }
        });
    });
})();
