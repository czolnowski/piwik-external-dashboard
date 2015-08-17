(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.dashboard').directive(
        'dashboardExportReports',
        [
            'ASSETS_BASE_PATH',
            function (ASSETS_BASE_PATH)
            {
                return {
                    scope: false,
                    controller: 'DashboardExportReportsCtrl',
                    controllerAs: 'export',
                    templateUrl: ASSETS_BASE_PATH + 'views/dashboard/nav/export-reports.html'
                };
            }
        ]
    );
})(window.angular);
