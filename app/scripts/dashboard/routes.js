(function (ng) {
    'use strict';

    ng.module('piwikExtDash.dashboard').config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard/index.html',
                controller: 'DashboardCtrl',
                auth: true
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})(angular);
