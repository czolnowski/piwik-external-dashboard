(function (ng) {
    'use strict';
    var app = ng.module('piwikExtDash', [
        'ngCookies',
        'ngSanitize',
        'ngRoute',
        'angular-md5',

        'piwikExtDash.auth',
        'piwikExtDash.dashboard',
        'piwikExtDash.users',
    ]);

    app.config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });

    app.run([
        "$rootScope", "Authenticate", "$location",
        function ($rootScope, Authenticate, $location)
        {
            $rootScope.$on("$routeChangeStart", function (event, next) {
                if (ng.isDefined(next.auth) && next.auth === true && !Authenticate.isAuthenticated()) {
                    $location.path("/dashboard");
                    event.preventDefault();
                }
            });
        }
    ]);
})(window.angular);

