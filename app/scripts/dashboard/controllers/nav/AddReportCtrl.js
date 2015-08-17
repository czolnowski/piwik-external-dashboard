(function (ng) {
    'use strict';

    var AddReportCtrl = function ($modal, dashboards, localState, ASSETS_BASE_PATH)
    {
        this.openModal = function ()
        {
            $modal.open(
                {
                    templateUrl: ASSETS_BASE_PATH + 'views/reports/add-modal.html',
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
        'DashboardLocalState',
        'ASSETS_BASE_PATH'
    ];

    ng.module('piwik-external-dashboard.dashboard').controller(
        'DashboardAddReportCtrl', AddReportCtrl
    );
})(window.angular);
