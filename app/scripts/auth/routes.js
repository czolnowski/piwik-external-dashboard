(function (ng) {
    'use strict';

    ng.module('piwikExtDash.auth').config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login/index.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            });
    });
})(angular);
