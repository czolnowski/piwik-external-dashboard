(function () {
    'use strict';

    angular.module('piwik-external-dashboard.api').service('UsersFetcher', function ($http) {
        this.getTokenAuth = function (parameters) {
            parameters.method = 'UsersManager.getTokenAuth';

            return $http.post('/api', parameters);
        };
    });
})();
