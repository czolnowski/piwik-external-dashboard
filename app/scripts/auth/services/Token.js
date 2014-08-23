(function (ng) {
    'use strict';

    var $cookieStore,
        $http,
        md5,
        Token = function (_$http, _md5, _$cookieStore)
        {
            this.login = null;
            this.tokenAuth = null;
            this.host = null;

            $http = _$http;
            md5 = _md5;
            $cookieStore = _$cookieStore;
        };

    Token.prototype.get = function (host, login, password)
    {
        return $http.post(
            '/api/UsersManager/getTokenAuth',
            {
                host: host,
                userLogin: login,
                md5Password: md5(password)
            }
        );
    };

    Token.prototype.setTokenAuth = function (tokenAuth)
    {
        this.tokenAuth = tokenAuth;
    };

    Token.prototype.getTokenAuth = function ()
    {
        return this.tokenAuth;
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
        return this.tokenAuth !== null && this.host !== null;
    };

    Token.prototype.persist = function ()
    {
        $cookieStore.put(
            'token',
            {
                tokenAuth: this.tokenAuth,
                login: this.login,
                host: this.host
            }
        );
    };

    Token.prototype.restore = function ()
    {
        var token = $cookieStore.get('token');
        if (ng.isDefined(token)) {
            this.tokenAuth = token.tokenAuth;
            this.login = token.login;
            this.host = token.host;
        }
    };

    ng.module('piwik-external-dashboard.auth').service(
        'Token',
        [
            '$http', 'md5', '$cookieStore',
            Token
        ]
    );
})(angular);
