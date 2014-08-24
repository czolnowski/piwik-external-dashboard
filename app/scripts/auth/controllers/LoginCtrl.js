(function (ng) {
    'use strict';

    var Site,
        $location,
        LoginCtrl = function (authenticate, _Site, _$location)
        {
            this.authenticate = authenticate;

            this.host = '';
            this.login = '';
            this.password = '';
            this.anonymous = false;
            this.loading = false;
            this.noAccess = false;

            Site = _Site;
            $location = _$location;
        };

    LoginCtrl.prototype.process = function ()
    {
        var request,
            that = this;
        if (this.anonymous) {
            request = this.authenticate.asAnonymous(this.host);
        } else {
            request = this.authenticate.login(
                this.host,
                this.login,
                this.password
            );
        }

        this.loading = true;

        request.then(
            function ()
            {
                Site.fetchAllWithAtLeastViewAccess().then(
                    function (response)
                    {
                        if (ng.isArray(response.data)) {
                            if (response.data.length > 0) {
                                $location.path('/' + response.data[0].idsite);
                            } else {
                                that.noAccess = true;
                            }
                        }
                    }
                );
            }
        );

        request['finally'](function () {
            that.loading = false;
        });
    };

    LoginCtrl.prototype.isComplete = function ()
    {
        return this.isValidHost() && this.isValidUser();
    };

    LoginCtrl.prototype.isValidHost = function ()
    {
        return this.host !== null && this.host.length > 0;
    };

    LoginCtrl.prototype.isValidUser = function ()
    {
        return (this.isValidLogin() && this.isValidPassword()) || this.anonymous === true;
    };

    LoginCtrl.prototype.isValidLogin = function ()
    {
        return this.login !== null && this.login.length;
    };

    LoginCtrl.prototype.isValidPassword = function ()
    {
        return this.password !== null && this.password.length > 0;
    };

    LoginCtrl.$inject = ['Authenticate', 'Site', '$location'];

    ng.module('piwik-external-dashboard.auth')
    .controller('LoginCtrl', LoginCtrl)
    .config(
        [
            '$routeProvider',
            function ($routeProvider) {
                $routeProvider.when(
                    '/login',
                    {
                        templateUrl: 'views/login/index.html',
                        controller: 'LoginCtrl',
                        controllerAs: 'login'
                    }
                );
            }
        ]
    );
})(angular);
