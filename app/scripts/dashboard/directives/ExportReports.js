(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.dashboard').directive(
        'dashboardExportReports',
        [
            function ()
            {
                return {
                    scope: false,
                    controller: 'DashboardExportReportsCtrl',
                    controllerAs: 'export',
                    templateUrl: 'views/dashboard/nav/export-reports.html'
                };
            }
        ]
    );
})(window.angular);
