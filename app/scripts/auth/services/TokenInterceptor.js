(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.auth').service(
        'TokenInterceptor',
        [
            '$injector',
            function ($injector)
            {
                return {
                    'request': function (config)
                    {
                        if (config.method === 'POST' && config.url.indexOf('/api') === 0) {
                            $injector.invoke(['Token', function(Token) {
                                if (Token.isValid()) {
                                    config.data.host = Token.host;
                                    /*jshint camelcase: false */
                                    config.data.token_auth = Token.tokenAuth;
                                    /*jshint camelcase: true */
                                }
                            }]);
                        }

                        return config;
                    }
                };
            }
        ]
    );
})(window.angular);
