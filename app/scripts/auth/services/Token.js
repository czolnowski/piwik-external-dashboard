(function (ng) {
    'use strict';

    var Token = function ($http, md5)
    {
        this.$http = $http;
        this.md5 = md5;

        this.login = null;
        this.token_auth = null;
        this.host = null
    };

    Token.prototype.get = function (host, login, password)
    {
        return this.$http.post(
            '/api/UsersManager/getTokenAuth',
            {
                host: host,
                userLogin: login,
                md5Password: this.md5.createHash(password)
            }
        );
    };

    Token.prototype.setTokenAuth = function (token_auth)
    {
        this.token_auth = token_auth;
    };

    Token.prototype.getTokenAuth = function ()
    {
        return this.token_auth;
    };

    Token.prototype.setLogin = function (login)
    {
        this.login = login;
    };

    Token.prototype.getLogin = function ()
    {
        return this.login;
    };

    Token.prototype.setHost = function (host)
    {
        this.host = host;
    };

    Token.prototype.getHost = function ()
    {
        return this.host;
    };

    Token.prototype.isValid = function ()
    {
        return this.token_auth !== null
            && this.host !== null;
    };

    Token.prototype.createFromTokenInstance = function (token)
    {
        this.token_auth = token.token_auth;
        this.login = token.login;
        this.host = token.host;
    };

    ng.module('piwikExtDash.auth').service('Token', ['$http', 'md5', Token]);
})(angular);
