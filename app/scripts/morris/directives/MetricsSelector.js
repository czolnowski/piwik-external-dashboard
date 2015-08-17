(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.morris').directive(
        'morrisMetricsSelector',
        [
            'ASSETS_BASE_PATH',
            function (ASSETS_BASE_PATH)
            {
                return {
                    templateUrl: ASSETS_BASE_PATH + 'views/morris/metricsSelector.html'
                };
            }
        ]
    );
})(window.angular);
