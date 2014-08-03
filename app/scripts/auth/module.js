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
})(angular);
