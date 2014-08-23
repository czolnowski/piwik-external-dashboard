(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.auth').config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login/index.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            });
    });
})(angular);
