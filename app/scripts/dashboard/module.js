(function (ng) {
    'use strict';

    ng.module(
        'piwik-external-dashboard.dashboard',
        [],
        function ($provide)
        {
            $provide.constant('dashboardStateKey', 'dashboard');
        }
    );
})(angular);
