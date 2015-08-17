(function () {
    'use strict';

    var Token = function (AuthFetchers, md5, $cookieStore, LOGGED_IN_USER) {
        this.login = null;
        this.tokenAuth = null;
        this.host = null;

        this.get = function (host, login, password)
        {
            return AuthFetchers.get().getTokenAuth({
                host: host,
                userLogin: login,
                md5Password: md5(password)
            });
        };

        this.isValid = function ()
        {
            return this.tokenAuth !== null && this.host !== null;
        };

        this.persist = function ()
        {
            $cookieStore.put('token', {
                tokenAuth: this.tokenAuth,
                login: this.login,
                host: this.host
            });
        };

        this.restore = function ()
        {
            var token;

            if (LOGGED_IN_USER !== null) {
                this.tokenAuth = LOGGED_IN_USER.tokenAuth;
                this.login = LOGGED_IN_USER.login;
                this.host = LOGGED_IN_USER.host;
            } else {
                token = $cookieStore.get('token');
                if (angular.isDefined(token)) {
                    this.tokenAuth = token.tokenAuth;
                    this.login = token.login;
                    this.host = token.host;
                }
            }
        };
    };

    angular.module('piwik-external-dashboard.auth').service('Token', Token);
})();
