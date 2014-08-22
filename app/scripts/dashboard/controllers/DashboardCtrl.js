(function (ng) {
    'use strict';

    var $timeout,
        $location,
        $modal,
        Report,
        DashboardCtrl = function ($scope, $routeParams, _$location, _$modal, _$timeout,
                                  _Report, ReportsStateFetcher)
        {
            $timeout = _$timeout;
            $location = _$location;
            $modal = _$modal;
            Report = _Report;

            this.reports = [];
            this.stateFetcher = ReportsStateFetcher;

            this.initialize($scope, $routeParams);
        };

    DashboardCtrl.prototype.initialize = function ($scope, $routeParams)
    {
        var vm = this;

        this.stateFetcher.load('dashboards', $routeParams.dashboard).then(
            function (result)
            {
                var reports = Report.unserialize(result);

                if (ng.isArray(reports)) {
                    vm.reports = reports;
                }
            }
        );

        this.sortableOptions = {
            update: function ()
            {
                $timeout(function () {
                    vm.persist();
                });
            }
        };

        $scope.$on('sites.selectedSite', function (event, site) {
            if (ng.isDefined(site.idsite)) {
                $location.path('/' + site.idsite);
            }
        });
    };

    DashboardCtrl.prototype.openReportsModal = function ()
    {
        var modalInstance = $modal.open({
                templateUrl: 'views/reports/add-modal.html',
                controller: 'AddReportModalCtrl',
                resolve: {
                    reports: [
                        "Report",
                        function (Report)
                        {
                            return Report.fetchMetaData();
                        }
                    ]
                }
            }),
            vm = this;

        modalInstance.result.then(
            function (result)
            {
                vm.reports.push(ng.copy(result));
                vm.persist();
            }
        );
    };

    DashboardCtrl.prototype.remove = function (report)
    {
        var index = this.reports.indexOf(report);

        if (index > -1) {
            this.reports.splice(index, 1);
            this.persist();
        }
    };

    DashboardCtrl.prototype.exportDashboard = function ()
    {
        this.stateFetcher.save(
            'dashboards',
            Report.serialize(this.reports)
        ).then(
            function (reportsName)
            {
                $location.search('dashboard', reportsName);
            }
        );
    };

    DashboardCtrl.prototype.persist = function ()
    {
        this.stateFetcher.persist('reports', Report.serialize(this.reports));

        $location.search('dashboard', null);
    };

    ng.module('piwikExtDash.dashboard').controller("DashboardCtrl", [
        "$scope",
        "$routeParams",
        "$location",
        "$modal",
        "$timeout",
        "Report",
        "ReportsStateFetcher",
        DashboardCtrl
    ]);
})(window.angular);
