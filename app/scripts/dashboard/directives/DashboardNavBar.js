(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.dashboard').directive(
        'dashboardNavBar',
        [
            'ASSETS_BASE_PATH',
            function (ASSETS_BASE_PATH)
            {
                return {
                    templateUrl: ASSETS_BASE_PATH + 'views/dashboard/nav-bar.html'
                };
            }
        ]
    );
})(angular);
