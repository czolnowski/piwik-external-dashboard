(function () {
    'use strict';

    angular.module('piwik-external-dashboard.api').service('UsersFetcher', function ($http) {
        this.getTokenAuth = function (parameters) {
            parameters.method = 'UsersManager.getTokenAuth';

            return $http.post('/api', parameters);
        };

        this.getUser = function (login) {
            return $http.post(
                '/api',
                {
                    method: 'UsersManager.getUser',
                    userLogin: login
                }
            );
        };
    });
})();
