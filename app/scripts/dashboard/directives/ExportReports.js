(function (ng) {
    'use strict';

    ng.module('piwikExtDash.dashboard').directive(
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
