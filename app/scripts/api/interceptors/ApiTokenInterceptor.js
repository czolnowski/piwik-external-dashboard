(function () {
    'use strict';

    angular.module('piwik-external-dashboard.api').service('ApiTokenInterceptor', function () {
        this.isValid = function (config, Token) {
            return config.method === 'POST' && config.url.indexOf('/api') === 0 && Token.isValid();
        };

        this.intercept = function (config, Token) {
            config.data.host = Token.host;
            /*jshint camelcase: false */
            config.data.token_auth = Token.tokenAuth;
            /*jshint camelcase: true */
        };
    });
})();
