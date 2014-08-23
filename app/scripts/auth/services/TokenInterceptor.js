(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.auth').service(
        'TokenInterceptor',
        [
            "$injector",
            function ($injector)
            {
                return {
                    'request': function (config)
                    {
                        if (config.method === 'POST' && config.url.indexOf('/api') === 0) {
                            $injector.invoke(['Token', function(Token) {
                                if (Token.isValid()) {
                                    config.data.host = Token.host;
                                    config.data.token_auth = Token.token_auth;
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
