(function (ng) {
    'use strict';

    var module = ng.module('piwik-external-dashboard.auth', ['piwik-external-dashboard.application']);

    module.run(function (Token, Authenticate) {
        Token.restore();

        if (Authenticate.isAuthenticated()) {
            if (!ng.isDefined(Authenticate.me)) {
                Authenticate.getUserInformation(Token.login);
            }
        }
    });

    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    });

    module.run(function ($rootScope, Authenticate, $location) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (ng.isDefined(next.auth) && next.auth === true && !Authenticate.isAuthenticated()) {
                $location.path(Authenticate.getLoginPath());
                event.preventDefault();
            }
        });
    });

    module.run(function ($rootScope, AuthFetchers) {
        $rootScope.$on('auth.fetcher', function ($event, name, fetcher) {
            if (typeof name === 'string' && typeof fetcher !== 'undefined') {
                AuthFetchers.add(name, fetcher);
            }
        });
    });
})(angular);
