(function (angular){
    'use strict';

    var LoginCtrl = function (Authenticate, Site, $location) {
        var vm = this;

        this.host = '';
        this.login = '';
        this.password = '';
        this.anonymous = false;
        this.loading = false;
        this.noAccess = false;

        this.process = function () {
            var request;

            if (this.anonymous) {
                request = Authenticate.asAnonymous(this.host);
            } else {
                request = Authenticate.login(
                    this.host,
                    this.login,
                    this.password
                );
            }

            this.loading = true;

            request.then(function () {
                Site.fetchAllWithAtLeastViewAccess().then(
                    vm.redirectIfThereIsAnySiteOrMarkAsNoAccess
                );
            });

            request['finally'](function () {
                vm.loading = false;
            });
        };

        this.redirectIfThereIsAnySiteOrMarkAsNoAccess = function (response) {
            if (angular.isArray(response.data)) {
                if (response.data.length > 0) {
                    $location.path('/' + response.data[0].idsite);
                } else {
                    this.noAccess = true;
                }
            }
        };

        this.isComplete = function () {
            return this.isValidHost() && this.isValidUser();
        };

        this.isValidHost = function () {
            return this.host !== null && this.host.length > 0;
        };

        this.isValidUser = function () {
            return this.anonymous === true || (this.isValidLogin() && this.isValidPassword());
        };

        this.isValidLogin = function () {
            return this.login !== null && this.login.length > 0;
        };

        this.isValidPassword = function () {
            return this.password !== null && this.password.length > 0;
        };
    };

    angular.module('piwik-external-dashboard.auth')
    .controller('LoginCtrl', LoginCtrl)
    .config(function ($routeProvider) {
        $routeProvider.when(
            '/login',
            {
                templateUrl: 'views/login/index.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            }
        );
    });
})(angular);
