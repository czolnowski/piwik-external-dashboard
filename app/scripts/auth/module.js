(function (ng) {
    'use strict';

    var app = ng.module('piwikExtDash.auth', []);

    app.run([
        "$cookieStore", "Token", "Authenticate",
        function ($cookieStore, Token, Authenticate)
        {
            if (ng.isDefined($cookieStore.get("token"))) {
                Token.createFromTokenInstance($cookieStore.get("token"));
            }

            if (Authenticate.isAuthenticated()) {
                if (!ng.isDefined(Authenticate.me)) {
                    Authenticate.getUserInformation(Token.getLogin());
                }
            }
        }
    ]);

    app.config([
        "$httpProvider",
        function ($httpProvider)
        {
            $httpProvider.interceptors.push('TokenInterceptor');
        }
    ]);

    app.run([
        "$rootScope", "Authenticate",
        function ($rootScope, Authenticate)
        {
            $rootScope.$on("$routeChangeStart", function (event, next) {
                if (ng.isDefined(next.auth) && next.auth === true && !Authenticate.isAuthenticated()) {
                    Authenticate.goToLogin();
                    event.preventDefault();
                }
            });
        }
    ]);
})(angular);
