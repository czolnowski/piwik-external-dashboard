(function () {
    'use strict';

    var module = angular.module('piwik-external-dashboard.auth');

    module.service('TokenInterceptor', function (Token, $rootScope) {
        return {
            request: function (config) {
                $rootScope.$emit('auth.token', config, Token);

                return config;
            }
        };
    });
})();
