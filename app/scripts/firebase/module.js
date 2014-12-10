(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.firebase', []).run(
        [
            '$rootScope',
            function ($rootScope)
            {
                $rootScope.$on('checkPersistenceLayer', function (event, layerName, configuration) {
                    if (layerName === 'firebase') {
                        if (ng.isObject(configuration) && ng.isDefined(configuration.host)) {
                            event.confirmed = true;
                            event.stopPropagation();
                        }
                    }
                });
            }
        ]
    );
})(window.angular);
