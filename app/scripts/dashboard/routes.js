(function (ng) {
    'use strict';

    ng.module('piwikExtDash.dashboard').config(function ($routeProvider) {
        $routeProvider
            .when('/:idSite?', {
                templateUrl: 'views/dashboard/index.html',
                controller: 'DashboardCtrl',
                controllerAs: "dashboard",
                auth: true
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})(angular);
