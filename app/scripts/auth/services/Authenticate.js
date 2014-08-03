(function (ng) {
    var Authenticate = function (token, user, http, cookieStore, $location)
    {
        this.token = token;
        this.user = user;

        this.http = http;
        this.cookieStore = cookieStore;
        this.$location = $location;
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
                    that.cookieStore.put('token', that.token);
                    that.getUserInformation(login);

                    that.$location.path('/');
                } else {
                    console.log('something goes wrong')
                }
            }
        );

        return request;
    };

    Authenticate.prototype.asAnonymous = function (host)
    {
        this.token.setTokenAuth('anonymous');
        this.token.setHost(host);
        this.token.setLogin('anonymous');
        this.getUserInformation('anonymous');

        this.cookieStore.put('token', this.token);

        this.$location.path('/');
    };

    Authenticate.prototype.isAuthenticated = function ()
    {
        return this.token.isValid();
    };

    Authenticate.prototype.goToLogin = function ()
    {
        this.$location.path('/login');
    };

    Authenticate.prototype.getUserInformation = function (login)
    {
        this.me = new this.user();
        this.me.login = login;
        this.me.me();
    };

    ng.module('piwikExtDash.auth').service("Authenticate", [
        "Token", "User", "$http", "$cookieStore", "$location",
        Authenticate
    ]);
})(angular);
