(function (ng) {
    'use strict';

    var AddReportCtrl = function ($modal, dashboards, localState)
    {
        this.openModal = function ()
        {
            $modal.open(
                {
                    templateUrl: 'views/reports/add-modal.html',
                    controller: 'AddReportModalCtrl',
                    resolve: {
                        reports: [
                            'Report',
                            function (Report)
                            {
                                return Report.fetchMetaData();
                            }
                        ]
                    }
                }
            ).result.then(
                function (result)
                {
                    dashboards.getActive().reports.push(ng.copy(result));
                    localState.persist(dashboards.states);
                }
            );
        };
    };

    AddReportCtrl.$inject = [
        '$modal',
        'DashboardStates',
        'DashboardLocalState'
    ];

    ng.module('piwik-external-dashboard.dashboard').controller(
        'DashboardAddReportCtrl', AddReportCtrl
    );
})(window.angular);
