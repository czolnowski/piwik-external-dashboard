(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.dashboard').directive(
        'dashboardExportReports',
        [
            function ()
            {
                return {
                    scope: {
                        reports: '='
                    },
                    controller: 'DashboardExportReportsCtrl',
                    controllerAs: 'export',
                    templateUrl: 'views/dashboard/export-reports.html'
                };
            }
        ]
    );
})(window.angular);
