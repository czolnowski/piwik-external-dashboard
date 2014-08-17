(function (ng) {
    'use strict';

    ng.module('piwikExtDash.dashboard').directive(
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
