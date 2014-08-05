(function (ng) {
    'use strict';
    var app = ng.module('piwikExtDash', [
        'ngCookies',
        'ngSanitize',
        'ngRoute',
        'angular-md5',
        'chartjs',
        'ui.bootstrap',
        'angularMoment',
        'ui.select2',
        'firebase',
        'LocalStorageModule',
        'ui.bootstrap-slider',
        'ngBootstrap',

        'piwikExtDash.auth',
        'piwikExtDash.dashboard',
        'piwikExtDash.users',
        'piwikExtDash.widget',
        'piwikExtDash.reports'
    ]);

    app.config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });

    app.run([
        "$rootScope", "Authenticate",
        function ($rootScope, Authenticate)
        {
            $rootScope.$on("$routeChangeStart", function (event, next) {
                if (ng.isDefined(next.auth) && next.auth === true && !Authenticate.isAuthenticated()) {
                    Authenticate.goToLogin();
                    event.preventDefault();
                }
            });
        }
    ]);

    app.config([
        "$httpProvider",
        function ($httpProvider)
        {
            $httpProvider.interceptors.push('TokenInterceptor');
        }
    ]);
})(window.angular);
