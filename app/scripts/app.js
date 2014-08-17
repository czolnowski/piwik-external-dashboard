(function (ng) {
    'use strict';

    var app = ng.module('piwikExtDash', [
        'ngCookies',
        'ngSanitize',
        'ngRoute',
        'angular-md5',
        'ui.bootstrap',
        'angularMoment',
        'ui.select2',
        'firebase',
        'LocalStorageModule',
        'ui.bootstrap-slider',
        'ngBootstrap',
        'angular-morrisjs',

        'piwikExtDash.auth',
        'piwikExtDash.dashboard',
        'piwikExtDash.users',
        'piwikExtDash.widget',
        'piwikExtDash.reports',
        'piwikExtDash.morris',
        'piwikExtDash.tables',
        'piwikExtDash.whiteLabel'
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
