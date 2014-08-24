(function (ng) {
    'use strict';

    ng.module('piwik-external-dashboard.dashboard').directive(
        'dashboardAddReport',
        [
            function ()
            {
                return {
                    scope: false,
                    controller: 'DashboardAddReportCtrl',
                    controllerAs: 'addReport',
                    templateUrl: 'views/dashboard/nav/add-report.html'
                };
            }
        ]
    );
})(window.angular);
