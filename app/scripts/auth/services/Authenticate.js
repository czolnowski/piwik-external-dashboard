(function () {
    'use strict';

    var Authenticate = function (Token, User, $q) {
        this.me = new User();

        this.login = function (host, login, password) {
            var request = Token.get(host, login, password),
                that = this;

            request.then(function (response) {
                if (angular.isDefined(response.data.value)) {
                    Token.tokenAuth = response.data.value;
                    Token.host = host;
                    Token.login = login;
                    Token.persist();
                    that.getUserInformation(login);
                }
            });

            return request;
        };

        this.asAnonymous = function (host) {
            var deferred = $q.defer();

            deferred.resolve('anonymous');

            Token.tokenAuth = 'anonymous';
            Token.host = host;
            Token.login = 'anonymous';
            this.getUserInformation('anonymous');

            Token.persist();

            return deferred.promise;
        };

        this.isAuthenticated = function () {
            return Token.isValid();
        };

        this.getLoginPath = function () {
            return '/login';
        };

        this.getUserInformation = function (login) {
            this.me.login = login;
            this.me.me();
        };
    };

    angular.module('piwik-external-dashboard.auth').service('Authenticate', Authenticate);
})();
