(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.dashboard').directive(
        'dashboardDateSelector',
        [
            'ASSETS_BASE_PATH',
            function (ASSETS_BASE_PATH)
            {
                return {
                    templateUrl: ASSETS_BASE_PATH + 'views/dashboard/nav/date-selector.html',
                    controller: 'DashboardDateSelectorCtrl',
                    controllerAs: 'dateSelector',
                    replace: true
                };
            }
        ]
    );
})(angular);
