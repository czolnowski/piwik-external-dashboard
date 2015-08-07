(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.morris').directive(
        'morrisMetricsSelector',
        [
            function ()
            {
                return {
                    templateUrl: 'views/morris/metricsSelector.html'
                };
            }
        ]
    );
})(window.angular);
