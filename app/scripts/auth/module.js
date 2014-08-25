(function (ng) {
    'use strict';

    var app = ng.module('piwik-external-dashboard.auth', []);

    app.run([
        'Token', 'Authenticate',
        function (Token, Authenticate)
        {
            Token.restore();

            if (Authenticate.isAuthenticated()) {
                if (!ng.isDefined(Authenticate.me)) {
                    Authenticate.getUserInformation(Token.getLogin());
                }
            }
        }
    ]);

    app.config([
        '$httpProvider',
        function ($httpProvider)
        {
            $httpProvider.interceptors.push('TokenInterceptor');
        }
    ]);

    app.run([
        '$rootScope', 'Authenticate', '$location',
        function ($rootScope, Authenticate, $location)
        {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                if (ng.isDefined(next.auth) && next.auth === true && !Authenticate.isAuthenticated()) {
                    $location.path(Authenticate.getLoginPath());
                    event.preventDefault();
                }
            });
        }
    ]);
})(angular);
