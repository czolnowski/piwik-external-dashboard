(function (db, document) {
    'use strict';

    db.bootstrap(
        {
            element: document   ,
            module: 'piwik-external-dashboard',
            moduleResolves: [
                {
                    module: 'piwik-external-dashboard.configurations',
                    resolve: {
                        CONFIG: [
                            '$http',
                            function (initializer)
                            {
                                return initializer.get('config.json');
                            }
                        ]
                    }
                }
            ]
        }
    );
})(window.deferredBootstrapper, window.document);
