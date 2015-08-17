(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.dashboard').directive(
        'dashboardAddReport',
        [
            'ASSETS_BASE_PATH',
            function (ASSETS_BASE_PATH)
            {
                return {
                    scope: false,
                    controller: 'DashboardAddReportCtrl',
                    controllerAs: 'addReport',
                    templateUrl: ASSETS_BASE_PATH + 'views/dashboard/nav/add-report.html'
                };
            }
        ]
    );
})(window.angular);
