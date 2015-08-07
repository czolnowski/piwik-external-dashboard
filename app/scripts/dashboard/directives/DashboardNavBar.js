(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.dashboard').directive(
        'dashboardNavBar',
        [
            function ()
            {
                return {
                    templateUrl: 'views/dashboard/nav-bar.html'
                };
            }
        ]
    );
})(angular);
