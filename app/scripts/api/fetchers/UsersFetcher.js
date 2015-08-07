(function () {
    'use strict';

    angular.module('piwik-external-dashboard.api').service('UsersFetcher', function ($http) {
        this.getTokenAuth = function (parameters) {
            parameters.module = 'UsersManager';
            parameters.action = 'getTokenAuth';

            return $http.post('/api', parameters);
        };
    });
})();
