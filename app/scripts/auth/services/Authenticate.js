(function (ng) {
    var Authenticate = function (token, user, http, cookieStore)
    {
        this.token = token;
        this.user = user;

        this.http = http;
        this.cookieStore = cookieStore;
    };

    Authenticate.prototype.login = function (host, login, password)
    {
        var request = this.token.get(host, login, password),
            that = this;

        request.then(
            function (response) {
                if (ng.isDefined(response.token_auth)) {
                    that.token.setTokenAuth(response.token_auth);

                    that.getUserInformation();

                    that.cookieStore.put('token', that.token);

                    that.getUserInformation(login);

                    console.log('redirect')
                } else {
                    console.log('something goes wrong')
                }
            }
        );

        return request;
    };

    Authenticate.prototype.isAuthenticated = function ()
    {
        return this.token.isValid();
    };

    Authenticate.prototype.goToLogin = function ()
    {
        console.log('go to login')
    };

    Authenticate.prototype.getUserInformation = function (login)
    {
        this.me = new this.user();
        this.me.login = login;
        this.me.me();
    };

    ng.module('piwikExtDash.auth').service("Authenticate", [
        "Token", "User", "$http", "$cookieStore",
        Authenticate
    ]);
})(angular);
