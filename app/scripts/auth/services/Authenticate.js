(function (ng) {
    var
        $q,
        Authenticate = function (token, user, _$q)
        {
            this.token = token;
            this.user = user;

            $q = _$q;
        };

    Authenticate.prototype.login = function (host, login, password)
    {
        var request = this.token.get(host, login, password),
            that = this;

        request.then(
            function (response) {
                if (ng.isDefined(response.data.value)) {
                    that.token.setTokenAuth(response.data.value);
                    that.token.setHost(host);
                    that.token.setLogin(login);
                    that.token.persist();
                    that.getUserInformation(login);
                } else {
                    console.log('something goes wrong')
                }
            }
        );

        return request;
    };

    Authenticate.prototype.asAnonymous = function (host)
    {
        var deferred = $q.defer();

        deferred.resolve('anonymous');

        this.token.setTokenAuth('anonymous');
        this.token.setHost(host);
        this.token.setLogin('anonymous');
        this.getUserInformation('anonymous');

        this.token.persist();

        return deferred.promise;
    };

    Authenticate.prototype.isAuthenticated = function ()
    {
        return this.token.isValid();
    };

    Authenticate.prototype.getLoginPath = function ()
    {
        return '/login';
    };

    Authenticate.prototype.getUserInformation = function (login)
    {
        this.me = new this.user();
        this.me.login = login;
        this.me.me();
    };

    ng.module('piwikExtDash.auth').service("Authenticate", [
        "Token", "User", "$q",
        Authenticate
    ]);
})(angular);
