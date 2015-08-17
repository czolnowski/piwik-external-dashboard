(function () {
    'use strict';

    angular.module(
        'piwik-external-dashboard.dashboard',
        [],
        function ($provide)
        {
            $provide.constant('dashboardStateKey', 'dashboard');
        }
    );
})();
