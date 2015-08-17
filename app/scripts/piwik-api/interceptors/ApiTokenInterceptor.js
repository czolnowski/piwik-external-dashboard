(function () {
    'use strict';

    angular.module('piwik-external-dashboard.piwik-api').service('PiwikApiTokenInterceptor', function () {
        this.isValid = function (config) {
            return config.url.indexOf('/index.php') === 0;
        };

        this.intercept = function (config, Token) {
            if (config.url.indexOf('token_auth') < 0) {
                config.url += '&token_auth=' + Token.tokenAuth;
            }
        };
    });
})();
