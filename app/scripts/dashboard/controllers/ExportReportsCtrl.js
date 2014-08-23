(function (ng) {
    'use strict';

    var DashboardExportReportsCtrl = function ($scope, $modal, ReportsStateFetcher, $location, Report)
    {
        this.create = function ()
        {
            $modal.open(
                {
                    templateUrl: 'views/dashboard/export-reports-modal.html',
                    controller: 'DashboardExportReportsModalCtrl',
                    resolve: {
                        key: function ()
                        {
                            return Report.serialize($scope.reports);
                        }
                    }
                }
            ).result.then(
                function ()
                {
                    ReportsStateFetcher.save(
                            'dashboards',
                            Report.serialize($scope.reports)
                    ).then(
                        function (reportsName)
                        {
                            $location.search('dashboard', reportsName);
                        }
                    );
                }
            );
        };
    };

    DashboardExportReportsCtrl.$inject = [
        "$scope", "$modal", "ReportsStateFetcher", "$location", "Report"
    ];

    ng.module('piwikExtDash.dashboard').controller(
        'DashboardExportReportsCtrl',
        DashboardExportReportsCtrl
    );
})(window.angular);
