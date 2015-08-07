(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.dashboard').directive(
        'dashboardDateSelector',
        [
            function ()
            {
                return {
                    templateUrl: 'views/dashboard/nav/date-selector.html',
                    controller: 'DashboardDateSelectorCtrl',
                    controllerAs: 'dateSelector',
                    replace: true
                };
            }
        ]
    );
})(angular);
