(function (ng) {
    'use strict';

    var app = ng.module('piwikExtDash.auth', []);

    app.run([
        "$cookieStore", "Token",
        function ($cookieStore, Token)
        {
            if (ng.isDefined($cookieStore.get("token"))) {
                Token.createFromTokenInstance($cookieStore.get("token"));
            }
        }
    ]);
})(angular);
