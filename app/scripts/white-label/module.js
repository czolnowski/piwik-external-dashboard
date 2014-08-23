(function (ng) {
    ng.module('piwik-external-dashboard.whiteLabel', [], [
        "$provide",
        function ($provide)
        {
            $provide.value(
                'metricsColors',
                [
                    '#0b62a4',
                    '#7A92A3',
                    '#4da74d',
                    '#afd8f8',
                    '#edc240',
                    '#cb4b4b',
                    '#9440ed'
                ]
            );
        }
    ]);
})(window.angular);
