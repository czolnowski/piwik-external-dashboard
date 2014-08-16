(function (ng) {
    'use strict';

    ng.module('piwikExtDash.morris').directive(
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
