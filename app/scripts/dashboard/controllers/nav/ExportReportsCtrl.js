(function (ng) {
    'use strict';

    var DashboardExportReportsCtrl = function ()
    {
        this.create = function ()
        {

//                    ReportsStateFetcher.save(
//                            'dashboards',
//                            Report.serialize($scope.reports)
//                    ).then(
//                        function (reportsName)
//                        {
//                            $location.search('dashboard', reportsName);
//                        }
//                    );
        };
    };

    DashboardExportReportsCtrl.$inject = [
        '$scope', '$modal', 'ReportsStateFetcher', '$location', 'Report'
    ];

    ng.module('piwik-external-dashboard.dashboard').controller(
        'DashboardExportReportsCtrl',
        DashboardExportReportsCtrl
    );
})(window.angular);
